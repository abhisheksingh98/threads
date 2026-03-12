// components/ProfileSection.tsx
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../store/actions';

class ProfileSection extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            isEditing: false,
            editForm: {
                fullName: props.currentUser?.fullName || '',
                bio: props.currentUser?.bio || '',
                link: props.currentUser?.link || ''
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        this.setState({
            editForm: {
                ...this.state.editForm,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSave() {
        this.props.updateProfile({
            id: this.props.currentUser.id,
            ...this.state.editForm
        });
        this.setState({ isEditing: false });
    }

    renderEditModal() {
        const { isEditing, editForm } = this.state;
        if (!isEditing) return null;

        return (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl animate-fade-in-up">
                    <div className="flex justify-between items-center p-4 border-b border-gray-100 font-bold">
                        <button onClick={() => this.setState({ isEditing: false })} className="text-gray-900 px-2 py-1">Cancel</button>
                        <span>Edit profile</span>
                        <button onClick={this.handleSave} className="text-black px-2 py-1">Done</button>
                    </div>

                    <div className="p-4 flex flex-col gap-4 bg-gray-50">
                        {/* Legacy ugly giant form div */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100 shadow-sm">
                            <div className="p-4 flex items-center justify-between">
                                <div className="flex flex-col flex-1">
                                    <label className="text-sm font-bold mb-1">Name</label>
                                    <input
                                        name="fullName"
                                        value={editForm.fullName}
                                        onChange={this.handleInputChange}
                                        className="text-sm border-none bg-transparent focus:ring-0 p-0 outline-none"
                                        placeholder="+ Write name"
                                    />
                                </div>
                                <img src={this.props.currentUser?.avatarUrl} className="w-14 h-14 rounded-full shadow-sm ml-4" />
                            </div>

                            <div className="p-4 flex flex-col">
                                <label className="text-sm font-bold mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    value={editForm.bio}
                                    onChange={this.handleInputChange}
                                    className="text-sm border-none bg-transparent focus:ring-0 p-0 outline-none resize-none h-16"
                                    placeholder="+ Write bio"
                                ></textarea>
                            </div>

                            <div className="p-4 flex flex-col">
                                <label className="text-sm font-bold mb-1">Link</label>
                                <input
                                    name="link"
                                    value={editForm.link}
                                    onChange={this.handleInputChange}
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
    }

    render() {
        const { currentUser } = this.props;

        if (!currentUser) return <div className="p-8 text-center">Not logged in</div>;

        return (
            <div className="bg-white min-h-[85vh] pt-4 px-4">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold tracking-tight">{currentUser.fullName}</h1>
                        <span className="text-sm font-medium">{currentUser.username} • <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-xl text-xs">threads.net</span></span>
                    </div>
                    <img src={currentUser.avatarUrl} alt="avatar" className="w-16 h-16 rounded-full border border-gray-200" />
                </div>

                <p className="text-sm mt-4 text-gray-900 whitespace-pre-wrap">{currentUser.bio}</p>

                <div className="flex gap-2 text-sm text-gray-500 mt-4 items-center">
                    <div className="flex -space-x-1.5 mr-1">
                        <div className="w-4 h-4 rounded-full bg-gray-300 border border-white"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-400 border border-white"></div>
                    </div>
                    <span>{currentUser.followers?.length || 0} followers</span>
                    <span>•</span>
                    <span className="hover:underline cursor-pointer">link.xyz</span>
                </div>

                <div className="flex gap-2 mt-6">
                    <button
                        onClick={() => this.setState({ isEditing: true })}
                        className="flex-1 py-1.5 border border-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm"
                    >
                        Edit profile
                    </button>
                    <button className="flex-1 py-1.5 border border-gray-300 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors shadow-sm">
                        Share profile
                    </button>
                </div>

                {/* Legacy Profile Tabs */}
                <div className="flex w-full mt-6 border-b border-gray-200">
                    <button className="flex-1 py-3 text-sm font-bold border-b-2 border-black">Threads</button>
                    <button className="flex-1 py-3 text-sm font-semibold text-gray-500">Replies</button>
                    <button className="flex-1 py-3 text-sm font-semibold text-gray-500">Reposts</button>
                </div>

                <div className="py-12 flex flex-col items-center justify-center text-gray-500">
                    <span className="text-sm font-semibold">No threads yet</span>
                </div>

                {this.renderEditModal()}

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
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.currentUser || {
        id: 'user_1',
        username: 'zuck',
        fullName: 'Mark Zuckerberg',
        bio: 'Building Threads.',
        followers: ['1', '2', '3'],
        avatarUrl: 'https://i.pravatar.cc/150?u=zuck'
    }
});

export default connect(mapStateToProps, { updateProfile })(ProfileSection);
