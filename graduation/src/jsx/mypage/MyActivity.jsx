import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../api/User/User.js';
import '../../css/mypage/Mypage.css';

const MyActivity = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('menu'); // 'menu', 'posts', 'comments', 'likes'
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (view === 'menu') return;

            setLoading(true);
            try {
                let data = [];

                if (view === 'posts') {
                    const response = await UserApi.getMyReviews();
                    data = Array.isArray(response) ? response : (response.content || []);
                }
                else if (view === 'comments') {
                    const response = await UserApi.getMyComments();
                    data = Array.isArray(response) ? response : (response.content || []);
                }
                else if (view === 'likes') {
                    const ids = await UserApi.getLikedReviewIds(); // ID 목록 [1, 5, 10]

                    if (ids && ids.length > 0) {
                        const requests = ids.map(id =>
                            UserApi.getReviewDetail(id).catch(e => null)
                        );
                        const results = await Promise.all(requests);
                        data = results.filter(item => item !== null);
                    }
                }
                setListData(data);
            } catch (err) {
                console.error("데이터 로딩 실패:", err);
                setListData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [view]);

    const handleItemClick = (item) => {
        if (view === 'comments') {
            if (item.reviewId) {
                navigate(`/community/${item.reviewId}`);
            } else {
                alert("삭제된 게시글이거나 이동할 수 없습니다.");
            }
        } else {
            navigate(`/community/${item.id}`);
        }
    };

    if (view === 'menu') {
        return (
            <div className="activity-container">
                <div className="menu-wrapper">
                    <h2 className="page-title">내 활동</h2>
                    <ul className="menu-list">
                        <li className="menu-item" onClick={() => setView('posts')}>
                            <span className="menu-text">📝 내가 쓴 글</span>
                            <span className="arrow-icon">›</span>
                        </li>
                        <li className="menu-item" onClick={() => setView('comments')}>
                            <span className="menu-text">💬 내가 쓴 댓글</span>
                            <span className="arrow-icon">›</span>
                        </li>
                        <li className="menu-item" onClick={() => setView('likes')}>
                            <span className="menu-text">❤️ 좋아요 누른 글</span>
                            <span className="arrow-icon">›</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="activity-container">
            <div className="list-wrapper">
                <div className="list-header">
                    <button className="back-btn" onClick={() => setView('menu')}>
                        ← 뒤로
                    </button>
                    <h3 className="list-title">
                        {view === 'posts' && '내가 쓴 글'}
                        {view === 'comments' && '내가 쓴 댓글'}
                        {view === 'likes' && '좋아요 누른 글'}
                    </h3>
                    <div style={{ width: '40px' }}></div>
                </div>

                {loading ? (
                    <div className="status-msg">로딩 중...</div>
                ) : listData.length === 0 ? (
                    <div className="status-msg">내역이 없습니다.</div>
                ) : (
                    <ul className="data-list">
                        {listData.map((item, index) => (
                            <li key={index} className="data-item" onClick={() => handleItemClick(item)}>
                                <div className="item-content-wrapper">

                                    <div className="item-title">
                                        {view === 'comments' ? (
                                            <>
                                                <span className="comment-badge">댓글</span>
                                                {item.content}
                                            </>
                                        ) : (
                                            item.title
                                        )}
                                    </div>

                                    <div className="item-meta">
                                        <span className="date">
                                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                                        </span>
                                        {view === 'comments' && (
                                            <span className="post-link-text"> 게시글 보러가기 ›</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MyActivity;