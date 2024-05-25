import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import PortfolioTracker from "../components/Portfolio/PortfolioTracker";
import React, {useState} from 'react';
import { fetchUserProfile, useFetchProfileEffect } from '../services/authUser';




const PortfolioTrackerPage = () => {

    const [userProfile, setUserProfile] = useState(null);
    useFetchProfileEffect(setUserProfile);
  
    return (
        <div className="min-h-screen">
            <div className="gradient-bg-main">
                <Navbar />
                <PortfolioTracker userProfile = {userProfile}/>
            </div>
            <Footer />
        </div>
    )
}

export default PortfolioTrackerPage