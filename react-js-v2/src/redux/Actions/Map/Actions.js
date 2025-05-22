import axios from "../../../api/axios"
import { 
  FETCH_MAP_STATE_REQUEST,
  FETCH_MAP_STATE_SUCCESS,
  FETCH_MAP_STATE_ERROR 
} from "../../ActionTypes"

export const fetchMapStateRequest = () => {
    return {
      type: FETCH_MAP_STATE_REQUEST
    }
}

export const fetchMapStateSuccess = (mapState) => {
  return {
    type: FETCH_MAP_STATE_SUCCESS,
    payload: mapState
  }
}

export const fetchMapStateError = (error) => {
  return {
    type: FETCH_MAP_STATE_ERROR,
    payload: error
  }
}


export const fetchMapState = () => {
  return (dispatch) => {
    dispatch(fetchMapStateRequest())
      axios.get('/map/specs/1')
      .then(response => {
        //setTimeout(()=>{dispatch(fetchMapStateSuccess(response.data.mapSpecs))},2000)
        dispatch(fetchMapStateSuccess(response.data.mapSpecs))
      })
      .catch(error => {
        dispatch(fetchMapStateError(error.message))
      })
  }
}