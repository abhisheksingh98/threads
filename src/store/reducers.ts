import { combineReducers } from 'redux';
import * as types from './types';

// Initial states manually defined
const initialAuthState = {
    isAuthenticated: false,
    currentUser: null,
    loading: false
};

const initialThreadsState = {
    items: [],
    loading: false,
    error: null
};

const initialUiState = {
    activeTab: 'home', // home, search, activity, profile
    searchQuery: '',
    isCreateModalOpen: false,
    theme: 'light' // just in case
};

const initialUsersState = {
    byId: {} // Map of users to mock relational DB
};

// Legacy nested switch case reducer pattern
const authReducer = (state = initialAuthState, action: any) => {
    switch (action.type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.payload,
                currentUser: action.payload
            };
        case types.LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                currentUser: null
            };
        default:
            return state;
    }
};

// Highly complex thread traversal logic within reducer to add replies deeply
// Intentionally building this inefficiently to allow refactoring to normalized state later
const deepAddReply = (threads: any[], threadId: string, reply: any): any[] => {
    return threads.map(t => {
        if (t.id === threadId) {
            return { ...t, replies: [...t.replies, reply] };
        }
        if (t.replies && t.replies.length > 0) {
            return { ...t, replies: deepAddReply(t.replies, threadId, reply) };
        }
        return t;
    });
};

const deepToggleLike = (threads: any[], threadId: string, userId: string): any[] => {
    return threads.map(t => {
        if (t.id === threadId) {
            const hasLiked = t.likes.includes(userId);
            return {
                ...t,
                likes: hasLiked ? t.likes.filter((id: string) => id !== userId) : [...t.likes, userId]
            };
        }
        if (t.replies && t.replies.length > 0) {
            return { ...t, replies: deepToggleLike(t.replies, threadId, userId) };
        }
        return t;
    });
};

const threadsReducer = (state = initialThreadsState, action: any) => {
    switch (action.type) {
        case types.FETCH_THREADS_REQUEST:
        case types.CREATE_THREAD_REQUEST:
        case types.ADD_REPLY_REQUEST:
            return { ...state, loading: true, error: null };

        case types.FETCH_THREADS_SUCCESS:
            return { ...state, loading: false, items: action.payload };

        case types.CREATE_THREAD_SUCCESS:
            // Insert at beginning for feed
            return { ...state, loading: false, items: [action.payload, ...state.items] };

        case types.CREATE_THREAD_FAILURE:
        case types.FETCH_THREADS_FAILURE:
        case types.ADD_REPLY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case types.UPDATE_THREAD_LIKE:
            return {
                ...state,
                items: deepToggleLike(state.items, action.payload.threadId, action.payload.currentUserId)
            };

        case types.ADD_REPLY_SUCCESS:
            return {
                ...state,
                loading: false,
                items: deepAddReply(state.items, action.payload.threadId, action.payload.reply)
            };

        default:
            return state;
    }
};

const uiReducer = (state = initialUiState, action: any) => {
    switch (action.type) {
        case types.CHANGE_ACTIVE_TAB:
            return { ...state, activeTab: action.payload };
        case types.SET_SEARCH_QUERY:
            return { ...state, searchQuery: action.payload };
        case types.TOGGLE_CREATE_MODAL:
            return { ...state, isCreateModalOpen: !state.isCreateModalOpen };
        default:
            return state;
    }
};

const usersReducer = (state = initialUsersState, action: any) => {
    switch (action.type) {
        case types.UPDATE_PROFILE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...((state.byId as Record<string, any>)[action.payload.id] || {}),
                        ...action.payload
                    }
                }
            };
        case types.FOLLOW_USER:
            const targetUser: any = (state.byId as Record<string, any>)[action.payload.targetUserId] || { id: action.payload.targetUserId, followers: [], following: [] };
            const currentUser: any = (state.byId as Record<string, any>)[action.payload.currentUserId] || { id: action.payload.currentUserId, followers: [], following: [] };

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.targetUserId]: {
                        ...targetUser,
                        followers: [...(targetUser.followers || []), action.payload.currentUserId]
                    },
                    [action.payload.currentUserId]: {
                        ...currentUser,
                        following: [...(currentUser.following || []), action.payload.targetUserId]
                    }
                }
            };
        case types.UNFOLLOW_USER:
            // Update both users
            const tUser: any = (state.byId as Record<string, any>)[action.payload.targetUserId];
            const cUser: any = (state.byId as Record<string, any>)[action.payload.currentUserId];
            if (!tUser || !cUser) return state;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.targetUserId]: {
                        ...tUser,
                        followers: tUser.followers.filter((id: string) => id !== action.payload.currentUserId)
                    },
                    [action.payload.currentUserId]: {
                        ...cUser,
                        following: cUser.following.filter((id: string) => id !== action.payload.targetUserId)
                    }
                }
            };
        default:
            return state;
    }
};

// Mega root reducer combining everything
const rootReducer = combineReducers({
    auth: authReducer,
    threads: threadsReducer,
    ui: uiReducer,
    users: usersReducer
});

export default rootReducer;
