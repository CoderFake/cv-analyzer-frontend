import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBox } from '../components/chat/ChatBox';

export const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Phân tích CV thông minh, nâng cao cơ hội tuyển dụng
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Sử dụng AI phân tích CV của bạn, đưa ra đánh giá khách quan và gợi ý cải thiện
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Link
                to="/candidates/upload"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg shadow-lg"
              >
                Tải lên CV ngay
              </Link>
              <Link
                to="/knowledge"
                className="bg-transparent hover:bg-blue-700 border border-white font-bold py-3 px-6 rounded-lg"
              >
                Xem Knowledge Base
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tính năng nổi bật</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Phân tích CV</h3>
              <p className="text-gray-600">
                Sử dụng AI phân tích chi tiết CV của bạn, đưa ra đánh giá khách quan và xếp loại theo thang điểm A-E
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat với CV</h3>
              <p className="text-gray-600">
                Trò chuyện với AI về CV của bạn, nhận phản hồi và gợi ý để cải thiện hồ sơ ứng tuyển
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Knowledge Base</h3>
              <p className="text-gray-600">
                Truy cập kho kiến thức về tuyển dụng, mẫu CV, kỹ năng phỏng vấn và nhiều hơn nữa
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat with AI section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Hỏi đáp với AI</h2>
              <p className="text-lg text-gray-600">
                Trò chuyện với CV Analyzer AI để nhận hướng dẫn, lời khuyên và gợi ý về hồ sơ ứng tuyển của bạn
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="h-[500px]">
                <ChatBox />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Cách thức hoạt động</h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Tải lên CV</h3>
                <p className="text-gray-600">
                  Tải lên CV của bạn ở định dạng PDF, DOCX, DOC, TXT hoặc hình ảnh
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Phân tích AI</h3>
                <p className="text-gray-600">
                  AI phân tích chi tiết CV của bạn, đưa ra đánh giá và gợi ý cải thiện
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Nhận kết quả</h3>
                <p className="text-gray-600">
                  Nhận báo cáo đánh giá chi tiết, đánh giá mức độ phù hợp và gợi ý cải thiện
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sẵn sàng nâng cao hồ sơ ứng tuyển của bạn?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Tải lên CV của bạn ngay hôm nay và nhận đánh giá chi tiết, gợi ý cải thiện để tăng cơ hội được tuyển dụng!
          </p>
          <Link
            to="/candidates/upload"
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg inline-block"
          >
            Bắt đầu ngay
          </Link>
        </div>
      </div>
    </div>
  );
};