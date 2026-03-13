import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { updateProfile, followUser, unfollowUser } from '../store/slices/usersSlice';
import { useCallback } from 'react';

export const useProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const usersById = useSelector((state: RootState) => state.users.byId);

    const handleUpdateProfile = useCallback((profileData: any) => {
        dispatch(updateProfile(profileData));
    }, [dispatch]);

    const handleFollow = useCallback((targetUserId: string, currentUserId: string) => {
        dispatch(followUser({ targetUserId, currentUserId }));
    }, [dispatch]);

    const handleUnfollow = useCallback((targetUserId: string, currentUserId: string) => {
        dispatch(unfollowUser({ targetUserId, currentUserId }));
    }, [dispatch]);

    return {
        usersById,
        updateProfile: handleUpdateProfile,
        follow: handleFollow,
        unfollow: handleUnfollow
    };
};
