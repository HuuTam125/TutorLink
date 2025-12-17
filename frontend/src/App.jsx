import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/user/layout/Header';
import Footer from './components/user/layout/Footer'
import ScrollToTop from './components/user/layout/ScrollToTop'
import BackToTop from './components/user/layout/BackToTop'
import { ToastContainer } from 'react-toastify';
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/post-request" element={<PostRequestPage />} />
        <Route path="/tutors/:id" element={<TutorDetailPage />} />
        <Route path="/my-requests" element={<MyRequestsPage />} />
        <Route path="/tutors" element={<TutorPage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/classes/:id" element={<ClassDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>
      <ToastContainer />
      {!hide && <Footer />}
    </div>
  );
}

export default App;