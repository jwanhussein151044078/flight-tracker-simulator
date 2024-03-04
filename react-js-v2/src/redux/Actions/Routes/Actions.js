import { FETCH_ROUTES } from "../../ActionTypes"

export const fetchRoutes = () => {
    return {
      type: FETCH_ROUTES
    }
}


export const fetchRoutesData = () => {
    return (dispatch) => {
      dispatch(fetchRoutes())
    }
}