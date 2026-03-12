// components/SearchSection.tsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchQuery, followUser, unfollowUser } from '../store/actions';

class SearchSection extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.setSearchQuery(e.target.value);
    }

    renderUserCard(user: any) {
        const { currentUser } = this.props;
        const isFollowing = currentUser?.following?.includes(user.id);

        const toggleFollow = () => {
            if (isFollowing) {
                this.props.unfollowUser(user.id, currentUser.id);
            } else {
                this.props.followUser(user.id, currentUser.id);
            }
        };

        return (
            <div key={user.id} className="flex items-center justify-between py-3 px-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <img src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.id}`} alt="avatar" className="w-12 h-12 rounded-full border border-gray-200" />
                    <div className="flex flex-col">
                        <span className="font-bold text-sm leading-tight hover:underline cursor-pointer">{user.username}</span>
                        <span className="text-xs text-gray-500 font-medium">{user.fullName || user.username}</span>
                        {user.followers && <span className="text-xs text-gray-500 mt-0.5">{user.followers.length} followers</span>}
                    </div>
                </div>
                {currentUser && currentUser.id !== user.id && (
                    <button
                        onClick={toggleFollow}
                        className={`px-6 py-1.5 rounded-xl border text-sm font-semibold transition-colors ${isFollowing
                                ? 'bg-white text-gray-600 border-gray-300'
                                : 'bg-black text-white border-black'
                            }`}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                )}
            </div>
        );
    }

    render() {
        const { searchQuery, users } = this.props;

        // Simulating search on object properties because old pattern
        let userList = Object.values(users);
        if (searchQuery) {
            userList = userList.filter((user: any) =>
                (user.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                (user.fullName || '').toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Mock generic suggestions if no real users are found during offline mode setup
        if (userList.length === 0 && !searchQuery) {
            userList = [
                { id: 'user_2', username: 'mosseri', fullName: 'Adam Mosseri', avatarUrl: 'https://i.pravatar.cc/150?u=mosseri', followers: ['1', '2', '3'] },
                { id: 'user_3', username: 'mkbhd', fullName: 'Marques Brownlee', avatarUrl: 'https://i.pravatar.cc/150?u=mkbhd', followers: ['1'] },
                { id: 'user_4', username: 'lexfridman', fullName: 'Lex Fridman', avatarUrl: 'https://i.pravatar.cc/150?u=lex', followers: [] },
            ];
        }

        return (
            <div className="bg-white min-h-[85vh] pt-4">
                <div className="px-4 mb-4">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={this.handleSearch}
                            className="w-full bg-gray-100 border-none rounded-xl py-2 pl-9 pr-4 text-sm focus:ring-0 focus:outline-none placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="border-t border-gray-100">
                    {userList.length > 0 ? (
                        userList.map((u: any) => this.renderUserCard(u))
                    ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">No results found for "{searchQuery}"</div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    searchQuery: state.ui.searchQuery,
    users: state.users.byId,
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, { setSearchQuery, followUser, unfollowUser })(SearchSection);
