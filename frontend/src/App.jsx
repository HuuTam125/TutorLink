import { Routes, Route, useLocation } from 'react-router-dom';
import PageTransition from './components/user/layout/PageTransition';
import Header from './components/user/layout/Header';
import Footer from './components/user/layout/Footer'
import ScrollToTop from './components/user/layout/ScrollToTop'
import BackToTop from './components/user/layout/BackToTop'
import { ToastContainer } from 'react-toastify';
import { AnimatePresence } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

// 1. Auth Group
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// 2. Home Group
import HomePage from './pages/home/HomePage';

// 3. User Group 
import UserProfilePage from './pages/user/UserProfilePage';

// 4. Tutor Group
import TutorPage from './pages/tutor/TutorPage';
import TutorDetailPage from './pages/tutor/TutorDetailPage';

// 5. Class Group
import ClassesPage from './pages/class/ClassesPage';
import ClassDetailPage from './pages/class/ClassDetailPage'
import PostRequestPage from './pages/class/PostRequestPage';
import MyRequestsPage from './pages/class/MyRequestsPage';

// 6. Admin Group
import AdminPage from './pages/admin/AdminPage';

function App() {

  const location = useLocation();
  const hide = location.pathname.startsWith('/admin');

  return (
    <div>
      {!hide && <Header />}
      <ScrollToTop />
      <BackToTop />

      {/* 2. Thêm mode="wait" để trang cũ biến mất xong trang mới mới hiện ra (mượt hơn) */}
      <AnimatePresence mode="wait">
        {/* 3. Phải truyền location và key vào Routes để Framer Motion nhận diện sự thay đổi */}
        <Routes location={location} key={location.pathname}>

          {/* 4. Bọc PageTransition cho các element muốn có hiệu ứng */}
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

          <Route path="/admin" element={
            <PageTransition><AdminPage /></PageTransition>
          } />

        </Routes>
      </AnimatePresence>

      <ToastContainer />
      {!hide && <Footer />}
    </div>
  );
}

export default App;