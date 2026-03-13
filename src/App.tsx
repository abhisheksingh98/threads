import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import { UiProvider } from './context/UiContext';
import AppContainer from './screens/AppContainer';
import HomeFeed from './components/HomeFeed';
import SearchSection from './components/SearchSection';
import ActivitySection from './components/ActivitySection';
import ProfileSection from './components/ProfileSection';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <UiProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppContainer />}>
              <Route index element={<HomeFeed />} />
              <Route path="search" element={<SearchSection />} />
              <Route path="activity" element={<ActivitySection />} />
              <Route path="profile" element={<ProfileSection />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UiProvider>
    </Provider>
  );
}


export default App;

