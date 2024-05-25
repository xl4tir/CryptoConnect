import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import Uniswap from "../components/Swap/Uniswap";
import React from 'react';



const SwapPage = () => (

  <div className="min-h-screen">
    <div className="gradient-bg-main">
      <Navbar />
        
            <Uniswap />
        
        </div>

    <Footer />
  </div>
);

export default SwapPage;