import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CV Analyzer</h3>
            <p className="text-gray-600 mb-4">
              Công cụ phân tích CV thông minh hỗ trợ ứng viên và nhà tuyển dụng.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/candidates/upload" className="text-gray-600 hover:text-blue-600">
                  Phân tích CV
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 hover:text-blue-600">
                  Chat với CV
                </Link>
              </li>
              <li>
                <Link to="/knowledge" className="text-gray-600 hover:text-blue-600">
                  Knowledge Base
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: hoangdieu22022002@gmail.com</li>
              <li>Số điện thoại: +84 387367162</li>
              <li>Địa chỉ: số 12, 70/1150 Đường Láng, Láng Thượng, Đống Đa, Hà Nội</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} CV Analyzer. Đã đăng ký bản quyền.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.54 10.54 0 01-3.125 1.196 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 9.277l-2.908.988a1.54 1.54 0 00-1.04-1.04l.989-2.908a6.004 6.004 0 013.418 3.419zM12 12a1 1 0 100-2 1 1 0 000 2zm6.33-4.848L15.838 9.2a1.96 1.96 0 00-2.663 2.663l-2.049 2.493a6.003 6.003 0 01-3.418-3.419l2.908-.988a1.54 1.54 0 001.04 1.04l-.989 2.908a6.004 6.004 0 01-3.419-3.418l2.908-.988a1.54 1.54 0 001.04 1.04l-.988 2.908a6.003 6.003 0 013.418-3.419l-2.908.989a1.54 1.54 0 00-1.04-1.04l.988-2.908A5.96 5.96 0 0112 6c1.917 0 3.644.902 4.744 2.281z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};