import React from 'react';
import greenTriangle from "../../images/green.svg";
import redTriangle from "../../images/red.svg";

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  return (
    <div className='coin-container'>
      <div className='coin-row'>
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