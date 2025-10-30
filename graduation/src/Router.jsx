import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from './jsx/login/First.jsx';
import Signup from './jsx/login/Signup.jsx';
import Signin from './jsx/login/Signin.jsx';
import Main from './jsx/main/Main.jsx'

const AppRouter = () => {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
