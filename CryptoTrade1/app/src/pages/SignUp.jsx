import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import Signup from "../components/Signup";
import React from 'react';


const SendToPage = () => (

  <div className="min-h-screen">
    <div className="gradient-bg-main">
      <Navbar />
      <Signup />
    </div>
    <Footer />
  </div>
);

export default SendToPage;