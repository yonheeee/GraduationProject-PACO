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
        console.error('게시글을 불러오지 못했습니다:', error);
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
      console.error('게시글 수정에 실패했습니다:', error);
      alert('리뷰 API가 아직 연결되지 않았습니다.');
    }
  };

  return (
    <div className="community-container">
      <Header />
      <form className="review-card" onSubmit={onSubmit} style={{ cursor: 'default' }}>
        <input name="title" value={form.title} onChange={onChange} placeholder="제목" style={{ width: '100%', marginBottom: '0.75rem' }} />
        <textarea name="content" value={form.content} onChange={onChange} placeholder="내용" rows={8} style={{ width: '100%' }} />
        <button type="submit" style={{ marginTop: '1rem' }}>수정</button>
      </form>
      <Footer />
    </div>
  );
}