import { 
    FETCH_MAP_STATE_REQUEST,
    FETCH_MAP_STATE_SUCCESS,
    FETCH_MAP_STATE_ERROR 
 } from "../../ActionTypes"
import { mapState } from "../../initialStates"

const mapReducer = (state = mapState , action) => {
    switch (action.type) {
        case FETCH_MAP_STATE_REQUEST: 
            return {
                ...state,
                loading: true
            };
        case FETCH_MAP_STATE_SUCCESS:
            return{
                loading: false,
                mapSpecs: action.payload,
                error: ''
            }
        case FETCH_MAP_STATE_ERROR:
            return{
                loading: false,
                mapSpecs: {},
                error: action.payload
            }
        default: return state
    }
}

export default mapReducer;