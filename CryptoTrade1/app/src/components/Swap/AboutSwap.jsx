import React from "react";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { shortenAddress } from "../../utils/shortenAddress";


const AboutSwap = ({account}) => {
  

  

  return (
    <div className="flex max-w-4xl justify-between items-center m-auto">
      <div className="flex md:flex-row flex-col items-center justify-between p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Exchange Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          Exchange cryptocurrency and fiat worldwide. Also easily exchange, buy, sell
          </p>
        </div>


        <div className=" flex flex-row flex-2 items-center justify-start  mf:mt-0 mt-0">  
        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                {shortenAddress(account)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  CryptoConnect
                </p>
              </div>
            </div>
          </div>
          
           
       
        
           
   
        </div>
        
      </div>
    </div>
  );
};

export default AboutSwap;