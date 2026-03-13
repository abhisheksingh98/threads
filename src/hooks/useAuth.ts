import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setCurrentUser, logoutUser } from '../store/slices/authSlice';
import { User } from '../store/slices/usersSlice';
import { useCallback } from 'react';


export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, currentUser, loading } = useSelector((state: RootState) => state.auth);

    const handleLogin = useCallback((user: User) => {
        dispatch(setCurrentUser(user));
    }, [dispatch]);


    const handleLogout = useCallback(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    return {
        isAuthenticated,
        currentUser,
        loading,
        login: handleLogin,
        logout: handleLogout
    };
};
