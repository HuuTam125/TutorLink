import { Routes, Route, useLocation } from 'react-router-dom';
import PageTransition from './components/user/layout/PageTransition';
import Header from './components/user/layout/Header';
import Footer from './components/user/layout/Footer';
import ScrollToTop from './components/user/layout/ScrollToTop';
import BackToTop from './components/user/layout/BackToTop';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

// Chat Widget
import ChatWidget from './components/common/ChatWidget';

// Auth Group
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Home Group
import HomePage from './pages/home/HomePage';

// User Group 
import UserProfilePage from './pages/user/UserProfilePage';

// Tutor Group
import TutorPage from './pages/tutor/TutorPage';
import TutorDetailPage from './pages/tutor/TutorDetailPage';

// Class Group
import ClassesPage from './pages/class/ClassesPage';
import ClassDetailPage from './pages/class/ClassDetailPage';
import PostRequestPage from './pages/class/PostRequestPage';
import MyRequestsPage from './pages/class/MyRequestsPage';

// Contact Group
import ContactPage from './pages/contact/ContactPage';

// Admin Group
import AdminPage from './pages/admin/AdminPage';

function App() {
  const location = useLocation();
  // Kiểm tra nếu đang ở trang Admin để ẩn Header, Footer và ChatWidget
  const hide = location.pathname.startsWith('/admin');

  return (
    <div>
      {!hide && <Header />}
      <ScrollToTop />
      <BackToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          <Route path="/" element={
            <PageTransition><HomePage /></PageTransition>
          } />

          <Route path="/login" element={
            <PageTransition><LoginPage /></PageTransition>
          } />

          <Route path="/register" element={
            <PageTransition><RegisterPage /></PageTransition>
          } />

          <Route path="/profile" element={
            <PageTransition><UserProfilePage /></PageTransition>
          } />

          <Route path="/post-request" element={
            <PageTransition><PostRequestPage /></PageTransition>
          } />

          <Route path="/tutors/:id" element={
            <PageTransition><TutorDetailPage /></PageTransition>
          } />

          <Route path="/my-requests" element={
            <PageTransition><MyRequestsPage /></PageTransition>
          } />

          <Route path="/tutors" element={
            <PageTransition><TutorPage /></PageTransition>
          } />

          <Route path="/classes" element={
            <PageTransition><ClassesPage /></PageTransition>
          } />

          <Route path="/classes/:id" element={
            <PageTransition><ClassDetailPage /></PageTransition>
          } />

          <Route path="/contact" element={
            <PageTransition><ContactPage /></PageTransition>
          } />

          <Route path="/admin" element={
            <PageTransition><AdminPage /></PageTransition>
          } />

        </Routes>
      </AnimatePresence>

      {/* Chỉ hiện ChatWidget nếu không phải trang Admin */}
      {!hide && <ChatWidget />}

      <ToastContainer />
      {!hide && <Footer />}
    </div>
  );
}

export default App;