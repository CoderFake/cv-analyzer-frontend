import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chatApi } from '../../api/chat';
import { ChatMessage } from '../../components/chat/ChatMessage';

export const ChatDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await chatApi.getChatById(id);
        if (response.success) {
          setChat(response.data);
          setMessages(response.data.messages || []);
        }
      } catch (error) {
        console.error('Lỗi lấy chi tiết chat:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChat();
  }, [id]);
  
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage = {
      role: 'user',
      content: input,
      created_at: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);

    try {
      const response = await chatApi.sendMessage({
        message: input,
        chat_id: id,
      });

      if (response.success) {
        setMessages((prev) => [...prev, response.data.message]);
      }
    } catch (error) {
      console.error('Lỗi gửi tin nhắn:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };
  
  const handleDeleteChat = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa cuộc trò chuyện này?')) {
      return;
    }
    
    try {
      const response = await chatApi.deleteChat(id);
      if (response.success) {
        navigate('/chat');
      }
    } catch (error) {
      console.error('Lỗi xóa chat:', error);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h2 className="text-xl font-semibold mb-2">Cuộc trò chuyện không tồn tại</h2>
        <button
          onClick={() => navigate('/chat')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{chat.title || 'Cuộc trò chuyện'}</h2>
        <button
          onClick={handleDeleteChat}
          className="text-red-500 hover:text-red-700"
        >
          Xóa cuộc trò chuyện
        </button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isUser={message.role === 'user'}
          />
        ))}
        {sending && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-br-3xl rounded-tr-3xl rounded-tl-xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={sending}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={sending || !input.trim()}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};