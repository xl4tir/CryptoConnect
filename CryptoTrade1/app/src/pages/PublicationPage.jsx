import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import Publication from "../components/Publication/Publication";
import React from 'react';


const PublicationPage = () => (

  <div className="min-h-screen">
    <div className="gradient-bg-main">
      <Navbar />
      <Publication />
    </div>
    <Footer />
    
  </div>
)

export default PublicationPage;