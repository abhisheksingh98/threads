import React, { useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../hooks/useAuth';
import { User } from '../store/slices/usersSlice';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const SearchSection = () => {
    const { usersById, follow, unfollow } = useProfile();
    const { currentUser } = useAuth();
    const [searchQuery, setSearchQueryLocal] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQueryLocal(e.target.value);
    };

    const renderUserCard = (user: User) => {

        const profile = usersById[currentUser?.id || ''];
        const isFollowing = profile?.following?.includes(user.id);

        const toggleFollow = () => {
            if (isFollowing) {
                unfollow(user.id, currentUser?.id || '');
            } else {
                follow(user.id, currentUser?.id || '');
            }
        };

        return (
            <div key={user.id} className="flex items-center justify-between py-3 px-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <Avatar
                        src={user.avatarUrl || `https://i.pravatar.cc/150?u=${user.id}`}
                        alt={user.username}
                        size="lg"
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-sm leading-tight hover:underline cursor-pointer">{user.username}</span>
                        <span className="text-xs text-gray-500 font-medium">{user.fullName || user.username}</span>
                        {user.followers && <span className="text-xs text-gray-500 mt-0.5">{user.followers.length} followers</span>}
                    </div>
                </div>
                {currentUser && currentUser.id !== user.id && (
                    <Button
                        onClick={toggleFollow}
                        variant={isFollowing ? 'outline' : 'primary'}
                        className="px-6 min-w-[100px]"
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                )}
            </div>
        );
    };

    let userList: User[] = Object.values(usersById);
    if (searchQuery) {
        userList = userList.filter((user) =>
            (user.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.fullName || '').toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    if (userList.length === 0 && !searchQuery) {
        userList = [
            { id: 'user_2', username: 'mosseri', fullName: 'Adam Mosseri', avatarUrl: 'https://i.pravatar.cc/150?u=mosseri', followers: ['1', '2', '3'], bio: '', following: [] },
            { id: 'user_3', username: 'mkbhd', fullName: 'Marques Brownlee', avatarUrl: 'https://i.pravatar.cc/150?u=mkbhd', followers: ['1'], bio: '', following: [] },
            { id: 'user_4', username: 'lexfridman', fullName: 'Lex Fridman', avatarUrl: 'https://i.pravatar.cc/150?u=lex', followers: [], bio: '', following: [] },
        ];
    }

    return (
        <div className="bg-white min-h-[85vh] pt-4">
            <div className="px-4 mb-4">
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">🔍</span>
                    <Input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="border-t border-gray-100">
                {userList.length > 0 ? (
                    userList.map((u) => renderUserCard(u))
                ) : (
                    <div className="p-8 text-center text-gray-500 text-sm">No results found for "{searchQuery}"</div>
                )}
            </div>
        </div>
    );
};


export default SearchSection;


