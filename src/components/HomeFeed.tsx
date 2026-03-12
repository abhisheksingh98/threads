// components/HomeFeed.tsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchThreads, updateThreadLike } from '../store/actions';

class HomeFeed extends Component<any, any> {
    componentDidMount() {
        if (this.props.threads.length === 0) {
            this.props.fetchThreads();
        }
    }

    renderThread(thread: any) {
        // Recursive rendering for nested replies as legacy anti-pattern
        const hasLiked = thread.likes.includes(this.props.currentUser?.id);

        return (
            <div key={thread.id} className="border-b border-gray-200 py-4 px-4 hover:bg-gray-50 transition-colors">
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
                                onClick={() => this.props.updateThreadLike(thread.id, this.props.currentUser.id)}
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

                {/* Legacy messy nested reply recursion block directly mapped in render */}
                {thread.replies && thread.replies.length > 0 && (
                    <div className="mt-2 ml-4 relative">
                        {thread.replies.map((reply: any) => this.renderThread(reply))}
                    </div>
                )}
            </div>
        );
    }

    render() {
        const { threads, loading, error } = this.props;

        if (loading && threads.length === 0) {
            return <div className="p-8 text-center text-gray-500">Loading your feed...</div>;
        }

        if (error) {
            return <div className="p-8 text-center text-red-500">Error: {error}</div>;
        }

        if (!threads || threads.length === 0) {
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
                {threads.map((thread: any) => this.renderThread(thread))}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    threads: state.threads.items,
    loading: state.threads.loading,
    error: state.threads.error,
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, { fetchThreads, updateThreadLike })(HomeFeed);
