import { combineReducers } from 'redux'
import mapReducer from './Reducers/Map/Reducers'
import routesReducer from './Reducers/Routes/Reducers'
import flightReducer from './Reducers/Flights/Reducers';

const rootReducer = combineReducers({
  mapState : mapReducer,
  routes   : routesReducer,
  flights  : flightReducer,
})

export default rootReducer