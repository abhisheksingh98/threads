import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState, throttledSaveState } from '../utils/offlineSync';

// Load initial state from local storage for offline first functionality
const persistedState = loadState();

// Initialize legacy redux store
const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(thunk) // using redux-thunk directly as middleware without configureStore
);

// Subscribe to store changes to save to local storage
store.subscribe(() => {
    throttledSaveState({
        // Only saving persistent state keys
        auth: store.getState().auth,
        threads: store.getState().threads,
        users: store.getState().users
        // omitting ui to reset state on load
    });
});

export default store;
