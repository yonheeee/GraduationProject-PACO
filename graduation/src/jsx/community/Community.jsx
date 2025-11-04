import React, { useState } from 'react';
import CommunityFilters from "./CommunityFilters";
import ReviewParking from './ReviewParking';
import '../../css/community/Community.css';

const Community = () => {
    const [ filters, setFilters] = useState({
        query: "",
        regions: [],
        catagory:"전체",
    });

    return(
        <div className='community-container'>
            <CommunityFilters onChange={setFilters} />
            <ReviewParking />
        </div>
    )
};
export default Community;