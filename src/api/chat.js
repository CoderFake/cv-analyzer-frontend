import api from './index';

export const chatApi = {

  sendMessage: (data) => {
    if (data.file) {
      const formData = new FormData();
      formData.append('message', data.message || '');
      
      if (data.chat_id) {
        formData.append('chat_id', data.chat_id);
      }
      
      if (data.candidate_id) {
        formData.append('candidate_id', data.candidate_id);
      }
      
      formData.append('file', data.file);
      
      return api.post('/chat/message', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } 
    else {
      const formData = new FormData();
      formData.append('message', data.message);
      
      if (data.chat_id) {
        formData.append('chat_id', data.chat_id);
      }
      
      if (data.candidate_id) {
        formData.append('candidate_id', data.candidate_id);
      }
      
      return api.post('/chat/message', formData);
    }
  },
  
  getChatList: () => api.get('/chat/list'),
  
  getChatById: (id) => api.get(`/chat/${id}`),
  
  deleteChat: (id) => api.delete(`/chat/${id}`),
  
  sendLegacyMessage: (data) => api.post('/chat/send', data),
  
  sendLegacyFileMessage: (formData) => api.post('/chat/send-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};