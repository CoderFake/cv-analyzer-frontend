import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { chatApi } from '../../api/chat';
import { ChatBox } from '../../components/chat/ChatBox';

export const ChatHome = () => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await chatApi.getChatList();
        if (response.success) {
          setChatList(response.data);
        }
      } catch (error) {
        console.error('Lỗi lấy danh sách chat:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChatList();
  }, []);
  
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-1/4 border-r overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Lịch sử trò chuyện</h2>
        
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        ) : chatList.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Chưa có cuộc trò chuyện nào</p>
        ) : (
          <div className="space-y-2">
            {chatList.map((chat) => (
              <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              className="block p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="font-medium truncate">{chat.title || 'Cuộc trò chuyện mới'}</div>
              {chat.last_message && (
                <div className="text-sm text-gray-500 truncate">
                  {chat.last_message.role === 'user' ? 'Bạn: ' : 'AI: '}
                  {chat.last_message.content}
                </div>
              )}
              <div className="text-xs text-gray-400 mt-1">
                {new Date(chat.updated_at).toLocaleDateString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
    
    <div className="flex-1 p-4">
      <ChatBox />
    </div>
  </div>
);
};