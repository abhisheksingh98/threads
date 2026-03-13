import React, { useState, useRef, useEffect } from 'react';
import { useThreads } from '../hooks/useThreads';
import { useAuth } from '../hooks/useAuth';

interface CreatePostModalProps {
    onClose: () => void;
}

const CreatePostModal = ({ onClose }: CreatePostModalProps) => {
    const { createThread } = useThreads();
    const { currentUser } = useAuth();
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSubmit = async () => {
        if (!content.trim() || isSubmitting) return;

        setIsSubmitting(true);
        createThread(content);

        // Fake network delay for smooth UI feedback
        setTimeout(() => {
            setIsSubmitting(false);
            setContent('');
            onClose();
        }, 400);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4 animate-fade-in transition-all">
            {/* Backdrop overlay */}
            <div
                className="absolute inset-0 bg-black/60 transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className="relative bg-white w-full h-[90vh] sm:h-auto sm:max-w-2xl sm:rounded-3xl shadow-3xl flex flex-col transform transition-transform animate-slide-up sm:animate-zoom-in"
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-10 sm:rounded-t-3xl text-sm md:text-base">
                    <button onClick={onClose} className="px-2 py-1 text-gray-800 font-semibold hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                    <h2 className="font-bold tracking-tight">New thread</h2>
                    <div className="w-16"></div> {/* Spacer for centering */}
                </div>

                <div className="flex-1 overflow-y-auto p-4 flex gap-4">
                    <div className="flex flex-col items-center">
                        <img
                            src={currentUser?.avatarUrl || 'https://i.pravatar.cc/150'}
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border border-gray-100"
                        />
                        <div className="w-0.5 h-full bg-gray-200 mt-2 rounded-full min-h-[40px]"></div>
                        <div className="w-4 h-4 rounded-full border border-gray-200 mt-2 flex-shrink-0 opacity-50"></div>
                    </div>

                    <div className="flex-1 flex flex-col pt-1">
                        <span className="font-bold text-sm tracking-tight">{currentUser?.username || 'user'}</span>
                        <textarea
                            ref={textareaRef}
                            value={content}
                            onChange={handleChange}
                            placeholder="Start a thread..."
                            disabled={isSubmitting}
                            className="w-full bg-transparent border-none focus:ring-0 active:ring-0 resize-none p-0 mt-1 min-h-[40px] text-[15px] placeholder-gray-400 focus:outline-none"
                            rows={1}
                        />

                        <div className="flex gap-4 mt-2 mb-8 text-gray-500 items-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                            <span>🖼️</span>
                            <span>GIF</span>
                            <span>#️⃣</span>
                            <span>📊</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white sm:rounded-b-3xl sticky bottom-0">
                    <button className="text-gray-400 font-medium text-sm hover:text-gray-600 transition-colors">
                        Anyone can reply
                    </button>
                    {isSubmitting ? (
                        <div className="animate-pulse bg-gray-200 w-16 h-10 rounded-full flex items-center justify-center text-sm font-semibold opacity-50">
                            ...
                        </div>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={!content.trim()}
                            className={`px-5 py-2 rounded-full font-bold text-sm transition-all transform active:scale-95 ${content.trim() ? 'bg-black text-white hover:bg-gray-800 shadow-md' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                        >
                            Post
                        </button>
                    )}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                @keyframes zoom-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .animate-slide-up {
                    animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-zoom-in {
                    animation: zoom-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in {
                    animation: fade-in 0.2s ease-out forwards;
                }
            `}} />
        </div>
    );
};

export default CreatePostModal;
