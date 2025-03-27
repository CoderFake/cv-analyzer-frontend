import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="py-4 px-6 bg-white shadow-sm">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CV Analyzer
        </Link>
      </div>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
      <footer className="py-4 bg-white border-t text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CV Analyzer. All rights reserved.
      </footer>
    </div>
  );
};