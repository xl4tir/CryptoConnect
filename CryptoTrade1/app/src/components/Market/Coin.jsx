import React from 'react';
import { useNavigate } from 'react-router-dom';
import greenTriangle from '../../images/green.svg';
import redTriangle from '../../images/red.svg';

const Coin = ({
  id,
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/coin-info/${id}`);
  };

  return (
    <div className='coin-container cursor-pointer hover:bg-white/5 px-3 rounded-md' onClick={handleClick}>
      <div className='coin-row '>
        <div className='coin'>
          <img src={image} alt='crypto' />
          <h1>{name}</h1>
          <p className='coin-symbol'>{symbol}</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>${price}</p>
          <p className='coin-volume'>${volume.toLocaleString()}</p>

          {priceChange < 0 ? (
            <div className='divPriceChange'>
              <img src={redTriangle} alt="redTriangle" className='triangle'/>
              <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
            </div>
          ) : (
            <div className='divPriceChange'>
              <img src={greenTriangle} alt="greenTriangle" className='triangle'/>
              <p className='coin-percent green'>{priceChange.toFixed(2)}%</p>
              </div>
          )}

          <p className='coin-marketcap'>
            ${marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
