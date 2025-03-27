import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { candidatesApi } from '../api/candidates';
import { useAuth } from '../context/AuthContext';

const CandidatesByGradeChart = ({ data }) => {
  const gradeColors = {
    A: 'bg-green-500',
    B: 'bg-blue-500',
    C: 'bg-yellow-500',
    D: 'bg-orange-500',
    E: 'bg-red-500',
  };

  const totalCandidates = Object.values(data).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6 flex-1">
      <h3 className="text-lg font-semibold mb-4">Thống kê ứng viên theo đánh giá</h3>
      <div className="space-y-4">
        {Object.entries(gradeColors).map(([grade, color]) => (
          <div key={grade} className="flex items-center">
            <div className="w-8 text-sm font-medium">{grade}</div>
            <div className="flex-1 mx-2 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${color}`}
                style={{
                  width: `${((data[grade] || 0) / totalCandidates) * 100}%`,
                }}
              ></div>
            </div>
            <div className="w-10 text-right text-sm">{data[grade] || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentCandidatesTable = ({ candidates }) => {
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Ứng viên gần đây</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên ứng viên
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
    </div>
  );
};

const MetricCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${color} text-white mr-4`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCandidates: 0,
    evaluatedCandidates: 0,
    gradeStats: {},
    recentCandidates: [],
  });
  const [loading, setLoading] = useState(true);
  const { isHR } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await candidatesApi.getAdminCandidates();
        
        if (response.success) {
          const candidates = response.data;
          
          // Tính các chỉ số
          const totalCandidates = candidates.length;
          const evaluatedCandidates = candidates.filter(c => c.grade).length;
          
          // Thống kê theo đánh giá
          const gradeStats = candidates.reduce((acc, candidate) => {
            if (candidate.grade) {
              acc[candidate.grade] = (acc[candidate.grade] || 0) + 1;
            }
            return acc;
          }, {});
          
          // Lấy 5 ứng viên mới nhất
          const recentCandidates = [...candidates]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 5);
          
          setStats({
            totalCandidates,
            evaluatedCandidates,
            gradeStats,
            recentCandidates,
          });
        }
      } catch (error) {
        console.error('Lỗi lấy dữ liệu dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isHR()) {
      fetchDashboardData();
    }
  }, [isHR]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricCard
          title="Tổng số ứng viên"
          value={stats.totalCandidates}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          }
          color="bg-blue-500"
        />
        
        <MetricCard
          title="Đã đánh giá"
          value={stats.evaluatedCandidates}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
          color="bg-green-500"
        />
        
        <MetricCard
          title="Tỷ lệ đánh giá"
          value={`${stats.totalCandidates ? Math.round((stats.evaluatedCandidates / stats.totalCandidates) * 100) : 0}%`}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          }
          color="bg-purple-500"
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <CandidatesByGradeChart data={stats.gradeStats} />
        
        <div className="bg-white rounded-lg shadow p-6 flex-1">
          <h3 className="text-lg font-semibold mb-4">Thống kê nhanh</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Tổng ứng viên mới tháng này</span>
              <span className="font-semibold">{stats.recentCandidates.length}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Ứng viên xuất sắc (A)</span>
              <span className="font-semibold">{stats.gradeStats.A || 0}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Ứng viên tốt (B)</span>
              <span className="font-semibold">{stats.gradeStats.B || 0}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Ứng viên trung bình (C)</span>
              <span className="font-semibold">{stats.gradeStats.C || 0}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Ứng viên dưới trung bình (D, E)</span>
              <span className="font-semibold">{(stats.gradeStats.D || 0) + (stats.gradeStats.E || 0)}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <Link
              to="/candidates"
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Xem tất cả ứng viên →
            </Link>
          </div>
        </div>
      </div>
      
      <RecentCandidatesTable candidates={stats.recentCandidates} />
    </div>
  );
};