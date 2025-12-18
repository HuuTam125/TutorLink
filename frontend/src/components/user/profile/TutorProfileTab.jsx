import { useState, useEffect } from 'react';
import axiosClient from '../../../api/axiosClient';
import { toast } from 'react-toastify';

const TutorProfileTab = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    bio: '', subjects: '', grades: '', area: '', teachingMethod: 'both', hourlyRate: 0, experience: '', isApproved: null
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosClient.get('/tutors/me');
        if (res.data) {
          setProfile({
            ...res.data,
            subjects: res.data.subjects.join(', '),
            grades: res.data.grades.join(', ')
          });
        }
      } catch (error) {
        console.log("Chưa có hồ sơ");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/tutors', profile);
      toast.success('Cập nhật hồ sơ thành công!');
    } catch (error) {
      toast.error('Lỗi cập nhật');
    }
  };

  if (loading) return <p>Đang tải...</p>;

  // Style helper
  const inputStyle = { width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '10px' };
  const labelStyle = { display: 'block', fontWeight: 'bold', marginBottom: '5px', marginTop: '10px' };

  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Hồ sơ dạy học</h2>

      {profile.isApproved === false && (
        <div style={{ background: '#fff3cd', color: '#856404', padding: '10px', borderRadius: '5px', marginBottom: '20px', border: '1px solid #ffeeba' }}>
          ⚠️ Hồ sơ đang chờ duyệt.
        </div>
      )}
      {profile.isApproved === true && (
        <div style={{ background: '#d1e7dd', color: '#0f5132', padding: '10px', borderRadius: '5px', marginBottom: '20px', border: '1px solid #badbcc' }}>
          ✅ Hồ sơ đang hoạt động.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Giới thiệu (Bio)</label>
        <textarea
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          rows="3" style={inputStyle}
        />

        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Môn dạy</label>
            <input type="text" value={profile.subjects} onChange={(e) => setProfile({ ...profile, subjects: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Khu vực</label>
            <input type="text" value={profile.area} onChange={(e) => setProfile({ ...profile, area: e.target.value })} style={inputStyle} />
          </div>
        </div>

        {/* ... Bạn copy nốt các input còn lại (Grades, HourlyRate, TeachingMethod) vào đây ... */}

        <button type="submit" style={{ background: '#007bff', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' }}>
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default TutorProfileTab;