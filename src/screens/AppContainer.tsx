import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeActiveTab, fetchThreads, toggleCreateModal, setCurrentUser } from '../store/actions';

// We will implement these massive components in subsequent steps
import HomeFeed from '../components/HomeFeed';
import SearchSection from '../components/SearchSection';
import ActivitySection from '../components/ActivitySection';
import ProfileSection from '../components/ProfileSection';
import CreatePostModal from '../components/CreatePostModal';

// Mock Auth
const MOCK_CURRENT_USER = {
    id: 'user_1',
    username: 'zuck',
    fullName: 'Mark Zuckerberg',
    bio: 'Building Threads.',
    followers: [],
    following: [],
    avatarUrl: 'https://i.pravatar.cc/150?u=zuck'
};

class AppContainer extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isInitializing: true,
            windowWidth: window.innerWidth
        };
        this.handleResize = this.handleResize.bind(this);
        this.handleTabChange = this.handleTabChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        // Simulate initial data loading
        setTimeout(() => {
            if (!this.props.isAuthenticated) {
                // Auto login for offline simple use case
                this.props.setCurrentUser(MOCK_CURRENT_USER);
            }
            if (this.props.threads.length === 0) {
                // this.props.fetchThreads();
            }
            this.setState({ isInitializing: false });
        }, 500);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        this.setState({ windowWidth: window.innerWidth });
    }

    handleTabChange(tab: string) {
        this.props.changeActiveTab(tab);
    }

    renderActiveTab() {
        const { activeTab } = this.props;
        switch (activeTab) {
            case 'home':
                return <HomeFeed />;
            case 'search':
                return <SearchSection />;
            case 'activity':
                return <ActivitySection />;
            case 'profile':
                return <ProfileSection />;
            default:
                return <HomeFeed />;
        }
    }

    renderBottomNav() {
        const { activeTab } = this.props;
        const tabs = [
            { id: 'home', icon: '🏠' },
            { id: 'search', icon: '🔍' },
            { id: 'create', icon: '➕', action: this.props.toggleCreateModal },
            { id: 'activity', icon: '❤️' },
            { id: 'profile', icon: '👤' }
        ];

        return (
            <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-4 px-2 z-50">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => tab.action ? tab.action() : this.handleTabChange(tab.id)}
                        className={`text-2xl transition-transform transform active:scale-90 ${activeTab === tab.id ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
                    >
                        {tab.icon}
                    </button>
                ))}
            </div>
        );
    }

    render() {
        if (this.state.isInitializing) {
            return (
                <div className="flex h-screen items-center justify-center bg-gray-50">
                    <div className="animate-spin text-4xl">💭</div>
                </div>
            );
        }

        return (
            <div className="bg-gray-50 min-h-screen pb-20 font-sans text-gray-900 mx-auto max-w-2xl relative shadow-xl">
                {/* Header (optional based on tab) */}
                <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 py-3 text-center font-bold text-xl border-b border-gray-100 cursor-pointer">
                    @threads
                </header>

                <main className="w-full h-full relative">
                    {this.renderActiveTab()}
                </main>

                {this.renderBottomNav()}

                {this.props.isCreateModalOpen && <CreatePostModal onClose={this.props.toggleCreateModal} />}
            </div>
        );
    }
}

// @ts-ignore
AppContainer.propTypes = {
    activeTab: PropTypes.string.isRequired,
    changeActiveTab: PropTypes.func.isRequired,
    isCreateModalOpen: PropTypes.bool.isRequired,
    toggleCreateModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    setCurrentUser: PropTypes.func.isRequired,
    fetchThreads: PropTypes.func.isRequired,
    threads: PropTypes.array.isRequired
};

const mapStateToProps = (state: any) => ({
    activeTab: state.ui.activeTab,
    isCreateModalOpen: state.ui.isCreateModalOpen,
    isAuthenticated: state.auth.isAuthenticated,
    threads: state.threads.items
});

// Using legacy mapDispatchToProps object shorthand
export default connect(mapStateToProps, {
    changeActiveTab,
    toggleCreateModal,
    setCurrentUser,
    fetchThreads
})(AppContainer);
