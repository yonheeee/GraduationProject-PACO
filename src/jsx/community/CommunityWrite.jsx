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
      alert('제목과 내용을 입력해주세요.');
      return;
    }

    setSaving(true);
    try {
      await ReviewApi.createReview(form);
      navigate('/community');
    } catch (error) {
      console.error('게시글 작성에 실패했습니다:', error);
      alert('리뷰 API가 아직 연결되지 않았습니다.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="community-container">
      <Header />
      <form className="review-card" onSubmit={onSubmit} style={{ cursor: 'default' }}>
        <input name="title" value={form.title} onChange={onChange} placeholder="제목" style={{ width: '100%', marginBottom: '0.75rem' }} />
        <select name="category" value={form.category} onChange={onChange} style={{ width: '100%', marginBottom: '0.75rem' }}>
          <option value="FREE">자유</option>
          <option value="QUESTION">질문</option>
          <option value="INFORMATION">꿀팁</option>
          <option value="REVIEW">후기</option>
        </select>
        <textarea name="content" value={form.content} onChange={onChange} placeholder="내용" rows={8} style={{ width: '100%' }} />
        <button type="submit" disabled={saving} style={{ marginTop: '1rem' }}>{saving ? '저장 중...' : '저장'}</button>
      </form>
      <Footer />
    </div>
  );
}