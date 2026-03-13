import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useUi } from '../context/UiContext';
import { useAuth } from '../hooks/useAuth';
import CreatePostModal from '../components/CreatePostModal';

// Mock Auth User matching the standardized User interface
const MOCK_CURRENT_USER = {
    id: 'user_1',
    username: 'zuck',
    fullName: 'Mark Zuckerberg',
    bio: 'Building Threads.',
    followers: [],
    following: [],
    avatarUrl: 'https://i.pravatar.cc/150?u=zuck'
};

const AppContainer = () => {
    const { isCreateModalOpen, toggleCreateModal } = useUi();
    const { isAuthenticated, login } = useAuth();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        // Simulate initial data loading with a slight delay
        const timer = setTimeout(() => {
            if (!isAuthenticated) {
                login(MOCK_CURRENT_USER);
            }
            setIsInitializing(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [isAuthenticated, login]);

    if (isInitializing) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="animate-spin text-4xl">💭</div>
            </div>
        );
    }

    const tabs = [
        { id: 'home', icon: '🏠', path: '/' },
        { id: 'search', icon: '🔍', path: '/search' },
        { id: 'create', icon: '➕', action: toggleCreateModal },
        { id: 'activity', icon: '❤️', path: '/activity' },
        { id: 'profile', icon: '👤', path: '/profile' }
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-900 mx-auto max-w-2xl relative shadow-xl">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 py-3 text-center font-bold text-xl border-b border-gray-100 cursor-pointer">
                @threads
            </header>

            <main className="w-full h-full relative">
                <Outlet />
            </main>

            <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-4 px-2 z-50">
                {tabs.map(tab => (
                    tab.path ? (
                        <NavLink
                            key={tab.id}
                            to={tab.path}
                            className={({ isActive }) =>
                                `text-2xl transition-transform transform active:scale-90 ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`
                            }
                        >
                            {tab.icon}
                        </NavLink>
                    ) : (
                        <button
                            key={tab.id}
                            onClick={tab.action}
                            className="text-2xl transition-transform transform active:scale-90 opacity-50 hover:opacity-75"
                        >
                            {tab.icon}
                        </button>
                    )
                ))}
            </div>

            {isCreateModalOpen && <CreatePostModal onClose={toggleCreateModal} />}
        </div>
    );
};

export default AppContainer;


