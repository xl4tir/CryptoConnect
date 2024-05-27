import {BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import SendToPage from "./pages/SendToPage";
import Market from "./pages/Market";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PublicationPage from './pages/PublicationPage';
import PortfolioTrackerPage from './pages/PortfolioTrackerPage';
import React from 'react';
import SwapPage from "./pages/SwapPage";
import TestAuth from "./pages/TestAuth"


const App = () => (

    <Router>
      <Routes>

          <Route path="/testauth" element={<TestAuth />} exact />
        
          <Route path="/sendTo" element={<SendToPage />} exact />
          <Route path="/swap" element={<SwapPage />} exact />
          <Route path="/" element={<SendToPage />} exact />
          <Route path="/market" element={<Market />} exact />
          <Route path="/signup" element={<SignUp />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/portfolio-tracker" element={<PortfolioTrackerPage />} exact />
          <Route path="/publications/:id" element={<PublicationPage />} exact/>
        
      </Routes>
    </Router>

  
);

export default App;