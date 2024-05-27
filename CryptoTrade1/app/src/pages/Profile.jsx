import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import Profile from "../components/Profile/Profile";
import React from 'react';


const SendToPage = () => (

  <div className="min-h-screen">
    <div className="gradient-bg-main">
      <Navbar />
      <Profile />
    </div>
    <Footer />
  </div>
);

export default SendToPage;