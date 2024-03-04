import { FETCH_FLIGHTS, UPDATE_FLIGHTS } from "../../ActionTypes"

export const fetchFlights = () => {
    return {
      type: FETCH_FLIGHTS
    }
}

export const updateFlights=(flights)=>{
    return{
        type : UPDATE_FLIGHTS,
        payload : flights
    }
}


// export const fetchUsers = () => {
//     return (dispatch) => {
//       dispatch(fetchUsersRequest())
//     //   axios
//     //     .get('https://jsonplaceholder.typicode.com/users')
//     //     .then(response => {
//     //       // response.data is the users
//     //       const users = response.data
//     //       dispatch(fetchUsersSuccess(users))
//     //     })
//     //     .catch(error => {
//     //       // error.message is the error message
//     //       dispatch(fetchUsersFailure(error.message))
//     //     })
//     }
// }