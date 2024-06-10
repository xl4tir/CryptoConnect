import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SendToPage from "./pages/SendToPage";
import Market from "./pages/Market";


import ProfilePage from "./pages/ProfilePage";
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

            <Route
                path="/profile/:user_id"
                element={<ProfilePage />}
                xact />
            <Route
                path="/portfolio-tracker/:user_id"
                element={<PortfolioTrackerPage />}
                exact
            />
            <Route
                path="/publications/:id"
                element={<PublicationPage />}
                exact
            />

        </Routes>
    </Router>


);

export default App;