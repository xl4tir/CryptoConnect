import Navbar from "../components/Base/Navbar";
import Footer from "../components/Base/Footer";
import Coins from "../components/Market/Coins";
import React from 'react';

//https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en

const SendToPage = () => (

  <div className="min-h-screen">
    <div className="gradient-bg-main">
      <Navbar />
      <Coins />
    </div>
    <Footer />
  </div>
);

export default SendToPage;