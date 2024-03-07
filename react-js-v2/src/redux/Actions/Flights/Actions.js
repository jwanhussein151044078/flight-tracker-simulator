import axios from "../../../api/axios"
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
    return (dispatch) => {
        axios.get('/flights')
        .then(response => {
          dispatch(fetchFlights (response.data.flights.map((flight)=> {return{
            "id" : flight.id ,
            "type": "Feature",
            "properties": {
                name : flight.name, 
                id : flight.id ,
                'icon-default' :'yellow-airplane',
                path_id : flight.route_id,
                aircraft_model : flight.aircraft_model,
                aircraft_type : flight.aircraft_type,
                capacity : flight.capacity,
                pilot: flight.pilot,
                destination: flight.destination,
                speed : flight.speed,
                bearing : flight.bearings
            },
            "geometry": flight.coordinates
          }})))
        })
        .catch(error => {
          console.log(error);
          dispatch(fetchFlights ([]));
        })
    }
}
