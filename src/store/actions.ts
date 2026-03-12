import * as types from './types';
import { generateId } from '../utils/offlineSync';

// Legacy action creators
export const setCurrentUser = (user: any) => ({
    type: types.SET_CURRENT_USER,
    payload: user
});

export const logoutUser = () => ({
    type: types.LOGOUT_USER
});

export const fetchThreadsRequest = () => ({
    type: types.FETCH_THREADS_REQUEST
});

export const fetchThreadsSuccess = (threads: any) => ({
    type: types.FETCH_THREADS_SUCCESS,
    payload: threads
});

export const fetchThreadsFailure = (error: any) => ({
    type: types.FETCH_THREADS_FAILURE,
    payload: error
});

// Massive thunk for fetching threads, simulating network delay
export const fetchThreads = () => {
    return (dispatch: any, getState: any) => {
        dispatch(fetchThreadsRequest());

        setTimeout(() => {
            const { threads } = getState();
            if (threads && threads.items) {
                // Success
                dispatch(fetchThreadsSuccess(threads.items));
            } else {
                dispatch(fetchThreadsFailure('Failed to fetch threads'));
            }
        }, 800);
    };
};

export const createThreadRequest = () => ({
    type: types.CREATE_THREAD_REQUEST
});

export const createThreadSuccess = (thread: any) => ({
    type: types.CREATE_THREAD_SUCCESS,
    payload: thread
});

export const createThreadFailure = (error: any) => ({
    type: types.CREATE_THREAD_FAILURE,
    payload: error
});

// Thunk for creating a thread
export const createThread = (content: string, authorId: string) => {
    return (dispatch: any) => {
        dispatch(createThreadRequest());
        setTimeout(() => {
            try {
                const newThread = {
                    id: generateId(),
                    content,
                    authorId,
                    createdAt: new Date().toISOString(),
                    likes: [],
                    replies: []
                };
                dispatch(createThreadSuccess(newThread));
            } catch (err) {
                dispatch(createThreadFailure(err));
            }
        }, 400);
    };
};

export const updateThreadLike = (threadId: string, currentUserId: string) => ({
    type: types.UPDATE_THREAD_LIKE,
    payload: { threadId, currentUserId }
});

export const addReplyRequest = () => ({
    type: types.ADD_REPLY_REQUEST
});

export const addReplySuccess = (threadId: string, reply: any) => ({
    type: types.ADD_REPLY_SUCCESS,
    payload: { threadId, reply }
});

export const addReplyFailure = (error: any) => ({
    type: types.ADD_REPLY_FAILURE,
    payload: error
});

// Thunk for nested replies via recursive structure navigation logic handled in reducer
export const addReply = (threadId: string, content: string, authorId: string) => {
    return (dispatch: any) => {
        dispatch(addReplyRequest());
        setTimeout(() => {
            try {
                const reply = {
                    id: generateId(),
                    threadId, // Points to parent
                    content,
                    authorId,
                    createdAt: new Date().toISOString(),
                    likes: [],
                    replies: []
                };
                dispatch(addReplySuccess(threadId, reply));
            } catch (err) {
                dispatch(addReplyFailure(err));
            }
        }, 500);
    };
};

// UI actions
export const changeActiveTab = (tab: string) => ({
    type: types.CHANGE_ACTIVE_TAB,
    payload: tab
});

export const setSearchQuery = (query: string) => ({
    type: types.SET_SEARCH_QUERY,
    payload: query
});

export const toggleCreateModal = () => ({
    type: types.TOGGLE_CREATE_MODAL
});

// Profile Actions
export const updateProfile = (profileData: any) => ({
    type: types.UPDATE_PROFILE,
    payload: profileData
});

export const followUser = (targetUserId: string, currentUserId: string) => ({
    type: types.FOLLOW_USER,
    payload: { targetUserId, currentUserId }
});

export const unfollowUser = (targetUserId: string, currentUserId: string) => ({
    type: types.UNFOLLOW_USER,
    payload: { targetUserId, currentUserId }
});
