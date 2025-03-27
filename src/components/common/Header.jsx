import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { isAuthenticated, user, isHR, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              CV Analyzer
            </Link>
            
            <nav className="hidden md:flex space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                Trang chủ
              </Link>
              <Link
                to="/candidates"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                CV của tôi
              </Link>
              <Link
                to="/chat"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                Trò chuyện
              </Link>
              <Link
                to="/knowledge"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                Knowledge Base
              </Link>
              {isHR() && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user.fullname?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden md:inline">{user.fullname}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Hồ sơ
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Đăng ký
                </Link>
              </div>
            )}
            
            <button
              onClick={toggleMenu}
              className="md:hidden ml-4 text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <nav className="grid gap-y-2">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/candidates"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                CV của tôi
              </Link>
              <Link
                to="/chat"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Trò chuyện
              </Link>
              <Link
                to="/knowledge"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Knowledge Base
              </Link>
              {isHR() && (
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              {!isAuthenticated && (
                <div className="grid gap-2 mt-2 pt-2 border-t">
                  <Link
                    to="/login"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-center hover:bg-gray-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md text-center hover:bg-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};