import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TutorProfilePage from './pages/TutorProfilePage';
import PostRequestPage from './pages/PostRequestPage';
import TutorDetailPage from './pages/TutorDetailPage';
import MyRequestsPage from './pages/MyRequestsPage';
import AdminPage from './pages/AdminPage';
import AdminTutorDetailPage from './pages/admin/TutorDetailPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const location = useLocation();
  const hideHeader = location.pathname.startsWith('/admin');

  return (
    <div>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tutor-profile" element={<TutorProfilePage />} />
        <Route path="/post-request" element={<PostRequestPage />} />
        <Route path="/tutor/:id" element={<TutorDetailPage />} />
        <Route path="/my-requests" element={<MyRequestsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/tutor-profile/:id" element={<AdminTutorDetailPage />} />

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;