import React, { useState, useMemo } from "react"; 
import '../../css/community/CommunityFilters.css';

const CommunityFilters = ({ onChange }) => { 
    const REGION_LIST = useMemo(
        () => [
            "전체", "서울", "경기", "대구", "제주도"
        ],
        []
    );

    const CATEGORY_LIST = useMemo(
    () => ["전체", "자유", "질문", "꿀팁", "후기"],
    []
    );
      const emit = (next = {}) => {
    const payload = {
      query,
      regions,
      category,
      ...next,
    };
    onChange?.(payload);
  };

  const [query, setQuery] = useState("");
  const [regions, setRegions] = useState([]);         // 다중 선택
  const [category, setCategory] = useState("전체");

  const toggleRegion = (name) => {
    setRegions((prev) => {
      const has = prev.includes(name);
      const next = has ? prev.filter((r) => r !== name) : [...prev, name];
      emit({ regions: next });
      return next;
    });
  };

  const changeCategory = (name) => {
    setCategory(name);
    emit({ category: name });
  };

  const onInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    emit({ query: val });
  };

  return (
    <div className="comm-filters">
      <div className="comm-search">
        <input
          className="comm-search-input"
          type="text"
          value={query}
          onChange={onInput}
          placeholder="주차장명 또는 지역명 입력"
          aria-label="검색어 입력"
        />
      </div>

      <div className="comm-regions" role="group" aria-label="지역 선택">
        {REGION_LIST.map((name) => {
          const active = regions.includes(name);
          return (
            <button
              key={name}
              type="button"
              className={`regions-chip ${active ? "active" : ""}`}
              onClick={() => toggleRegion(name)}
              aria-pressed={active}
            >
              {name}
            </button>
          );
        })}
      </div>


      <nav className="comm-tabs" role="tablist" aria-label="게시글 카테고리">
        {CATEGORY_LIST.map((name) => {
          const active = category === name;
          return (
            <button
              key={name}
              role="tab"
              aria-selected={active}
              className={`tab ${active ? "active" : ""}`}
              onClick={() => changeCategory(name)}
            >
              {name}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default CommunityFilters;