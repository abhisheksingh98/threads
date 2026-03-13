import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './usersSlice';


interface AuthState {
    isAuthenticated: boolean;
    currentUser: User | null;
    loading: boolean;
}


const initialState: AuthState = {
    isAuthenticated: false,
    currentUser: null,
    loading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = !!action.payload;
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
        }
    }
});

export const { setCurrentUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
