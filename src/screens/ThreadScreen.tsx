import { useState } from "react";
import useAuth from "../hooks/useAuthState";
import Thread from "../components/Thread/Thread";
import InputText from "../components/InputText/InputText";
import threadsData from "../data/threads.json";

export class ThreadModel {
  author: string;
  timestamp: Date;
  commentsCount: number;
  mood: string;
  content: string;

  constructor(
    author: string,
    timestamp: Date,
    mood: string,
    content: string,
    commentsCount = 0
  ) {
    this.author = author;
    this.timestamp = timestamp;
    this.mood = mood;
    this.content = content;
    this.commentsCount = commentsCount;
  }
}

const ThreadScreen = () => {
  const { user } = useAuth();
  const initialThreads = threadsData.threads;
  const [threads, setThreads] = useState(initialThreads);

  const handleCreateThread = (thread: ThreadModel) => {
    const newThread = {
      id: threads.length > 0 ? threads[0].id + 1 : 1,
      author: {
        name: "Current User",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      timestamp: new Date().toISOString(),
      mood: "🙂",
      content: thread.content,
      commentsCount: 0,
    };

    setThreads([newThread, ...threads]);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-gray-800">
      <div className="text-white w-[700px] mb-5">
        <h1 className="mb-4 text-2xl font-medium text-primary">
          Hey {user || "Guest"}
        </h1>
        <p className="mb-4 text-md text-secondary">
          How’s it going? Share something with the community! 😊
        </p>
      </div>

      <div className="container flex flex-col items-center space-y-4">
        <InputText
          placeholder="What's on your mind today?"
          onSubmit={handleCreateThread}
        />

        {threads.map((thread, index) => (
          <Thread
            key={index}
            author={thread.author}
            timestamp={thread.timestamp.toLocaleString()}
            commentsCount={thread.commentsCount}
            mood={thread.mood}
          >
            {thread.content}
          </Thread>
        ))}
      </div>
    </div>
  );
};

export default ThreadScreen;
