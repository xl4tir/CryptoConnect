import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import Profile from "../components/Profile/Profile";
import React from 'react';


const ProfilePage = () => (

  <div className="min-h-screen flex flex-col">
    <div className="gradient-bg-main flex-grow">
      <Navbar />
      <Profile />
    </div>
    <Footer />
  </div>
);

export default ProfilePage;