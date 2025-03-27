import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { knowledgeApi } from '../../api/knowledge';
import { useAuth } from '../../context/AuthContext';

export const KnowledgeList = () => {
  const [knowledgeDocs, setKnowledgeDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const { isHR } = useAuth();

  const categories = [
    { id: '', name: 'Tất cả' },
    { id: 'recruitment', name: 'Tuyển dụng' },
    { id: 'hr-policy', name: 'Chính sách nhân sự' },
    { id: 'job-description', name: 'Mô tả công việc' },
    { id: 'training', name: 'Đào tạo' },
    { id: 'company', name: 'Thông tin công ty' },
    { id: 'other', name: 'Khác' },
  ];

  useEffect(() => {
    const fetchKnowledge = async () => {
      setLoading(true);
      try {
        const response = await knowledgeApi.getAllKnowledge(selectedCategory);
        if (response.success) {
          setKnowledgeDocs(response.data);
        }
      } catch (error) {
        console.error('Lỗi lấy danh sách tài liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKnowledge();
  }, [selectedCategory]);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      const response = await knowledgeApi.getAllKnowledge(selectedCategory);
      if (response.success) {
        setKnowledgeDocs(response.data);
      }
      return;
    }
    
    setLoading(true);
    try {
      const response = await knowledgeApi.searchKnowledge(searchQuery);
      if (response.success) {
        setKnowledgeDocs(response.data);
      }
    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getDateFormatted = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Không có';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
      return;
    }
    
    try {
      const response = await knowledgeApi.deleteKnowledge(id);
      if (response.success) {
        setKnowledgeDocs(knowledgeDocs.filter(doc => doc.id !== id));
      }
    } catch (error) {
      console.error('Lỗi xóa tài liệu:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Knowledge Base</h1>
        {isHR() && (
          <Link
            to="/knowledge/upload"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Tải lên tài liệu
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tài liệu..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
          <div className="w-full md:w-64">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : knowledgeDocs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">Không tìm thấy tài liệu nào</p>
          {isHR() && (
            <Link
              to="/knowledge/upload"
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Tải lên tài liệu đầu tiên
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {knowledgeDocs.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <Link to={`/knowledge/${doc.id}`} className="block">
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600">{doc.title}</h3>
                </Link>
                {doc.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doc.description}</p>
                )}
                {doc.content_preview && (
                  <div className="text-gray-600 text-sm mb-4 line-clamp-3">{doc.content_preview}</div>
                )}
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div>Danh mục: {getCategoryName(doc.category)}</div>
                  <div>{getDateFormatted(doc.created_at)}</div>
                </div>
              </div>
              {isHR() && (
                <div className="bg-gray-50 px-6 py-2 flex justify-end">
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
