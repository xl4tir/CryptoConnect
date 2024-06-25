import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import Profile from "../components/Profile/Profile";
import React from 'react';
import { useParams } from 'react-router-dom';
import CommunitySidebarNav from '../components/Base/CommunitySidebarNav';
import CommunityRightSidebar from '../components/Base/CommunityRightSidebar';

const ProfilePage = () => {
  const { user_id } = useParams();

  return (
    <div className="min-h-screen flex flex-col gradient-bg-main">
      <Navbar />
      <div className="flex flex-grow justify-center p-4">
        <div className="flex flex-grow max-w-screen-xl">
          <CommunitySidebarNav />
          <div className="flex-grow mx-8">
            <Profile key={user_id} user_id={user_id} />
          </div>
          <CommunityRightSidebar user_id={user_id} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
