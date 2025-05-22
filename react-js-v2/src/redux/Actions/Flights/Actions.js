import axios from "../../../api/axios"
import { getFeaturesFromFlights, isEqualFeatureCollectionsWithFlights } from "../../../utils/geoJsonUtils"
import { FETCH_FLIGHTS, UPDATE_FLIGHTS } from "../../ActionTypes"

export const fetchFlights = (flights) => {
    return {
      type: FETCH_FLIGHTS,
      payload : flights
    }
}

export const updateFlights=(flights)=>{
    return{
        type : UPDATE_FLIGHTS,
        payload : flights
    }
}

export const fetchFlightsData=()=>{
    return (dispatch,getState) => {
        let flightsState = getState().flights;
        axios.get('/flights')
        .then(response => {
          if(!isEqualFeatureCollectionsWithFlights(flightsState,response.data.flights)){
            dispatch(fetchFlights (getFeaturesFromFlights(response.data.flights)));
          }
        })
        .catch(error => {
          console.log(error);
          dispatch(fetchFlights ([]));
        })
    }
}

export const updateFlightsData=(flights)=>{
  return (dispatch,getState) => {
    let flightsState = getState().flights;
    if(!isEqualFeatureCollectionsWithFlights(flightsState,flights)){
      dispatch(fetchFlights (getFeaturesFromFlights(flights)));
    }
  }
}
