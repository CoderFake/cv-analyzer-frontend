import React from 'react';

export const ChatMessage = ({ message, isUser }) => {
  const hasFileInfo = message.content.includes("Tôi đã tải lên file cv:") || 
                    (message.message_metadata && message.message_metadata.file_path);
  
  const renderContent = () => {
    if (hasFileInfo && isUser) {
      return (
        <div>
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span>{message.content}</span>
          </div>
        </div>
      );
    }
    
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = message.content.split(urlRegex);
    
    if (parts.length > 1) {
      return (
        <div>
          {parts.map((part, index) => {
            if (part.match(urlRegex)) {
              return (
                <a 
                  key={index} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={isUser ? "text-blue-200 underline" : "text-blue-600 underline"}
                >
                  {part}
                </a>
              );
            }
            return <span key={index}>{part}</span>;
          })}
        </div>
      );
    }
    
    const lines = message.content.split('\n');
    if (lines.length > 1) {
      return (
        <div>
          {lines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      );
    }
    
    return message.content;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`${
          isUser
            ? 'bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl'
            : 'bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl'
        } p-3 max-w-[80%]`}
      >
        <div className="whitespace-pre-wrap">{renderContent()}</div>
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};