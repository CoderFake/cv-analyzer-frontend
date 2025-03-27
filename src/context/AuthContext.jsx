import { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await authApi.getMe();
          if (response.success) {
            setUser(response.data);
          } else {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Lỗi xác thực:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.login(credentials);
      
      if (response.success) {
        const { access_token, user } = response.data;
        localStorage.setItem('token', access_token);
        setToken(access_token);
        setUser(user);
        return true;
      } else {
        setError(response.message || 'Đăng nhập thất bại');
        return false;
      }
    } catch (error) {
      setError(error.response?.data?.detail || 'Đăng nhập thất bại');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.register(userData);
      
      if (response.success) {
        return true;
      } else {
        setError(response.message || 'Đăng ký thất bại');
        return false;
      }
    } catch (error) {
      setError(error.response?.data?.detail || 'Đăng ký thất bại');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const isHR = () => {
    return user?.role === 'hr' || user?.role === 'admin';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin,
        isHR,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
};