import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import ReviewApi from '../../api/Review/Review.js';
import '../../css/community/Community.css';

export default function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReview = async () => {
      try {
        const data = await ReviewApi.getReview(id);
        setReview(data);
      } catch (error) {
        console.error('게시글을 불러오지 못했습니다:', error);
        setReview({ title: '게시글을 찾을 수 없습니다', content: '리뷰 API가 아직 연결되지 않았습니다.' });
      } finally {
        setLoading(false);
      }
    };

    loadReview();
  }, [id]);

  return (
    <div className="community-container">
      <Header />
      <article className="review-card" style={{ cursor: 'default' }}>
        {loading ? (
          <p>불러오는 중...</p>
        ) : (
          <>
            <h2 className="card-title">{review.title}</h2>
            <p className="content-preview">{review.content}</p>
            <div className="card-footer">
              <button type="button" onClick={() => navigate('/community')}>목록</button>
              <button type="button" onClick={() => navigate(`/community/edit/${id}`)}>수정</button>
            </div>
          </>
        )}
      </article>
      <Footer />
    </div>
  );
}