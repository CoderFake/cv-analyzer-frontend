import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { candidatesApi } from '../../api/candidates';
import { toast } from 'react-toastify';

export const CandidateUpload = () => {
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Kiểm tra kích thước file (giới hạn 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File quá lớn. Vui lòng chọn file nhỏ hơn 10MB.');
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Ngăn chặn sự kiện lan tỏa
    
    if (!file) {
      setError('Vui lòng chọn file CV');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    if (position) {
      formData.append('position', position);
    }
    
    try {
      const response = await candidatesApi.uploadCV(formData);
      
      if (response.success) {
        const candidateId = response.data.id;
        toast.success('Tải lên CV thành công!');
        navigate(`/candidates/${candidateId}`);
      } else {
        setError(response.message || 'Tải lên thất bại');
      }
    } catch (error) {
      console.error('Lỗi tải lên CV:', error);
      setError(error.response?.data?.detail || 'Tải lên thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm ngăn chặn sự kiện lan tỏa
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow" onClick={handleStopPropagation}>
      <h2 className="text-2xl font-bold mb-6 text-center">Tải lên CV</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} onClick={handleStopPropagation}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="position">
            Vị trí ứng tuyển
          </label>
          <input
            id="position"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập vị trí ứng tuyển (không bắt buộc)"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="file">
            File CV
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="mt-2 text-sm text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">
                  Kéo và thả file CV hoặc click để chọn
                </p>
                <p className="text-xs text-gray-400">
                  Hỗ trợ PDF, DOCX, DOC, TXT và hình ảnh
                </p>
              </>
            )}
            
            <input
              id="file"
              type="file"
              onChange={handleFileChange}
              onClick={(e) => e.stopPropagation()}
              className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer ${
                file ? 'pointer-events-none' : ''
              }`}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          disabled={loading || !file}
        >
          {loading ? 'Đang tải lên...' : 'Tải lên CV'}
        </button>
      </form>
    </div>
  );
};