import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { knowledgeApi } from '../../api/knowledge';
import { useAuth } from '../../context/AuthContext';

export const KnowledgeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isHR } = useAuth();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [queryInput, setQueryInput] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [querying, setQuerying] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await knowledgeApi.getKnowledgeById(id);
        if (response.success) {
          setDocument(response.data);
        }
      } catch (error) {
        console.error('Lỗi lấy thông tin tài liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [id]);

  const handleQuery = async (e) => {
    e.preventDefault();
    
    if (!queryInput.trim()) return;
    
    setQuerying(true);
    setQueryResult(null);
    
    try {
      const response = await knowledgeApi.queryKnowledge(queryInput, document.category);
      if (response.success) {
        setQueryResult(response.data);
      }
    } catch (error) {
      console.error('Lỗi truy vấn:', error);
    } finally {
      setQuerying(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài liệu này?')) {
      return;
    }
    
    try {
      const response = await knowledgeApi.deleteKnowledge(id);
      if (response.success) {
        navigate('/knowledge');
      }
    } catch (error) {
      console.error('Lỗi xóa tài liệu:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h2 className="text-xl font-semibold mb-2">Tài liệu không tồn tại</h2>
        <button
          onClick={() => navigate('/knowledge')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{document.title}</h1>
        <div className="space-x-2">
          {isHR() && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <div className="text-sm text-gray-500 mb-2">
                Danh mục: {document.category || 'Không có'}
              </div>
              {document.description && (
                <div className="italic text-gray-600 mb-4">{document.description}</div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <h2 className="font-semibold text-lg mb-2">Nội dung</h2>
              <div className="prose max-w-none whitespace-pre-wrap">
                {document.content}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="font-semibold text-lg mb-4">Hỏi đáp về tài liệu</h2>
            <form onSubmit={handleQuery}>
              <div className="mb-4">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Nhập câu hỏi của bạn..."
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                disabled={querying || !queryInput.trim()}
              >
                {querying ? 'Đang xử lý...' : 'Đặt câu hỏi'}
              </button>
            </form>
          </div>

          {querying && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-center items-center py-10">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-gray-600">Đang phân tích tài liệu và tìm câu trả lời...</p>
                </div>
              </div>
            </div>
          )}

          {queryResult && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-800 mb-2">Câu hỏi:</h3>
              <p className="text-gray-600 mb-4">{queryInput}</p>
              
              <h3 className="font-medium text-gray-800 mb-2">Trả lời:</h3>
              <div className="prose max-w-none text-gray-600 mb-4 whitespace-pre-wrap">
                {queryResult.answer}
              </div>
              
              {queryResult.sources && queryResult.sources.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-800 mb-2">Nguồn:</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-500">
                    {queryResult.sources.map((source, index) => (
                      <li key={index}>{source.title}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};