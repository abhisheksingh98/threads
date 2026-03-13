import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchThreads } from '../store/slices/threadsSlice';
import { RootState, AppDispatch } from '../store';
import ThreadCard from './ThreadCard';

const HomeFeed = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { allIds, loading, error } = useSelector((state: RootState) => state.threads);

    useEffect(() => {
        if (allIds.length === 0) {
            dispatch(fetchThreads());
        }
    }, [dispatch, allIds.length]);

    if (loading && allIds.length === 0) {
        return <div className="p-8 text-center text-gray-500">Loading your feed...</div>;
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">Error: {error}</div>;
    }

    if (!allIds || allIds.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-gray-500 h-[70vh]">
                <div className="text-4xl mb-4">📭</div>
                <p className="font-semibold text-lg">Nothing here yet</p>
                <p className="text-sm mt-2 text-center max-w-xs">Follow people or create your first post to see it appear in your feed.</p>
            </div>
        );
    }

    return (
        <div className="pb-10 pt-2 bg-white min-h-[85vh]">
            {allIds.map((threadId) => (
                <ThreadCard key={threadId} threadId={threadId} />
            ))}
        </div>
    );
};

export default HomeFeed;

