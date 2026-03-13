import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
    fetchThreads,
    createThread,
    addReply,
    updateThreadLike
} from '../store/slices/threadsSlice';
import { useCallback } from 'react';

export const useThreads = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { byId, allIds, loading, error } = useSelector((state: RootState) => state.threads);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const handleFetchThreads = useCallback(() => {
        dispatch(fetchThreads());
    }, [dispatch]);

    const handleCreateThread = useCallback((content: string) => {
        if (currentUser) {
            dispatch(createThread({ content, authorId: currentUser.id }));
        }
    }, [dispatch, currentUser]);

    const handleAddReply = useCallback((threadId: string, content: string) => {
        if (currentUser) {
            dispatch(addReply({ threadId, content, authorId: currentUser.id }));
        }
    }, [dispatch, currentUser]);

    const handleToggleLike = useCallback((threadId: string) => {
        if (currentUser) {
            dispatch(updateThreadLike({ threadId, currentUserId: currentUser.id }));
        }
    }, [dispatch, currentUser]);

    return {
        threadsById: byId,
        rootThreadIds: allIds,
        loading,
        error,
        fetchThreads: handleFetchThreads,
        createThread: handleCreateThread,
        addReply: handleAddReply,
        toggleLike: handleToggleLike
    };
};
