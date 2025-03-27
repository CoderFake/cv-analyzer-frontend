import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filesApi } from '../../api/files';

export const KnowledgeUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    { id: 'recruitment', name: 'Tuyển dụng' },
    { id: 'hr-policy', name: 'Chính sách nhân sự' },
    { id: 'job-description', name: 'Mô tả công việc' },
    { id: 'training', name: 'Đào tạo' },
    { id: 'company', name: 'Thông tin công ty' },
    { id: 'other', name: 'Khác' },
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Vui lòng chọn file tài liệu');
      return;
    }
    
    if (!title) {
      setError('Vui lòng nhập tiêu đề');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    if (description) {
      formData.append('description', description);
    }
    if (category) {
      formData.append('category', category);
    }
    
    try {
      const response = await filesApi.uploadKnowledgeFile(formData);
      
      if (response.success) {
        navigate('/knowledge');
      } else {
        setError(response.message || 'Tải lên thất bại');
      }
    } catch (error) {
      console.error('Lỗi tải lên tài liệu:', error);
      setError(error.response?.data?.detail || 'Tải lên thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Tải lên tài liệu Knowledge Base</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tiêu đề tài liệu"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Mô tả
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mô tả ngắn về tài liệu"
            rows="3"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Danh mục
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            File tài liệu <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {file ? (
              <div className="text-green-600">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">
                  Kéo và thả file tài liệu hoặc click để chọn
                </p>
                <p className="text-xs text-gray-400">
                  Hỗ trợ PDF, DOCX, DOC, TXT
                </p>
              </>
            )}
            
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${
                file ? 'pointer-events-none' : ''
              }`}
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate('/knowledge')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading || !file || !title}
          >
            {loading ? 'Đang tải lên...' : 'Tải lên'}
          </button>
        </div>
      </form>
    </div>
  );
};