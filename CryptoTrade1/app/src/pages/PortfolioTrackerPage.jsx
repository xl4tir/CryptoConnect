import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import PortfolioTracker from "../components/Portfolio/PortfolioTracker";
import React from 'react';
import { useParams } from 'react-router-dom';

const PortfolioTrackerPage = (props) => {
    const { user_id } = useParams();

    return (
        <div className="min-h-screen">
            <div className="gradient-bg-main">
                <Navbar />
                <PortfolioTracker user_id={user_id} />
            </div>
            <Footer />
        </div>
    );
};

export default PortfolioTrackerPage;
