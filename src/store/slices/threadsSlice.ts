import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../../utils/offlineSync';

export interface Thread {
    id: string;
    content: string;
    authorId: string;
    createdAt: string;
    likes: string[];
    replies: string[]; // Normalized: array of IDs
    parentId?: string;
}

interface ThreadsState {
    byId: Record<string, Thread>;
    allIds: string[]; // Root threads
    loading: boolean;
    error: string | null;
}

const initialState: ThreadsState = {
    byId: {},
    allIds: [],
    loading: false,
    error: null
};

interface RawThread {
    id: string;
    content: string;
    authorId: string;
    createdAt: string;
    likes: string[];
    replies: RawThread[];
}

// Helper to flatten nested threads (for migration/initial load)
const flattenThreads = (threads: RawThread[], parentId?: string): Record<string, Thread> => {
    let flat: Record<string, Thread> = {};
    threads.forEach(t => {
        const replyIds = t.replies?.map((r) => r.id) || [];
        flat[t.id] = {
            ...t,
            replies: replyIds,
            parentId
        };
        if (t.replies && t.replies.length > 0) {
            flat = { ...flat, ...flattenThreads(t.replies, t.id) };
        }
    });
    return flat;
};


export const fetchThreads = createAsyncThunk(
    'threads/fetchThreads',
    async (_, { getState }) => {
        return new Promise<Thread[]>((resolve) => {
            setTimeout(() => {
                const state = getState() as any;
                // If the state is already normalized, we might need a different fetch strategy
                // but for this migration, we'll assume we're fetching the root threads.
                // In this mock, we'll just return what's in the state.
                resolve(Object.values(state.threads.byId).filter((t: any) => !t.parentId) as Thread[]);

            }, 800);
        });
    }
);

export const createThread = createAsyncThunk(
    'threads/createThread',
    async ({ content, authorId }: { content: string, authorId: string }) => {
        return new Promise<Thread>((resolve) => {
            setTimeout(() => {
                const newThread: Thread = {
                    id: generateId(),
                    content,
                    authorId,
                    createdAt: new Date().toISOString(),
                    likes: [],
                    replies: []
                };
                resolve(newThread);
            }, 400);
        });
    }
);

export const addReply = createAsyncThunk(
    'threads/addReply',
    async ({ threadId, content, authorId }: { threadId: string, content: string, authorId: string }) => {
        return new Promise<{ threadId: string, reply: Thread }>((resolve) => {
            setTimeout(() => {
                const reply: Thread = {
                    id: generateId(),
                    content,
                    authorId,
                    createdAt: new Date().toISOString(),
                    likes: [],
                    replies: [],
                    parentId: threadId
                };
                resolve({ threadId, reply });
            }, 500);
        });
    }
);

const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        updateThreadLike: (state, action: PayloadAction<{ threadId: string, currentUserId: string }>) => {
            const { threadId, currentUserId } = action.payload;
            const thread = state.byId[threadId];
            if (thread) {
                const hasLiked = thread.likes.includes(currentUserId);
                if (hasLiked) {
                    thread.likes = thread.likes.filter(id => id !== currentUserId);
                } else {
                    thread.likes.push(currentUserId);
                }
            }
        },
        // To handle migration from nested state if found in localStorage
        initializeNormalizedState: (state, action: PayloadAction<any[]>) => {
            const flat = flattenThreads(action.payload);
            state.byId = flat;
            state.allIds = action.payload.map(t => t.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchThreads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchThreads.fulfilled, (state) => {
                state.loading = false;
                // Usually fetch would return something to populate but for now we trust the migration
            })

            .addCase(createThread.fulfilled, (state, action) => {
                state.loading = false;
                const thread = action.payload;
                state.byId[thread.id] = thread;
                state.allIds.unshift(thread.id);
            })
            .addCase(addReply.fulfilled, (state, action) => {
                state.loading = false;
                const { threadId, reply } = action.payload;
                state.byId[reply.id] = reply;
                if (state.byId[threadId]) {
                    state.byId[threadId].replies.push(reply.id);
                }
            });
    }
});

export const { updateThreadLike, initializeNormalizedState } = threadsSlice.actions;
export default threadsSlice.reducer;
