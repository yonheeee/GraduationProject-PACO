import React, { useState, useMemo } from "react";
import '../../css/community/Community.css';

const Community = () => {

    const REGION_LIST = useMemo(
        () => ["광역시", "서울", "경기도", "강원도", "충청도", "전라도", "경상도", "제주"],
        []
    );
    const CATEGORY_LIST = useMemo(
        () => ["전체", "자유", "질문", "꿀팁", "후기"],
        []
    );


    const [query, setQuery] = useState("");
    const [regions, setRegions] = useState([]);       
    const [category, setCategory] = useState("전체");

    
    return (
        <div className="community-container">

        </div>
    );
};
export default Community;