import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { Avatar } from './ui/Avatar';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const ProfileSection = () => {
    const { currentUser } = useAuth();
    const { updateProfile } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        fullName: currentUser?.fullName || '',
        bio: currentUser?.bio || '',
        link: currentUser?.link || ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        if (currentUser) {
            updateProfile({
                id: currentUser.id,
                ...editForm
            });
        }
        setIsEditing(false);
    };

    if (!currentUser) return <div className="p-8 text-center">Not logged in</div>;

    const renderEditModal = () => {
        if (!isEditing) return null;

        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl animate-fade-in-up">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100 font-bold">
                        <button onClick={() => setIsEditing(false)} className="text-gray-900 px-2 py-1">Cancel</button>
                        <span>Edit profile</span>
                        <button onClick={handleSave} className="text-black px-2 py-1">Done</button>
                    </div>

                    <div className="p-4 flex flex-col gap-4 bg-gray-50">
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100 shadow-sm">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex flex-col flex-1">
                                    <label className="text-sm font-bold mb-1">Name</label>
                                    <Input
                                        name="fullName"
                                        value={editForm.fullName}
                                        onChange={handleInputChange}
                                        className="text-sm border-none bg-transparent focus:ring-0 p-0 outline-none"
                                        placeholder="+ Write name"
                                    />
                                </div>
                                <Avatar src={currentUser?.avatarUrl} size="lg" className="ml-4" />
                            </div>

                            <div className="p-4 flex flex-col">
                                <label className="text-sm font-bold mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    value={editForm.bio}
                                    onChange={handleInputChange}
                                    className="text-sm border-none bg-transparent focus:ring-0 p-0 outline-none resize-none h-16"
                                    placeholder="+ Write bio"
                                ></textarea>
                            </div>

                            <div className="p-4 flex flex-col">
                                <label className="text-sm font-bold mb-1">Link</label>
                                <Input
                                    name="link"
                                    value={editForm.link}
                                    onChange={handleInputChange}
                                    className="text-sm border-none bg-transparent focus:ring-0 p-0 outline-none"
                                    placeholder="+ Add link"
                                />
                            </div>


                            <div className="p-4 flex items-center justify-between">
                                <span className="text-sm font-bold">Private profile</span>
                                <div className="w-11 h-6 bg-gray-200 rounded-full relative">
                                    <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white min-h-[85vh] pt-4 px-4">
            <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold tracking-tight">{currentUser.fullName}</h1>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{currentUser.username}</span>
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-xl text-[10px] font-bold">threads.net</span>
                    </div>
                </div>
                <Avatar src={currentUser.avatarUrl} size="xl" />
            </div>

            <p className="text-sm mt-4 text-gray-900 whitespace-pre-wrap">{currentUser.bio}</p>

            <div className="flex gap-2 text-sm text-gray-500 mt-4 items-center">
                <div className="flex -space-x-1.5 mr-1">
                    <div className="w-4 h-4 rounded-full bg-gray-300 border border-white"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-400 border border-white"></div>
                </div>
                <span>{currentUser.followers?.length || 0} followers</span>
                {currentUser.link && (
                    <>
                        <span>•</span>
                        <a href={currentUser.link} target="_blank" rel="noreferrer" className="hover:underline cursor-pointer truncate max-w-[150px]">
                            {currentUser.link.replace(/^https?:\/\//, '')}
                        </a>
                    </>
                )}
            </div>

            <div className="flex gap-2 mt-6">
                <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="flex-1 shadow-sm"
                >
                    Edit profile
                </Button>
                <Button variant="outline" className="flex-1 shadow-sm">
                    Share profile
                </Button>
            </div>

            {/* Profile Tabs */}
            <div className="flex w-full mt-6 border-b border-gray-200">
                <button className="flex-1 py-3 text-sm font-bold border-b-2 border-black">Threads</button>
                <button className="flex-1 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">Replies</button>
                <button className="flex-1 py-3 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">Reposts</button>
            </div>

            <div className="py-12 flex flex-col items-center justify-center text-gray-500">
                <span className="text-sm font-semibold">No threads yet</span>
            </div>

            {renderEditModal()}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px) scale(0.95); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </div>
    );
};

export default ProfileSection;
