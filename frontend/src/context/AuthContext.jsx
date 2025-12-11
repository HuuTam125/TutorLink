import { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

// Tạo Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Khi reload trang, kiểm tra xem có lưu user trong localStorage không
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Hàm đăng nhập
  const login = async (email, password) => {
    const res = await axiosClient.post('/auth/login', { email, password });
    if (res.data) {
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data)); // Lưu vào trình duyệt
      return res.data;
    }
  };

  // Hàm đăng ký
  const register = async (userData) => {
    const res = await axiosClient.post('/auth/register', userData);
    if (res.data) {
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      return res.data;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};