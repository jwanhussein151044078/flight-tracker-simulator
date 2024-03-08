import React, { useRef, useEffect, useState, useCallback } from 'react';
import { addFlightsToMap, addRoutesLayerToMap, addRoutesToMap, addTrailsLayerToMap, addTrailsToMap, addflightsLayerToMap, animateFeatureTransition, initializeMap, removeMap, setLayerData, updateFlightsLocation } from '../../Services/Map/MapServices';
import { connect } from 'react-redux';
import { fetchFlightsData, fetchMapState, fetchRoutesData, updateFlights } from '../../redux';
import './Style.css';
import PopUp from './PopUp';
import Loading from '../Loading/Loading';

function Map(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [selectedFeature,setSelectedFeature] = useState(null);
    const [oldFeatures,setOldFeatures] = useState({features:[]});
    
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
          addRoutesLayerToMap(map.current,'routes',(layer,error)=>{
            if(error){
              console.log('routes layer could not be loaded');
            }else{
              props.fetchRoutes();
            }
          });
          addTrailsLayerToMap(map.current,'trails',(layer,error)=>{
            if(error){
              console.log('trail layer could not be loaded');
            }else{
              //props.fetchFlights();
              
            }
          });
          addflightsLayerToMap(map.current,'flights',(layer,error)=>{
            if(error){
              console.log('flights layer could not be loaded');
            }else{
              props.fetchFlights();
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
      let timeout = null;
      if(props.flights){
        timeout = setTimeout(()=> props.fetchFlights(),1000);
        if(map.current){
        
          
          animateFeatureTransition(map.current,'flights',props.flights,(res,error)=>{
            if(res){
              setLayerData(map.current,'flights',props.flights);
              setLayerData(map.current,'trails',{
                type: 'FeatureCollection',
                features: props.flights.features.map((flight)=>{
                  return {
                    type:'lineString',
                    properties:{flight_id:flight.id},
                    geometry:flight.trail?.trail
                  }
                })
              })
            }
          });
        }
      }
      return()=>{
        if(timeout){
          clearTimeout(timeout);
        }
      }
    },[props.flights]);

    useEffect(()=>{
      setLayerData(map.current,'routes',props.routes);
    },[props.routes]);

    useEffect(()=>{
      let timeout = null;
      if(props.mapState.error){
        timeout = setTimeout(()=> props.fetchMapState(),1000);
      }else if(props.mapState && !props.mapState.loading){
        initMap();
      }
      return()=>{
        removeMap();
        if(timeout){
          clearTimeout(timeout);
        }
      };
    },[props.mapState]);

    useEffect(()=>{
      props.fetchMapState();
      return()=>{};
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
   // updateFlights: (flights) => dispatch(updateFlights(flights)),
    fetchMapState: ()=> dispatch(fetchMapState()),
    fetchRoutes  : ()=> dispatch(fetchRoutesData()),
    fetchFlights : ()=> dispatch(fetchFlightsData())
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Map);