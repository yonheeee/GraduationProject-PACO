import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import First from './jsx/login/First.jsx';

const AppRouter = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />
        

        <Route path="/login" element={<First />} />
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
