import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Graph from './Graph';
import CoinDetailInfo from './CoinDetailInfo';
import CommunityBar from './CommunityBar';
import Loader from '../Loader';

const CoinInfo = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        console.log(`Fetching data for coin id: ${id}`);
        if (!id) {
          throw new Error('Coin ID is not provided');
        }

        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        console.log('API response:', response);

        const data = response.data;
        const coinData = {
          id: data.id,
          name: data.name,
          symbol: data.symbol.toUpperCase(),
          image: data.image.large,
          genesisDate: data.genesis_date,
          description: data.description.en,

          // Market Data
          price: data.market_data.current_price.usd,
          marketcap: data.market_data.market_cap.usd,
          volume: data.market_data.total_volume.usd,

          high24h: data.market_data.high_24h.usd,
          low24h: data.market_data.low_24h.usd,
          priceChange24h: data.market_data.price_change_24h,
          priceChangePercentage24h: data.market_data.price_change_percentage_24h,
          marketCapChange24h: data.market_data.market_cap_change_24h,
          marketCapChangePercentage24h: data.market_data.market_cap_change_percentage_24h,
        };

        setCoin(coinData);
        console.log('Fetched coin data:', coinData);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching coin data:', error);
      } finally {

      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return (
      <div className=' flex flex-col items-center justify-center mt-32'>
        <Loader /> <p className='text-xl w-96 text-center pt-5'>
        Sorry mate, but there's a problem, try reloading the page</p>
      </div>)
  }



  return (
    <div className='max-w-screen-2xl w-full m-auto mt-10 flex flex-row justify-between'>
      <div className='basis-72 shrink-0'>
        <CoinDetailInfo coin={coin} />
      </div>
      <div className='flex-grow mx-4'>
        <Graph coinSymbol={`${coin.symbol}USDT`} style={{ width: '100%' }} />
      </div>
      <div className='basis-72 shrink-0'>
        <CommunityBar coin={coin} />
      </div>
    </div>
  );
};

export default CoinInfo;
