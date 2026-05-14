import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from './jsx/login/First.jsx';
import Signup from './jsx/login/Signup.jsx';
import Signin from './jsx/login/Signin.jsx';
import FindId from './jsx/login/FindId.jsx';
import FindPassword from './jsx/login/FindPw.jsx';
import OAuthRedirect from "./jsx/login/Redirect";

import Main from './jsx/main/Main.jsx'
import MyPage from './jsx/mypage/Mypage.jsx';
import ProfileEdit from './jsx/mypage/ProfileEdit';

import Community from './jsx/community/Community';
import CommunityWrite from './jsx/community/CommunityWrite';
import CommunityDetail from './jsx/community/CommunityDetail';
import CommunityUpdate from "./jsx/community/CommunityUpdate";


const AppRouter = () => {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/first" element={<First />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/oauth/redirect" element={<OAuthRedirect />} />
        
        <Route path="/main" element={<Main />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/community/:id" element={<CommunityDetail />} />
        <Route path="/community/edit/:id" element={<CommunityUpdate />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
