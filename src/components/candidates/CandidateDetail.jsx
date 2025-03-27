import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { candidatesApi } from '../../api/candidates';
import { filesApi } from '../../api/files';
import { ChatBox } from '../chat/ChatBox';
import { useAuth } from '../../context/AuthContext';

export const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isHR } = useAuth();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [evaluation, setEvaluation] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await candidatesApi.getCandidateById(id);
        if (response.success) {
          setCandidate(response.data);
          if (response.data.evaluation) {
            setEvaluation({
              content: response.data.evaluation,
              grade: response.data.grade
            });
          }
        }
      } catch (error) {
        console.error('Lỗi lấy thông tin ứng viên:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleEvaluate = async () => {
    setEvaluating(true);
    
    try {
      const response = await candidatesApi.evaluateCandidate(id);
      if (response.success) {
        setEvaluation(response.data);
        setCandidate(prev => ({
          ...prev,
          grade: response.data.grade,
          evaluation: response.data.evaluation
        }));
      }
    } catch (error) {
      console.error('Lỗi đánh giá CV:', error);
    } finally {
      setEvaluating(false);
    }
  };

  const handleDownloadCV = async () => {
    try {
      const response = await filesApi.getDownloadUrl(id);
      if (response.success) {
        setDownloadUrl(response.data.download_url);
        window.open(response.data.download_url, '_blank');
      }
    } catch (error) {
      console.error('Lỗi tải CV:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa ứng viên này?')) {
      return;
    }
    
    try {
      const response = await candidatesApi.deleteCandidate(id);
      if (response.success) {
        navigate('/candidates');
      }
    } catch (error) {
      console.error('Lỗi xóa ứng viên:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h2 className="text-xl font-semibold mb-2">Ứng viên không tồn tại</h2>
        <button
          onClick={() => navigate('/candidates')}
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
        <h1 className="text-2xl font-bold">
          {candidate.fullname || 'Ứng viên không tên'}
        </h1>
        <div className="space-x-2">
          <button
            onClick={handleDownloadCV}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Tải xuống CV
          </button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin ứng viên</h2>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-600">Họ tên:</div>
                <div className="col-span-2 font-medium">{candidate.fullname || 'Không có'}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-600">Email:</div>
                <div className="col-span-2">{candidate.email || 'Không có'}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-600">Số điện thoại:</div>
                <div className="col-span-2">{candidate.phone || 'Không có'}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-600">Vị trí ứng tuyển:</div>
                <div className="col-span-2 font-medium">{candidate.position_applied || 'Không có'}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-600">File CV:</div>
                <div className="col-span-2">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownloadCV();
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {candidate.cv_file_name}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-600">Ngày tạo:</div>
                <div className="col-span-2">
                  {new Date(candidate.created_at).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Đánh giá CV</h2>
              {!evaluating && !evaluation && (
                <button
                  onClick={handleEvaluate}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Đánh giá
                </button>
              )}
            </div>

            {evaluating ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-gray-600">Đang phân tích và đánh giá CV...</p>
                <p className="text-xs text-gray-500 mt-2">
                  Quá trình này có thể mất vài phút, vui lòng đợi
                </p>
              </div>
            ) : evaluation ? (
              <div>
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <span className="text-gray-600">Xếp loại:</span>
                  </div>
                  <div
                    className={`font-bold text-lg px-3 py-1 rounded ${
                      evaluation.grade === 'A'
                        ? 'bg-green-100 text-green-800'
                        : evaluation.grade === 'B'
                        ? 'bg-blue-100 text-blue-800'
                        : evaluation.grade === 'C'
                        ? 'bg-yellow-100 text-yellow-800'
                        : evaluation.grade === 'D'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {evaluation.grade}
                  </div>
                </div>

                <div className="prose max-w-none">
                  <div 
                    className="whitespace-pre-wrap" 
                    dangerouslySetInnerHTML={{ __html: evaluation.content.replace(/\n/g, '<br>') }} 
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Chưa có đánh giá. Nhấn nút "Đánh giá" để phân tích CV.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Chat với CV</h2>
          <div className="h-[600px]">
            <ChatBox candidateId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};