import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { candidatesApi } from '../../api/candidates';
import { useAuth } from '../../context/AuthContext';

export const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isHR } = useAuth();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = isHR()
          ? await candidatesApi.getAdminCandidates()
          : await candidatesApi.getAllCandidates();
        
        if (response.success) {
          setCandidates(response.data);
        }
      } catch (error) {
        console.error('Lỗi lấy danh sách ứng viên:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [isHR]);

  const getGradeBadge = (grade) => {
    if (!grade) return null;
    
    const badgeColors = {
      A: 'bg-green-100 text-green-800',
      B: 'bg-blue-100 text-blue-800',
      C: 'bg-yellow-100 text-yellow-800',
      D: 'bg-orange-100 text-orange-800',
      E: 'bg-red-100 text-red-800',
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badgeColors[grade]}`}>
        {grade}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách ứng viên</h1>
        <Link
          to="/candidates/upload"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Tải lên CV mới
        </Link>
      </div>

      {candidates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500 mb-4">Chưa có ứng viên nào</p>
          <Link
            to="/candidates/upload"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Tải lên CV đầu tiên
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên ứng viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vị trí ứng tuyển
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đánh giá
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/candidates/${candidate.id}`}
                      className="text-blue-600 hover:text-blue-900 font-medium"
                    >
                      {candidate.fullname || 'Chưa có tên'}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {candidate.email || 'Không có'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {candidate.position_applied || 'Không có'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getGradeBadge(candidate.grade) || 'Chưa đánh giá'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(candidate.created_at).toLocaleDateString('vi-VN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};