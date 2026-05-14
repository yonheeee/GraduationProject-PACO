import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewApi from '../../api/Review/Review.js';
import '../../css/community/Community.css';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer';

const Community = () => {
    const navigate = useNavigate();

    // 상태 관리
    const [reviews, setReviews] = useState([]);
    const [likeCounts, setLikeCounts] = useState({}); // { reviewId: count } 형태로 저장
    const [activeCategory, setActiveCategory] = useState('ALL'); // 'ALL', 'FREE', 'QUESTION', 'INFORMATION', 'REVIEW'
    const [searchTerm, setSearchTerm] = useState('');

    const CATEGORY_MAP = {
        'ALL': '전체',
        'FREE': '자유',
        'QUESTION': '질문',
        'INFORMATION': '꿀팁',
        'REVIEW': '후기'
    };

    // 데이터 불러오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                let data;

                if (searchTerm) {
                    data = await ReviewApi.searchReviews(searchTerm);
                } else if (activeCategory !== 'ALL') {
                    data = await ReviewApi.getReviewsByCategory(activeCategory);
                } else {
                    data = await ReviewApi.getReviews();
                }
                setReviews(data);

                if (data && data.length > 0) {
                    const likesMap = {};

                    await Promise.all(data.map(async (review) => {
                        try {
                            const response = await ReviewApi.getLikeCount('REVIEW', review.id);

                            const countValue = (typeof response === 'object' && response.count !== undefined)
                                ? response.count
                                : response;

                            likesMap[review.id] = countValue;
                        } catch (err) {
                            console.error(`ID ${review.id} 좋아요 로딩 실패`, err);
                            likesMap[review.id] = 0;
                        }
                    }));

                    setLikeCounts(likesMap);
                }

            } catch (error) {
                console.error("게시글 로딩 실패:", error);
            }
        };
        fetchData();
    }, [activeCategory, searchTerm]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
        }
    };

    const getDifficultyWidth = (difficulty) => {
        switch (difficulty) {
            case 'HARD': return '90%';
            case 'NORMAL': return '60%';
            case 'EASY': return '30%';
            default: return '0%';
        }
    };

    return (
        <div className="community-container">
            <Header />

            <div className="search-wrapper">
                <input
                    type="text"
                    className="search-input"
                    placeholder="주차장명 또는 지역명 입력"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>

            <div className="category-tabs">
                {Object.keys(CATEGORY_MAP).map((key) => (
                    <button
                        key={key}
                        className={`tab-btn ${activeCategory === key ? 'active' : ''}`}
                        onClick={() => setActiveCategory(key)}
                    >
                        {CATEGORY_MAP[key]}
                    </button>
                ))}
            </div>

            <div className="review-feed">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="review-card"
                        onClick={() => navigate(`/community/${review.id}`)}
                    >
                        <div className="card-header">
                            <h3 className="card-title">
                                {review.category === 'REVIEW' ? `[ ${review.title} ]` : review.title}
                            </h3>
                        </div>

                        {review.category === 'REVIEW' && review.parkingDifficulty && (
                            <div className="difficulty-section">
                                <span className="diff-label">주차난이도</span>
                                <div className="diff-bar-bg">
                                    <div
                                        className="diff-bar-fill"
                                        style={{ width: getDifficultyWidth(review.parkingDifficulty) }}
                                    ></div>
                                </div>
                                <span className="diff-text">{review.parkingDifficulty}</span>
                            </div>
                        )}

                        <div className="card-body">
                            <div className="user-profile">
                                <span className="username">사용자 {review.userId || review.author}</span>
                            </div>
                            <p className="content-preview">
                                {review.content}
                            </p>
                        </div>

                        <div className="card-footer">
                            <div className="tags-wrapper">
                                {review.tags && review.tags.map(tag => (
                                    <span key={tag.id} className="review-tag">#{tag.name}</span>
                                ))}
                            </div>
                            <div className="interaction-info">
                                <span>댓글 {review.commentCount || 0}</span>

                                <span className="heart-icon">
                                    ♥ {likeCounts[review.id] !== undefined ? likeCounts[review.id] : 0}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {reviews.length === 0 && (
                    <div className="no-reviews">
                        <p>해당 카테고리의 글이 없습니다.</p>
                    </div>
                )}
            </div>

            <button className="floating-write-btn" onClick={() => navigate('/community/write')}>
                + 글쓰기
            </button>
            <Footer />
        </div>
    );
};

export default Community;