import { Middleware } from '@reduxjs/toolkit';
import { throttledSaveState } from '../../utils/offlineSync';

export const offlineSyncMiddleware: Middleware<{}, any> = (store) => (next) => (action) => {

    const result = next(action);

    // Only sync on actions that potentially change the persisted state
    // In a real app, we might filter by action type, but for now we follow the legacy logic
    const state = store.getState();

    throttledSaveState({
        auth: state.auth,
        threads: state.threads,
        users: state.users
    });

    return result;
};
