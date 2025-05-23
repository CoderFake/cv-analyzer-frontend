import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { chatApi } from '../../api/chat';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export const ChatBox = ({ candidateId = null }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.');
        return;
      }
      
      const validTypes = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png'
      ];
      
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Định dạng file không được hỗ trợ. Vui lòng chọn PDF, DOC, DOCX, TXT, JPG hoặc PNG.');
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();

    if (input.trim() === '' && !file) return;
    
    // Nội dung tin nhắn người dùng
    const userMessageContent = input.trim() !== '' ? input : (file ? `Tôi đã tải lên file: ${file.name}. Hãy giúp tôi phân tích file cv này.` : '');
    
    // Hiển thị tin nhắn người dùng trước khi gửi
    const userMessage = {
      role: 'user',
      content: userMessageContent,
      created_at: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Chuẩn bị dữ liệu gửi lên server
      const requestData = {
        message: userMessageContent, // Đảm bảo có giá trị
        chat_id: chatId,
        candidate_id: candidateId,
        file: file
      };
      
      const response = await chatApi.sendMessage(requestData);

      if (response.success) {
        setChatId(response.data.chat_id);
        setMessages((prev) => [...prev, response.data.message]);
      } else {
        throw new Error(response.message || 'Gửi tin nhắn thất bại');
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
      toast.error('Lỗi gửi tin nhắn. Vui lòng thử lại.');
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg" onClick={handleStopPropagation}>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 mb-4">
              {isAuthenticated 
                ? 'Hãy bắt đầu cuộc trò chuyện! Tôi có thể giúp gì cho bạn?' 
                : 'Hãy bắt đầu cuộc trò chuyện! Đăng nhập để lưu lịch sử trò chuyện.'}
            </p>
            <div className="text-sm text-gray-400 max-w-md">
              <p className="mb-2">Bạn có thể hỏi về:</p>
              <ul className="list-disc list-inside text-left">
                <li>Đánh giá CV của bạn</li>
                <li>Gợi ý cải thiện hồ sơ ứng tuyển</li>
                <li>Kiến thức về quy trình tuyển dụng</li>
                <li>Tư vấn kỹ năng phỏng vấn</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isUser={message.role === 'user'}
              />
            ))}
            {loading && (
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
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
      
      {file && (
        <div className="px-4 py-2 bg-blue-50 border-t border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span className="text-sm font-medium truncate max-w-xs">{file.name}</span>
            </div>
            <button 
              onClick={() => setFile(null)} 
              className="text-gray-500 hover:text-red-600 text-sm"
              disabled={loading}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="button"
            onClick={handleUploadClick}
            className="bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
            title="Tải lên file"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
            </svg>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading || (!input.trim() && !file)}
          >
            Gửi
          </button>
        </form>
      </div>
    </div>
  );
};