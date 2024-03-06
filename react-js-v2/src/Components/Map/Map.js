import React, { useRef, useEffect, useState, useCallback } from 'react';
import { addFlightsToMap, addRoutesToMap, addTrailsToMap, initializeMap, removeMap, updateFlightsLocation } from '../../Services/Map/MapServices';
import { connect } from 'react-redux';
import { fetchMapState, fetchRoutesData, updateFlights } from '../../redux';
import './Style.css';
import PopUp from './PopUp';
import { mapState } from '../../redux/initialStates';
import Loading from '../Loading/Loading';

function Map(props) {
    const mapContainer = useRef(null);
    const map = useRef(null);
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
          props.fetchRoutes();
          //addRoutesToMap(map.current,props.routes);
          addFlightsToMap(map.current,props.flights,'flights');
          addTrailsToMap(map.current,{
            "type": "FeatureCollection",
            "features": []
          });
        });
        map.current.on('click', 'flights', (e) => {
          map.current.flyTo({
              center: e.features[0].geometry.coordinates
          });
          let ind = props.flights.features.findIndex((d)=> d.id == e.features[0].id);
          setSelectedFeature(ind);

        });
      }catch(error){
        console.log(error);
      }
    }
    useEffect(()=>{
      if(props.flights){
        updateFlightsLocation(map.current,props.flights,'flights');
      }
    },[props.flights])
    // useEffect(() => {
    //     initMap();
    //     let interval = setInterval(() => {
    //         let flights = {...props.flights};
    //         flights.features.forEach((feature)=>{
    //           let path = props.routes.features.find((d)=> d.properties.id == feature.properties.path_id);
    //           if(path && feature.properties.path_ind < path.geometry.coordinates.length){
    //             feature.geometry.coordinates = path.geometry.coordinates[feature.properties.path_ind]
    //           }
    //           feature.properties.path_ind++;
    //         });
    //         props.updateFlights(flights);
    //     }, 1000);
    //     return () => {
    //         removeMap()
    //         if(interval){clearInterval(interval);}
    //     };
    // }, []);
    useEffect(()=>{
      addRoutesToMap(map.current,props.routes);
    },[props.routes]);

    useEffect(()=>{
      if(props.mapState && !props.mapState.loading && !props.mapState.error){
        initMap();
      } 
      return()=>{
        removeMap()
      };
    },[props.mapState]);

    useEffect(()=>{
      props.fetchMapState();
      return()=>{};
    },[]);
    return (<>
      {!props.mapState.loading ?
        <div>
          <div className='mapContainer' ref={mapContainer} />
          <PopUp
            flightId = {selectedFeature}
            onClose = {()=>setSelectedFeature(null)}
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
    updateFlights: (flights) => dispatch(updateFlights(flights)),
    fetchMapState: ()=> dispatch(fetchMapState()),
    fetchRoutes  : ()=> dispatch(fetchRoutesData())
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(Map);