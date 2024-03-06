import axios from "../../../api/axios";
import { FETCH_ROUTES } from "../../ActionTypes";

export const fetchRoutes = (routes) => {
    return {
      type: FETCH_ROUTES,
      payload:routes
    }
}


export const fetchRoutesData = () => {
    return (dispatch) => {
      axios.get('/routes')
      .then(response => {
        //setTimeout(()=>{dispatch(fetchRoutes(response.data.routes))},2000)
        dispatch(fetchRoutes(response.data.routes.map((route)=> {return{
          "id" : route.id ,
          "type": "Feature",
          "properties": {id : route.id},
          "geometry": route.route
        }})))
      })
      .catch(error => {
        console.log(error);
      })
    }
}