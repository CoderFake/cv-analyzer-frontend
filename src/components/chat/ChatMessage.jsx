import React from 'react';

export const ChatMessage = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`${
          isUser
            ? 'bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl'
            : 'bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl'
        } p-3 max-w-[80%]`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};