// Legacy monolithic localstorage utility
import _ from 'lodash';

const THREADS_STATE_KEY = 'LEGACY_THREADS_OFFLINE_STATE';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(THREADS_STATE_KEY);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(THREADS_STATE_KEY, serializedState);
    } catch (err) {
        // Ignore write errors to keep legacy style
    }
};

// Throttle save to avoid performance hits if called too often in reducers
export const throttledSaveState = _.throttle(saveState, 1000);

export const generateId = () => {
    return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
};
