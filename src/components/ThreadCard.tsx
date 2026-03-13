import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateThreadLike } from '../store/slices/threadsSlice';
import moment from 'moment';

interface ThreadCardProps {
    threadId: string;
    isReply?: boolean;
}

const ThreadCard = ({ threadId, isReply = false }: ThreadCardProps) => {
    const dispatch = useDispatch();
    const thread = useSelector((state: RootState) => state.threads.byId[threadId]);
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    if (!thread) return null;

    const hasLiked = currentUser && thread.likes.includes(currentUser.id);

    return (
        <div className={`py-4 px-4 hover:bg-gray-50 transition-colors ${isReply ? '' : 'border-b border-gray-200'}`}>
            <div className="flex gap-3">
                {/* Avatar Column */}
                <div className="flex flex-col items-center">
                    <img
                        src={`https://i.pravatar.cc/150?u=${thread.authorId}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    {thread.replies && thread.replies.length > 0 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2 rounded-full"></div>
                    )}
                </div>

                {/* Content Column */}
                <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-sm tracking-tight hover:underline cursor-pointer">
                            {thread.authorId}
                        </span>
                        <div className="flex items-center text-gray-400 text-sm">
                            <span>{moment(thread.createdAt).fromNow(true)}</span>
                            <button className="ml-2 hover:text-gray-600">•••</button>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-900 leading-normal whitespace-pre-wrap">
                        {thread.content}
                    </p>

                    {/* Interaction Actions */}
                    <div className="flex gap-4 mt-3 text-gray-500">
                        <button
                            onClick={() => currentUser && dispatch(updateThreadLike({ threadId, currentUserId: currentUser.id }) as any)}

                            className={`flex items-center transition-transform hover:scale-110 ${hasLiked ? 'text-red-500' : 'hover:bg-gray-200 rounded-full p-1 -m-1'}`}
                        >
                            {hasLiked ? '❤️' : '🤍'}
                        </button>
                        <button className="flex items-center transition-transform hover:scale-110 hover:bg-gray-200 rounded-full p-1 -m-1">
                            💬
                        </button>
                        <button className="flex items-center transition-transform hover:scale-110 hover:bg-gray-200 rounded-full p-1 -m-1">
                            🔁
                        </button>
                        <button className="flex items-center transition-transform hover:scale-110 hover:bg-gray-200 rounded-full p-1 -m-1">
                            ✈️
                        </button>
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                        {thread.replies && thread.replies.length > 0 && (
                            <span className="hover:underline cursor-pointer">
                                {thread.replies.length} replies
                            </span>
                        )}
                        {thread.likes && thread.likes.length > 0 && (
                            <span className="ml-2 hover:underline cursor-pointer">
                                • {thread.likes.length} likes
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Nested replies rendered recursively using their IDs */}
            {thread.replies && thread.replies.length > 0 && (
                <div className="mt-2 ml-4 relative">
                    {thread.replies.map((replyId) => (
                        <ThreadCard key={replyId} threadId={replyId} isReply={true} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ThreadCard;
