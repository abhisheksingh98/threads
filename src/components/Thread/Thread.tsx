import React from "react";

interface ThreadItemProps {
  author?: {
    name: string;
    avatar: string;
  };
  timestamp?: string;
  children?: React.ReactNode;
  commentsCount?: number;
  mood?: string;
}

const ThreadItem: React.FC<ThreadItemProps> = ({
  author,
  timestamp,
  children,
  commentsCount = 0,
  mood,
}) => {
  return (
    <div className="p-6 w-[700px] rounded-lg shadow-lg bg-gray-700">
      <div className="flex items-center mb-3 space-x-4">
        {author ? (
          <>
            <img
              src={author.avatar}
              alt={author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-white">{author.name}</h3>
              <span className="text-sm text-gray-400">{timestamp}</span>
            </div>
          </>
        ) : (
          <div>
            <h3 className="font-semibold text-white">New Thread</h3>
          </div>
        )}
      </div>

      <div className="flex p-4 mb-4 space-x-5 rounded-lg bg-gray-800">
        {mood && (
          <div className="flex items-center justify-center rounded-full bg-gray-600 w-12 h-12">
            <span role="img" aria-label="mood" className="text-2xl">
              {mood}
            </span>
          </div>
        )}
        <div className="flex-1 text-white break-words">{children}</div>
      </div>

      {commentsCount > 0 && (
        <div className="flex items-center text-gray-400">
          <span role="img" aria-label="comments" className="mr-2 text-lg">
            💬
          </span>
          <span className="text-sm">{commentsCount} comments</span>
        </div>
      )}
    </div>
  );
};

export default ThreadItem;
