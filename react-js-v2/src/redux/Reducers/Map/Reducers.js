import { FETCH_MAP_STATE } from "../../ActionTypes"
import { mapState } from "../../initialStates"

const mapReducer = (state = mapState , action) => {
    switch (action.type) {
        case FETCH_MAP_STATE: return action.payload ;
        default: return state
    }
}

export default mapReducer;