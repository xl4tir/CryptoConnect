import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import CoinInfo from "../components/CoinInfo/CoinInfo"

import React from 'react';


const SendToPage = () => (

  <div className="min-h-screen scrollbar-custom ">
    <div className="min-h-screen gradient-bg-main text-white " >
      <Navbar />
      <CoinInfo />
    </div>
    <Footer />
  </div>
);

export default SendToPage;