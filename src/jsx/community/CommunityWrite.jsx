import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import ReviewApi from '../../api/Review/Review.js';
import '../../css/community/Community.css';

const initialForm = {
  title: '',
  content: '',
  category: 'FREE',
  parkingDifficulty: 'NORMAL',
};

export default function CommunityWrite() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      alert('Please enter title and content.');
      return;
    }

    setSaving(true);
    try {
      await ReviewApi.createReview(form);
      navigate('/community');
    } catch (error) {
      console.error('Failed to create review:', error);
      alert('Review API is not connected yet.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="community-container">
      <Header />
      <form className="review-card" onSubmit={onSubmit} style={{ cursor: 'default' }}>
        <input name="title" value={form.title} onChange={onChange} placeholder="Title" style={{ width: '100%', marginBottom: '0.75rem' }} />
        <select name="category" value={form.category} onChange={onChange} style={{ width: '100%', marginBottom: '0.75rem' }}>
          <option value="FREE">Free</option>
          <option value="QUESTION">Question</option>
          <option value="INFORMATION">Information</option>
          <option value="REVIEW">Review</option>
        </select>
        <textarea name="content" value={form.content} onChange={onChange} placeholder="Content" rows={8} style={{ width: '100%' }} />
        <button type="submit" disabled={saving} style={{ marginTop: '1rem' }}>{saving ? 'Saving...' : 'Save'}</button>
      </form>
      <Footer />
    </div>
  );
}
