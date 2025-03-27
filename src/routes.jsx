// src/routes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';

// Candidate Pages
import { CandidateList } from './components/candidates/CandidateList';
import { CandidateDetail } from './components/candidates/CandidateDetail';
import { CandidateUpload } from './components/candidates/CandidateUpload';

// Chat Pages
import { ChatHome } from './pages/chat/ChatHome';
import { ChatDetail } from './pages/chat/ChatDetail';

// Knowledge Pages
import { KnowledgeList } from './components/knowledge/KnowledgeList';
import { KnowledgeDetail } from './components/knowledge/KnowledgeDetail';
import { KnowledgeUpload } from './components/knowledge/KnowledgeUpload';

// Protected Routes
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AdminRoute } from './components/common/AdminRoute';
import { HRRoute } from './components/common/HRRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        {/* Candidates Routes */}
        <Route path="/candidates" element={<ProtectedRoute><CandidateList /></ProtectedRoute>} />
        <Route path="/candidates/:id" element={<CandidateDetail />} />
        <Route path="/candidates/upload" element={<CandidateUpload />} />
        
        {/* Chat Routes */}
        <Route path="/chat" element={<ProtectedRoute><ChatHome /></ProtectedRoute>} />
        <Route path="/chat/:id" element={<ProtectedRoute><ChatDetail /></ProtectedRoute>} />
        
        {/* Knowledge Routes */}
        <Route path="/knowledge" element={<KnowledgeList />} />
        <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
        <Route path="/knowledge/upload" element={<HRRoute><KnowledgeUpload /></HRRoute>} />
        
        {/* Admin Routes */}
        <Route path="/dashboard" element={<HRRoute><Dashboard /></HRRoute>} />
        
        {/* Fallback route for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Auth Layout Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;