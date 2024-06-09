import axios from 'axios'
import React, { useState, useEffect } from "react";
import Coin from './Coin';
import Loader from '../Loader';


function Coins() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("dfd")
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&sparkline=false&price_change_percentage=1h%2C24h&locale=en&precision=2'
      )
      .then(res => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (


    <div className='coin-app'>
      <h1 className="mt-20 text-3xl sm:text-5xl text-white text-gradient py-1">
        Today's Cryptocurrency Prices by  <br /> Market Cap
      </h1>
      <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
        The global crypto market cap is $1.17T, a 4.26% decrease over the last day.
      </p>
      <div className='coin-search'>
        <h1 className='mt-7 mb-2 text-center text-xl'>Search a currency</h1>
        <form>
          <input
            className='h-12 bg-white/5 rounded-md placeholder-gray-300 text-white border-white/20 focus:border-none focus:outline-none focus:ring-1 focus:ring-pink-500/50'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>

      <div className='coin-container'>
        <div className='coin-row'>
          <div className='coin'>

            <h1 className='ml-10'>Name</h1>
            <p>Symbol</p>
          </div>
          <div className='coin-data'>
            <p className='coin-price'>Price</p>
            <p className='mr-20 coin-volume'>Volume</p>
            <p className='coin-percent'>24 %</p>
            <p className='coin-marketcap'>
              Market Cap
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        
          <Loader />
   
      ) : (
        filteredCoins.map(coin => (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        ))
      )}
    </div>

  );
}

export default Coins;
