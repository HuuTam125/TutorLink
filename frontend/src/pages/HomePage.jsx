import TutorList from '../components/TutorList';
import ClassRequestList from '../components/ClassRequestList';

const HomePage = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Chào mừng đến với Gia Sư VN</h1>
        <p>Kết nối Tri thức - Vươn tới tương lai</p>
      </div>

      {/* Layout 2 cột */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>

        {/* Cột trái: Danh sách Gia sư */}
        <div>
          <TutorList />
        </div>

        {/* Cột phải: Danh sách Lớp cần tìm */}
        <div>
          <ClassRequestList />
        </div>

      </div>
    </div>
  );
};

export default HomePage;