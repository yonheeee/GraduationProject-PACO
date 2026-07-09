import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import ReviewApi from '../../api/Review/Review.js';
import '../../css/community/Community.css';

export default function CommunityUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', category: 'FREE' });

  useEffect(() => {
    const loadReview = async () => {
      try {
        const data = await ReviewApi.getReview(id);
        setForm({
          title: data.title || '',
          content: data.content || '',
          category: data.category || 'FREE',
        });
      } catch (error) {
        console.error('Failed to load review:', error);
      }
    };

    loadReview();
  }, [id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await ReviewApi.updateReview(id, form);
      navigate(`/community/${id}`);
    } catch (error) {
      console.error('Failed to update review:', error);
      alert('Review API is not connected yet.');
    }
  };

  return (
    <div className="community-container">
      <Header />
      <form className="review-card" onSubmit={onSubmit} style={{ cursor: 'default' }}>
        <input name="title" value={form.title} onChange={onChange} placeholder="Title" style={{ width: '100%', marginBottom: '0.75rem' }} />
        <textarea name="content" value={form.content} onChange={onChange} placeholder="Content" rows={8} style={{ width: '100%' }} />
        <button type="submit" style={{ marginTop: '1rem' }}>Update</button>
      </form>
      <Footer />
    </div>
  );
}
