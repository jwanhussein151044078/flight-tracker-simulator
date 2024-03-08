import React, { useRef, useEffect, useState } from 'react';
import { addRoutesLayerToMap, addTrailsLayerToMap, addflightsLayerToMap, animateFeatureTransition, initializeMap, removeMap, setLayerData } from '../../Services/Map/MapServices';
import { connect } from 'react-redux';
import { fetchFlightsData, fetchMapState, fetchRoutesData, updateFlightsData } from '../../redux';
import PopUp from './PopUp';
import Loading from '../Loading/Loading';
import { getEmptyFeatureCollection, getTrailsFeatureCollectionFromFlights } from '../../utils/geoJsonUtils';
import './Style.css';
import socketIO from 'socket.io-client';

function Map(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const socketRef = useRef(null);
    const [selectedFeature,setSelectedFeature] = useState(null);
    
    const initMap=()=>{
      try{
        map.current = initializeMap(mapContainer,{
          style : props.mapState.mapSpecs.style,
          accessToken:process.env.REACT_APP_MAPBOX_TOKEN
        });
        map.current.on('load',()=>{
          map.current.flyTo({
            center: props.mapState.mapSpecs.center.coordinates,
            zoom: props.mapState.mapSpecs.zoom,
            speed: 3,
            curve: 1,
          });
          addRoutesLayerToMap(map.current,'routes',props.routes,(layer,error)=>{
            if(error){
              console.log('routes layer could not be loaded');
            }else{
              props.fetchRoutes();
            }
          });
          addTrailsLayerToMap(map.current,'trails',getEmptyFeatureCollection(),(layer,error)=>{
            if(error){
              console.log('trail layer could not be loaded');
            }
          });
          addflightsLayerToMap(map.current,'flights',props.flights,(layer,error)=>{
            if(error){
              console.log('flights layer could not be loaded');
            }else{
              map.current.on('click', 'flights', (e) => {
                map.current.setFilter('trails', ['==', ['get', 'flight_id'], e.features[0].id]);
                map.current.panTo(e.features[0].geometry.coordinates);
                setSelectedFeature( e.features[0]?.id);
              });
            }
          });
        });
      }catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      if(props.flights){
        if(map.current){
          animateFeatureTransition(map.current,'flights',props.flights,(res,error)=>{
            if(res){
              setLayerData(map.current,'flights',props.flights);
              setLayerData(map.current,'trails',getTrailsFeatureCollectionFromFlights(props.flights));
            }
          });
        }
      }
      return()=>{};
    },[props.flights]);

    useEffect(()=>{
      setLayerData(map.current,'routes',props.routes);
    },[props.routes]);

    useEffect(()=>{
      let timeout = null;
      let interval = null ;
      if(props.mapState.error){
        timeout = setTimeout(()=> props.fetchMapState(),1000);
      }else if(props.mapState && !props.mapState.loading){
        let res = initMap();
        // interval = setInterval(()=>{
        //   props.fetchFlights();
        // },1000);
      }
      return()=>{
        removeMap();
        if(timeout){
          clearTimeout(timeout);
        }
        if(interval){
          clearInterval(interval);
        }
      };
    },[props.mapState]);

    useEffect(()=>{
      props.fetchMapState();
      socketRef.current = socketIO.connect('http://localhost:8000');
      socketRef.current.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      socketRef.current.on('disconnect', () => {
          console.log('Disconnected from WebSocket server');
      });

      socketRef.current.on('flights', (flights) => {
          console.log('Received message:', flights);
          props.updateFlights(flights); 
      });
      return()=>{
        console.log('adsasas');
        if(socketRef.current){
          socketRef.current.disconnect();
        }
      };
    },[]);

    const onClosePopup=()=>{
      setSelectedFeature(null);
      map.current.setFilter('trails', ['==', ['get', 'flight_id'], null]);
    }
    return (<>
      {!props.mapState.loading && !props.mapState.error ?
        <div>
          <div className='mapContainer' ref={mapContainer} />
          <PopUp
            flightId = {selectedFeature}
            onClose = {onClosePopup}
          />
        </div>
        :<Loading/>
      }  
    </>);
}

const mapStateToProps = (state) => {
    return {
        mapState: state.mapState,
        routes  : state.routes,
        flights : state.flights,
    };
};
const mapDispatchToProps = dispatch => {
  return {
    updateFlights: (flights) => dispatch(updateFlightsData(flights)),
    fetchMapState: ()=> dispatch(fetchMapState()),
    fetchRoutes  : ()=> dispatch(fetchRoutesData()),
    fetchFlights : ()=> dispatch(fetchFlightsData())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Map);