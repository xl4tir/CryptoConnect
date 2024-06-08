import React, { useState, useEffect } from "react";
import ReactModal from 'react-modal';
import TransactionService from '../../services/TransactionService';

const AddTransaction = ({ coins, portfolio }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCoin, setCoin] = useState('');
    const [selectedButton, setSelectedButton] = useState('buy');
    const [purchasePriceInput, setPurchasePriceInput] = useState('');
    const [totalSum, setTotalSum] = useState(0);
    const [quantity, setQuantity] = useState('');
    


    const handleAddTransaction = async () => {
        const transactionData = {
            portfolio_id: portfolio._id,
            cryptocurrency: selectedCoin.name,
            amount: parseFloat(quantity),
            operation: selectedButton === 'buy',
            purchasePrice: parseFloat(purchasePriceInput),
            purchaseDate: new Date().toISOString(),
        };

        try {
            await TransactionService.createTransaction(transactionData);
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error('Помилка під час додавання транзакції:', error);
        }
    };

    useEffect(() => {
        if (selectedCoin) {
            setPurchasePriceInput(selectedCoin.current_price || '');
        }
    }, [selectedCoin]);

    const handleChangePricePerCoin = (e) => {
        setPurchasePriceInput(e.target.value);
        calculateTotalSum(e.target.value, quantity);
    };

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value);
        calculateTotalSum(purchasePriceInput, e.target.value);
    };

    const calculateTotalSum = (price, qty) => {
        const priceValue = parseFloat(price);
        const qtyValue = parseFloat(qty);
        if (!isNaN(priceValue) && !isNaN(qtyValue)) {
            setTotalSum(priceValue * qtyValue);
        } else {
            setTotalSum(0);
        }
    };

    const handleButtonClick = (buttonType) => {
        setSelectedButton(buttonType);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCoin(null);
        setQuantity('');
        setTotalSum(0);
    };

    const handleChange = e => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );


    

    return (
        <div>
            <button
                className="text-white text-xs py-2 px-4 mx-4 h-max rounded-md border border-[#2952e3] cursor-pointer hover:bg-[#2952e3]"
                type="submit"
                onClick={openModal}
            >
                + Add Transaction
            </button>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                ariaHideApp={false}
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
                <div className="fixed w-full inset-0 flex items-center justify-center">
                    <div className="absolute w-full inset-0 bg-gray-800 opacity-50"></div>
                    <div style={!selectedCoin ? { height: '550px' } : { height: '450px' }} className="z-10 w-max mx-auto p-8 opacity-1 blue-glassmorphism-modalWindow rounded-md shadow-md relative">
                        {!selectedCoin ? (
                            <div>
                                <div className="flex flex-row items-center w-full justify-between mb-2">
                                    <h2 className="text-xl font-semibold text-white">
                                        Select Coin
                                    </h2>
                                    <button className="bg-none rounded-md" onClick={closeModal}>
                                        <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    </button>
                                </div>
                                <div className="flex flex-row w-full mb-1">
                                    <form>
                                        <input
                                            className="text-white blue-glassmorphism text-xs placeholder:text-white shadow-none border-1 border-gray-500 font-light mb-4 mt-2 w-96 p-2 mb-4 rounded-md"
                                            onChange={handleChange}
                                            placeholder='Search'
                                        />
                                    </form>
                                </div>
                                {filteredCoins.slice(0, 8).map(coin => (
                                    <div onClick={() => setCoin(coin)} className="flex flex-row items-center py-3 px-3 w-full justify-between cursor-pointer rounded-md hover:bg-blue-800/10" key={coin.id}>
                                        <div className="flex flex-row items-center ">
                                            <img className="w-6" src={coin.image} alt="" />
                                            <p className="text-sm font-semibold mx-2 text-white">{coin.name}</p>
                                            <p className="text-sm font-semibold text-gray-400">{coin.symbol.toUpperCase()}</p>
                                        </div>
                                        <svg className="h-6 w-6 text-gray-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 6 15 12 9 18" /></svg>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div className="flex flex-row items-center w-full justify-between mb-2">
                                    <h2 className="text-xl font-semibold text-white">
                                        Add Transaction
                                    </h2>
                                    <button className="bg-none rounded-md" onClick={closeModal}>
                                        <svg class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    </button>

                                </div>
                                <div className="flex text-sm text-white font-medium flex-row h-10 items-center justify-between rounded-md p-1 bg-blue-400/10 my-3">
                                    <button
                                        className={`rounded-md w-full h-full ${selectedButton === 'buy' ? 'bg-blue-200/30 ' : ''}`}
                                        onClick={() => handleButtonClick('buy')}
                                    >
                                        Buy
                                    </button>
                                    <button
                                        className={` rounded-md w-full h-full  ${selectedButton === 'sell' ? 'bg-blue-200/30 ' : ''}`}
                                        onClick={() => handleButtonClick('sell')}
                                    >
                                        Sell
                                    </button>
                                </div>
                                <div className="flex flex-row items-center my-5 py-2 px-3 w-96  rounded-md bg-blue-400/10" >
                                    <img className="w-5" src={selectedCoin.image} alt="" />
                                    <p className="text-sm font-semibold mx-2 text-white">{selectedCoin.name}</p>
                                    <p className="text-sm font-semibold text-gray-400">{selectedCoin.symbol.toUpperCase()}</p>
                                </div>

                                <div className="flex text-white w-96 text-sm flex-row items-center">
                                    <div className="mr-3 w-full">
                                        <label htmlFor="">Quantiity</label>
                                        <input
                                            id="quantityInput"
                                            className="text-white blue-glassmorphism text-xs placeholder:text-white shadow-none border-1 border-gray-500 font-light mb-4 mt-2 w-full  p-2 mb-4 rounded-md"
                                            placeholder="0.00"
                                            value={quantity}
                                            onChange={handleChangeQuantity}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="">Price per coin, $</label>
                                        <input
                                            className="text-white blue-glassmorphism text-xs placeholder:text-white shadow-none border-1 border-gray-500 font-light mb-4 mt-2 w-full  p-2 mb-4 rounded-md"

                                            placeholder='0.00'
                                            value={purchasePriceInput}
                                            onChange={handleChangePricePerCoin}

                                        />
                                    </div>
                                </div>
                                <div className="mr-3 w-full  text-sm text-white">
                                    <label htmlFor="">Sum, $</label>
                                    <input

                                        className="text-white blue-glassmorphism text-xs placeholder:text-white shadow-none border-1 border-gray-500 font-light mb-4 mt-2 w-full  p-2 mb-4 rounded-md"
                                        value={totalSum}
                                        placeholder='0.00'
                                    />
                                </div>


                                <button
                                    className=" text-white w-full mt-5 py-2 px-4 h-max rounded-md border border-[#A90E8F] cursor-pointer hover:bg-[#A90E8F] "
                                    type="submit"
                                    onClick={() => {
                                        handleAddTransaction()
                                    }}
                                >
                                    Add Transaction
                                </button>


                            </div>

                        )}
                    </div>
                </div>



            </ReactModal >

        </div >
    );
};

export default AddTransaction;