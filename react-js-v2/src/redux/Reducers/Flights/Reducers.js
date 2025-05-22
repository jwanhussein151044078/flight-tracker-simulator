import { FETCH_FLIGHTS, UPDATE_FLIGHTS } from "../../ActionTypes"
import { flights } from "../../initialStates"

const flightReducer = (state = flights , action) => {
    switch (action.type) {
        case FETCH_FLIGHTS: return {
            ...state,
            features: action.payload
        } ;
        case UPDATE_FLIGHTS: return {
            ...state,
            features:action.payload
        } ;
        default: return state
    }
}
export default flightReducer