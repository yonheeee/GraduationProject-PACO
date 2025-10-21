import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from './jsx/login/First.jsx';
import Signup from './jsx/login/Signup.jsx';

const AppRouter = () => {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<First />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
