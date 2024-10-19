import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InterestSelection from './pages/InterestSelection';
import TradeTable from './pages/TradeTable';
import ItiTable from './pages/ItiTable';
import ITIDetails from './pages/ItiDetails';
// import ITIDetails from './pages/Test';
import FormPage from './pages/userInfo.jsx';
import ProtectedRoute from './component/protectedRoute.jsx';

import './App.css';

function App() {
  console.log("Started");
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/InfoForm" element={<FormPage />} />
        <Route path="/interest" element={<InterestSelection />} />
        <Route path="/trade" element={<TradeTable />} />
        <Route path="/iti" element={<ItiTable />} />
        <Route path="/iti/:id" element={<ITIDetails />} />



        {/* Protected Routes */}
        {/* <Route path="/interest" element={<ProtectedRoute element={<InterestSelection />} />} />
        <Route path="/trade" element={<ProtectedRoute element={<TradeTable />} />} />
        <Route path="/iti" element={<ProtectedRoute element={<ItiTable />} />} />
        <Route path="/iti/1" element={<ProtectedRoute element={<ITIDetails />} />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
