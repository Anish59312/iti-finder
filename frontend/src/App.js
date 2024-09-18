import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import InterestSelection from './pages/InterestSelection';
import TradeTable from './pages/TradeTable';
import ItiTable from './pages/ItiTable';
import ItiDetails from './pages/ItiDetails';
import ITIDetails from './pages/Test';

import './App.css';

function App() {
  console.log("Started");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/interest" element={<InterestSelection />} />
        <Route path="/trade" element={<TradeTable />} />
        <Route path="/iti" element={<ItiTable />} />
        <Route path="/iti/1" element={<ITIDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
