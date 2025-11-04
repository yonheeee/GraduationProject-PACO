import React, { memo } from "react";
import "../../css/community/ReviewParking.css";

function Progress({ label, value, total }) {
  const pct = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="rp-progress-row">
      <span className="rp-progress-label">{label}</span>
      <div className="rp-progress">
        <div className="rp-progress-bar" style={{ width: `${pct}%` }} />
      </div>
      <span className="rp-progress-count">{value?.toLocaleString?.() ?? 0}명</span>
    </div>
  );
}

function ReviewItem({ author, text, tags = [], likes = 0, comments = 0 }) {
  return (
    <div className="rp-review">
      <div className="rp-review-title">{author}</div>
      <div className="rp-review-text">{text}</div>

      <div className="rp-review-meta">
        <div className="rp-tags">
          {tags.map((t, i) => (
            <span key={i} className="rp-tag">#{t}</span>
          ))}
        </div>
        <div className="rp-counters">
          <span>댓글 {comments}</span>
          <span>❤ {likes}</span>
        </div>
      </div>
    </div>
  );
}

function ReviewParkingCard() {
  const data = {
    name: "서울광장 주차장",
    difficulty: { hard: 737, easy: 211 },
    reviews: [
      {
        id: "a1",
        author: "만두뚱",
        text:
          "여기는 주차라인이 너무 붙어있어서 불편해요 ㅠ 그리고 관리자분들도 불친절하고 관리도 잘되어있어요...",
        tags: ["보조동선", "교차혼잡", "거치지점"],
        likes: 753,
        comments: 130,
      },
      {
        id: "a2",
        author: "만두뚱",
        text:
          "피크 시간대엔 더 혼잡해요. 초보 운전자라면 진입 전에 미리 확인을…",
        tags: ["피크시간", "혼잡"],
        likes: 312,
        comments: 52,
      },
    ],
  };

  const totalVotes =
    (data?.difficulty?.hard ?? 0) + (data?.difficulty?.easy ?? 0);

  return (
    <section className="rp-card">
      <header className="rp-card-header">[ {data.name} ]</header>

      <div className="rp-difficulty">
        <div className="rp-difficulty-title">주차난이도</div>
        <Progress label="어려워요" value={data.difficulty.hard} total={totalVotes} />
        <Progress label="쉬워요" value={data.difficulty.easy} total={totalVotes} />
      </div>

      <div className="rp-reviews">
        {data.reviews.map((r) => (
          <ReviewItem key={r.id} {...r} />
        ))}
      </div>

      <div className="rp-dots" aria-hidden>• • •</div>
    </section>
  );
}

export default memo(ReviewParkingCard);
