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
        console.error('Failed to load review:', error);
        setReview({ title: 'Review not found', content: 'The review API is not connected yet.' });
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
          <p>Loading...</p>
        ) : (
          <>
            <h2 className="card-title">{review.title}</h2>
            <p className="content-preview">{review.content}</p>
            <div className="card-footer">
              <button type="button" onClick={() => navigate('/community')}>Back</button>
              <button type="button" onClick={() => navigate(`/community/edit/${id}`)}>Edit</button>
            </div>
          </>
        )}
      </article>
      <Footer />
    </div>
  );
}
