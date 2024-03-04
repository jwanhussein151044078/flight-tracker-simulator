import { FETCH_MAP_STATE } from "../../ActionTypes"

export const fetchMapState = () => {
    return {
      type: FETCH_MAP_STATE
    }
}


export const fetchUsers = () => {
    return (dispatch) => {
    //  dispatch(fetchUsersRequest())
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/users')
    //     .then(response => {
    //       // response.data is the users
    //       const users = response.data
    //       dispatch(fetchUsersSuccess(users))
    //     })
    //     .catch(error => {
    //       // error.message is the error message
    //       dispatch(fetchUsersFailure(error.message))
    //     })
    }
}