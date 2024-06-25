import React, { useState, useEffect, useContext } from "react";
import Web3 from 'web3';
import Web3Modal from "web3modal";
import qs from 'qs';
import Erc20 from './erc20.json';
import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";
import { IoArrowDown } from "react-icons/io5";
import Modal from 'react-modal';
import { TransactionContext } from '../../context/TransactionContext';
import logo from "../../images/Logo.svg";
import { toast, Toaster } from 'react-hot-toast';
import Loader from "../Loader";

Modal.setAppElement('#root');

function Defiswap() {
  const [visible, setVisible] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [fname, setFname] = useState('Swap From');
  const [flogo, setFlogo] = useState(logo);
  const [faddr, setFaddr] = useState('');
  const [fdec, setFdec] = useState(18);
  const [tname, setTname] = useState('Swap To');
  const [tlogo, setTlogo] = useState(logo);
  const [taddr, setTaddr] = useState('');
  const [tdec, setTdec] = useState(18);
  const [holdup, setHoldup] = useState('');
  const [alert, setAlert] = useState(false);
  const [balanceFrom, setBalanceFrom] = useState('0.00');
  const [balanceTo, setBalanceTo] = useState('0.00');
  const [defiSource, setDefiSource] = useState('');
  const [gasEstimate, setGasEstimate] = useState('');
  const [currentSelectSide, setCurrentSelectSide] = useState(null);
  const [toAmount, setToAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { connectWallet, currentAccount } = useContext(TransactionContext);

  const config = {
    apiKey: "FJO6G4wXQLokpImdCq12fO2nv0Pru1F7",
    network: Network.MATIC_MAINNET,
  };

  const alchemy = new Alchemy(config);
  const zeroxapi = 'https://polygon.api.0x.org';

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getPrice();
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [holdup]);

  useEffect(() => {
    if (taddr && faddr) {
      getPrice();
    }
  }, [taddr, faddr]);


  const sendAlert = () => setAlert(true);

  const fromHandler = () => {
    if (currentAccount) {
      setVisible(true);
      setCurrentSelectSide('from');
      listTokens();
    } else {
      sendAlert();
    }
  };

  const toHandler = () => {
    setVisible(true);
    setCurrentSelectSide('to');
    listTokens();
  };

  const closeHandler = () => {
    setVisible(false);
    setAlert(false);
  };

  async function listTokens() {
    const response = await fetch('http://localhost:8061/api/tokens');
    const tokenListJSON = await response.json();
    setTokens(tokenListJSON.tokens);
  }

  function selectToken(token) {
    setSelectedToken(token);
    closeHandler();
    if (currentSelectSide === 'from') {
      setFname(token.name);
      setFlogo(token.logoURI);
      setFaddr(token.address);
      setFdec(token.decimals);
      displayBalanceFrom(token.address);
      setToAmount('');

    } else {
      setTname(token.name);
      setTlogo(token.logoURI);
      setTaddr(token.address);
      setTdec(token.decimals);
      setToAmount('');


    }

  }

  async function displayBalanceFrom(tokenAddress) {
    const tokenContractAddresses = [tokenAddress];
    const data = await alchemy.core.getTokenBalances(currentAccount, tokenContractAddresses);
    const balanceItem = data.tokenBalances.find(item => item.tokenBalance !== '0x0000000000000000000000000000000000000000000000000000000000000000');
    if (balanceItem) {
      const rawbalance = parseInt(balanceItem.tokenBalance, 16).toString();
      const formatbalance = Number(Web3.utils.fromWei(rawbalance));
      setBalanceFrom(formatbalance.toFixed(2));
    } else {
      setBalanceFrom('0.00');
    }
  }


  async function getPrice() {

    if (!faddr || !taddr || !holdup) return;
    setIsLoading(true)
    console.log(faddr)
    console.log(taddr)
    console.log(holdup)

    const amount = Number(holdup * 10 ** fdec);
    const params = { sellToken: faddr, buyToken: taddr, sellAmount: amount };
    const headers = { '0x-api-key': '514b07af-8435-4bee-9f17-f9b7367d6723' };

    const response = await fetch(`${zeroxapi}/swap/v1/price?${qs.stringify(params)}`, { method: 'GET', headers });
    const swapPriceJSON = await response.json();

    const sources = await fetch(`${zeroxapi}/swap/v1/quote?${qs.stringify(params)}`, { method: 'GET', headers });
    const swapOrders = await sources.json();

    try {
      setDefiSource(swapOrders.orders.map(order => order.source).join(', '));
    } catch (error) {
      setDefiSource("Pool Not Available");
    }

    const rawvalue = swapOrders.buyAmount / (10 ** tdec);
    setToAmount(rawvalue.toFixed(5));
    setGasEstimate(swapPriceJSON.estimatedGas);
    setIsLoading(false)
  }

  async function swapit() {
    setIsLoading(true);
    try {
      if (!faddr || !taddr || !holdup) throw new Error("Missing required fields");
  
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const web3 = new Web3(connection);
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const userWallet = await signer.getAddress();
      const amount = Number(holdup * 10 ** fdec);
      const params = { sellToken: faddr, buyToken: taddr, sellAmount: amount };
      const headers = { '0x-api-key': '514b07af-8435-4bee-9f17-f9b7367d6723' };
  
      const getquote = await fetch(`${zeroxapi}/swap/v1/quote?${qs.stringify(params)}`, { method: 'GET', headers });
      if (!getquote.ok) throw new Error("Failed to fetch quote");
      const quote = await getquote.json();
  
      const proxy = quote.allowanceTarget;
      const amountstr = amount.toString();
      const ERC20Contract = new ethers.Contract(faddr, Erc20, signer);
      const approval = await ERC20Contract.approve(proxy, amountstr);
      await approval.wait();
      toast.success('Approve successful!', { className: "blue-glassmorphism-toast" });
  
      const txParams = { ...quote, from: userWallet, to: quote.to, value: quote.value.toString(16), gasPrice: null, gas: quote.gas };
      const txHash = await ethereum.request({ method: 'eth_sendTransaction', params: [txParams] });
  
      // Очікування завершення транзакції
      const receipt = await provider.waitForTransaction(txHash);
      if (receipt.status === 1) {
        toast.success('Swap successful!', { className: "blue-glassmorphism-toast" });
      } else {
        throw new Error('Transaction failed');
      }
    } catch (error) {
      console.error("Error during swap:", error);
      toast.error(`Swap failed!`, { className: "blue-glassmorphism-toast" });
    } finally {
      setIsLoading(false);
    }
  }
  

  const isButtonDisabled = !faddr || !taddr || !holdup || !toAmount;

  return (
    <div>
      <Toaster></Toaster>
      <div className="flex justify-center pb-20">
        <div className=' max-w-md p-4 px-6 rounded-xl blue-glassmorphism'>
          <div className='flex items-center justify-between py-4 px-1 text-white  font-semibold text-xl'>
            <p>Polygon Swap</p>
          </div>
          {alert && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg">
                <p>Please Connect Wallet</p>
                <div className="flex justify-end mt-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={connectWallet}>Connect Wallet</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={closeHandler}>Close</button>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-row items-center">
            <label htmlFor="price" className="block text-sm ml-2 leading-6 text-gray-300">
              Balance:
            </label>
            <span className="block text-sm ml-2 leading-6 text-gray-300">{balanceFrom} {fname}</span>
          </div>
          <div className='relative white-glassmorphism p-4 py-6 rounded-xl mb-2 border-[1px] hover:border-zinc-600'>
            <div>
              <div className="relative my-2 rounded-md shadow-sm">
                <input
                  type="number"
                  id="from_amount"
                  onChange={(e) => setHoldup(e.target.value)}
                  className="block font-semibold w-full rounded-md h-8 py-1.5 pl-3 pr-20 text-3xl text-white custom-input no-arrows"
                  placeholder="0.0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="currency" className="sr-only">Currency</label>
                  <div onClick={fromHandler}
                    id="currency"
                    name="currency"
                    className="rounded-md flex flex-row items-center gap-2 bg-gray-800/70 text-white p-3"
                  >
                    <img src={flogo} className="w-6" alt="" />
                    <span className="">{fname}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={visible}
            onRequestClose={closeHandler}
            ariaHideApp={false}
            contentLabel="Modal"
            style={{
              content: {
                inset: '40px',
                border: '0px solid rgb(204, 204, 204)',
                overflow: 'auto',
                outline: 'none',
                margin: '0 auto',
                background: 'rgba(255, 255, 255, 0)',
                padding: '0',
                boxShadow: '0px 4px 30px rgba(0, 0, 0, 0)',
              },
              overlay: {
                background: 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <div className="fixed flex-col w-full inset-0 flex items-center justify-center">
              <div className="absolute w-full inset-0 bg-gray-800 opacity-50"></div>
              <div style={{ height: '550px' }} className="z-10 w-max mx-auto p-8 opacity-1 blue-glassmorphism-modalWindow rounded-md shadow-md relative">
                <div className="flex flex-row items-center w-full justify-between mb-2">
                  <h2 className="text-xl font-semibold text-white">
                    Select Coin
                  </h2>
                  <button className="bg-none rounded-md" onClick={closeHandler}>
                    <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
                <input className="text-white blue-glassmorphism text-xs placeholder:text-white shadow-none border-1 border-gray-200/20 focus:ring-0 outline-none focus:border-white/50 font-light mb-4 mt-2 w-96 p-2 mb-4 rounded-md" placeholder="Paste Token Address" />
                <div style={{ height: '390px' }} className="overflow-auto scrollbar-custom" id="token_list">
                  {tokens.map((token) => (
                    <div key={token.address} className="flex flex-row items-center py-3 px-3 w-full justify-between cursor-pointer rounded-md hover:bg-blue-300/10" onClick={() => selectToken(token)}>
                      <div className="flex flex-row items-center ">
                        <img className="token_list_img w-6" src={token.logoURI} alt={token.symbol} />
                        <span className="text-sm font-semibold mx-2 text-white">{token.name}</span>
                        <span className="text-sm font-semibold text-gray-400">{token.symbol}</span>
                      </div>
                      <svg className="h-6 w-6 text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 6 15 12 9 18" /></svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
          <div className="flex justify-center mb-2">
            <button
              className="flex-row hover:text-white hover:bg-opacity-10 items-center text-white/70 shadow-sm shadow-gray-300 rounded-lg bg-white p-2 bg-opacity-5"
            >
              <IoArrowDown size={30}></IoArrowDown>
            </button>
          </div>
          <div className='relative white-glassmorphism p-4 py-6 rounded-xl border-[1px] hover:border-zinc-600'>
            <div>
              <div className="relative my-2 rounded-md shadow-sm">
                <input
                  type="text"
                  id="to_amount"
                  value={toAmount}
                  readOnly
                  className="block font-semibold w-full rounded-md h-8 py-1.5 pl-3 pr-20 text-3xl text-white custom-input no-arrows"
                  placeholder="0.0"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <label htmlFor="currency" className="sr-only">Currency</label>
                  <div onClick={toHandler}
                    id="currency"
                    name="currency"
                    className="rounded-md flex flex-row items-center gap-2 bg-gray-800/70 text-white p-3"
                  >
                    <img src={tlogo} className="w-6" alt="" />
                    <span className="">{tname}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            currentAccount ? (
              <button
                type="button"
                onClick={swapit}
                disabled={isButtonDisabled}
                className={`text-white w-full mb-4 mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-xl cursor-pointer ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Swap
              </button>
            ) : (
              <button
                type="button"
                onClick={connectWallet}
                className="text-white w-full mb-4 mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-xl cursor-pointer"
              >
                Connect Wallet
              </button>
            ))}

        </div>
      </div>
      <style jsx>{`
        .custom-input {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .custom-select {
          padding: 15px 35px 15px 15px;
          border: none !important;
          box-shadow: none !important;
        }
        .no-arrows::-webkit-outer-spin-button,
        .no-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-arrows {
          -moz-appearance: textfield;
        }
      `}</style>
    </div >
  );
}

export default Defiswap;

