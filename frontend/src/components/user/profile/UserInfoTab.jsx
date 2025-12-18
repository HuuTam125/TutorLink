const UserInfoTab = ({ user }) => {
  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Thông tin tài khoản</h2>
      <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '100px', height: '100px', background: '#e9ecef', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', color: '#666', margin: '0 auto' }}>
            {user?.fullName?.charAt(0)}
          </div>
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{user?.role === 'tutor' ? 'GIA SƯ' : 'HỌC VIÊN'}</p>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', fontSize: '14px' }}>Họ và tên</label>
            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #eee', marginTop: '5px' }}>{user?.fullName}</div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', fontSize: '14px' }}>Email</label>
            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #eee', marginTop: '5px' }}>{user?.email}</div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#666', fontSize: '14px' }}>Số điện thoại</label>
            <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '4px', border: '1px solid #eee', marginTop: '5px' }}>{user?.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoTab;