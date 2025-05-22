import { FETCH_ROUTES } from "../../ActionTypes"
import { routes } from "../../initialStates"

const routesReducer = (state = routes , action) => {
    switch (action.type) {
        case FETCH_ROUTES: return {
            ...state,
            features:action.payload
        } ;
        default: return state
    }
}
export default routesReducer