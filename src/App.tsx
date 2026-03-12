import { Provider } from 'react-redux';
import store from './store';
import AppContainer from './screens/AppContainer';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
