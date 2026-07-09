import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import '../../css/mypage/Mypage.css';

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '' });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    alert('Profile edit API is not connected yet.');
    navigate('/mypage');
  };

  return (
    <div className="my-page-wrapper">
      <Header />
      <form className="content-container" onSubmit={onSubmit} style={{ width: '90%', margin: '2rem auto' }}>
        <h2>Profile Edit</h2>
        <label className="menu-text">
          Username
          <input name="username" value={form.username} onChange={onChange} style={{ width: '100%', marginTop: '0.5rem' }} />
        </label>
        <label className="menu-text" style={{ display: 'block', marginTop: '1rem' }}>
          Email
          <input name="email" value={form.email} onChange={onChange} style={{ width: '100%', marginTop: '0.5rem' }} />
        </label>
        <button type="submit" className="menu-item" style={{ marginTop: '1.5rem', width: '100%' }}>Save</button>
      </form>
      <Footer />
    </div>
  );
}
