import './App.css';
import { Provider } from 'react-redux';
import Map from './Components/Map/Map';
import store from './redux/Store';

function App(props) {
  return (
    <Provider store={store}>
      <div className="App">
        <Map/>
      </div>
    </Provider>
    
  );
};

export default App;

