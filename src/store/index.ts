import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { loadState } from '../utils/offlineSync';
import authReducer from './slices/authSlice';
import threadsReducer from './slices/threadsSlice';
import usersReducer from './slices/usersSlice';
import { offlineSyncMiddleware } from './middleware/offlineSyncMiddleware';

const rootReducer = combineReducers({
    auth: authReducer,
    threads: threadsReducer,
    users: usersReducer
});

// Load initial state from local storage
const persistedState = loadState() as any || {};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(offlineSyncMiddleware as any),
});






export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

