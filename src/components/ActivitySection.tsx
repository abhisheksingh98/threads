import moment from 'moment';

interface Notification {
    id: string;
    type: 'like' | 'follow' | 'reply';
    actorId: string;
    actorName: string;
    content?: string;
    createdAt: string;
}

const ActivitySection = () => {
    const renderNotification = (notif: Notification) => {
        return (
            <div key={notif.id} className="flex items-center justify-between py-4 px-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-start gap-3 w-full">
                    <div className="relative pt-1">
                        <img src={`https://i.pravatar.cc/150?u=${notif.actorId}`} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5">
                            <div className="bg-pink-500 w-4 h-4 rounded-full flex items-center justify-center text-[10px] text-white">
                                {notif.type === 'like' ? '❤️' : notif.type === 'follow' ? '👤' : '💬'}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-sm hover:underline">{notif.actorName}</span>
                            <span className="text-gray-500 text-sm">
                                {notif.type === 'like' ? 'liked your thread' : notif.type === 'follow' ? 'followed you' : 'replied to you'} • {moment(notif.createdAt).fromNow(true)}
                            </span>
                        </div>
                        {notif.content && (
                            <p className="text-gray-500 text-sm mt-0.5 truncate">{notif.content}</p>
                        )}
                    </div>
                </div>
                {notif.type === 'follow' && (
                    <button className="px-5 py-1.5 rounded-xl border border-gray-300 text-sm font-semibold ml-2 hover:bg-gray-50 transition-colors">
                        Following
                    </button>
                )}
            </div>
        );
    };

    const mockNotifications: Notification[] = [
        { id: '1', type: 'follow', actorId: 'user_2', actorName: 'mosseri', createdAt: new Date(Date.now() - 3600000).toISOString() },
        { id: '2', type: 'like', actorId: 'user_3', actorName: 'mkbhd', content: 'This is an amazing offline clone', createdAt: new Date(Date.now() - 7200000).toISOString() },
        { id: '3', type: 'reply', actorId: 'user_4', actorName: 'lexfridman', content: 'Fascinating architecture choice.', createdAt: new Date(Date.now() - 86400000).toISOString() },
    ];

    return (
        <div className="bg-white min-h-[85vh] pt-2">
            <div className="px-4 mb-2 pb-2 border-b border-gray-100 flex gap-4 overflow-x-auto no-scrollbar touch-pan-x">
                {['All', 'Follows', 'Replies', 'Mentions', 'Quotes', 'Reposts'].map((tab, i) => (
                    <button key={tab} className={`px-4 py-1.5 rounded-xl text-sm font-bold whitespace-nowrap ${i === 0 ? 'bg-black text-white' : 'border border-gray-200 text-gray-900 bg-white hover:bg-gray-50'}`}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="flex flex-col">
                {mockNotifications.map(notif => renderNotification(notif))}
            </div>
        </div>
    );
};

export default ActivitySection;


