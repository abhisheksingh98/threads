import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: string;
    username: string;
    fullName: string;
    bio: string;
    link?: string;
    followers: string[];
    following: string[];
    avatarUrl: string;
}

interface UsersState {
    byId: Record<string, User>;
}

const initialState: UsersState = {
    byId: {}
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<Partial<User> & { id: string }>) => {
            const { id } = action.payload;
            state.byId[id] = {
                ...(state.byId[id] || {}),
                ...action.payload
            } as User;
        },
        followUser: (state, action: PayloadAction<{ targetUserId: string, currentUserId: string }>) => {
            const { targetUserId, currentUserId } = action.payload;

            if (!state.byId[targetUserId]) {
                // @ts-ignore - partial user
                state.byId[targetUserId] = { id: targetUserId, followers: [], following: [] };
            }
            if (!state.byId[currentUserId]) {
                // @ts-ignore - partial user
                state.byId[currentUserId] = { id: currentUserId, followers: [], following: [] };
            }

            if (!state.byId[targetUserId].followers.includes(currentUserId)) {
                state.byId[targetUserId].followers.push(currentUserId);
            }
            if (!state.byId[currentUserId].following.includes(targetUserId)) {
                state.byId[currentUserId].following.push(targetUserId);
            }
        },
        unfollowUser: (state, action: PayloadAction<{ targetUserId: string, currentUserId: string }>) => {
            const { targetUserId, currentUserId } = action.payload;

            if (state.byId[targetUserId]) {
                state.byId[targetUserId].followers = state.byId[targetUserId].followers.filter(id => id !== currentUserId);
            }
            if (state.byId[currentUserId]) {
                state.byId[currentUserId].following = state.byId[currentUserId].following.filter(id => id !== targetUserId);
            }
        }
    }
});

export const { updateProfile, followUser, unfollowUser } = usersSlice.actions;
export default usersSlice.reducer;
