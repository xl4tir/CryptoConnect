import React, { useEffect, useState, useContext } from "react";
import ReactModal from 'react-modal';
import { IoMdMore } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { AuthContext } from '../../context/authContext';
import AddTransaction from './AddTransaction';
import PortfolioService from '../../services/portfolioService';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { MdCurrencyBitcoin } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import Loader from '../Loader';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const PortfolioMainInfo = ({ portfolio, portfolioAssets, coins, updatePortfolio  }) => {
    const { user } = useContext(AuthContext); // Get user information from context
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [newName, setNewName] = useState(portfolio.name);
    const [isLoading, setIsLoading] = useState(false);

    let totalHoldingsUSD = 0;
    let totalProfit24h = 0;
    let totalPercentageChange24h = 0;

   
    if (portfolioAssets && portfolioAssets.length > 0) {
        portfolioAssets.forEach((asset) => {
            if (asset.hasOwnProperty('holdingsUSD') && asset.hasOwnProperty('price') && asset.hasOwnProperty('priceChange_24h')) {
                const holdingsUSD = parseFloat(asset.holdingsUSD);
                const holdings = parseFloat(asset.holdings);
                const currentPrice = parseFloat(asset.price);
                const priceChange24h = parseFloat(asset.priceChange_24h) / 100;

                // Calculate profit/loss for each asset over the last 24 hours
                const profit24h = holdings * (currentPrice - currentPrice / (1 + priceChange24h));
                const percentageChange24h = ((holdings * currentPrice - holdings * currentPrice / (1 + priceChange24h)) / (holdings * currentPrice / (1 + priceChange24h))) * 100;

                totalProfit24h += profit24h;
                totalHoldingsUSD += holdingsUSD;
                totalPercentageChange24h += percentageChange24h;
            }
        });

        totalHoldingsUSD = totalHoldingsUSD.toFixed(2);
        totalProfit24h = totalProfit24h.toFixed(2);
        totalPercentageChange24h = totalPercentageChange24h.toFixed(2);
    }

    const handleEdit = () => {
        setEditModalOpen(true);
    };

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    const handleSave = async () => {
        try {
            await PortfolioService.updatePortfolio(portfolio._id, { name: newName });
            setEditModalOpen(false);
            updatePortfolio();

        } catch (error) {
            console.error('Error updating portfolio:', error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await PortfolioService.deletePortfolio(portfolio._id);
            setDeleteModalOpen(false);
            updatePortfolio();
   
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    const maxLength = 24;
    const isOverLimit = newName.length > maxLength;
   
    const charactersLeft = newName.length;


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-row w-full items-center justify-between">
            <div>
                <div className="flex flex-row items-center gap-1">
                    <MdCurrencyBitcoin size={25}></MdCurrencyBitcoin>
                    <h1 className="text-base text-gray-300 py-1">{portfolio.name}</h1>
                </div>
                <h1 className="text-3xl tracking-wider font-bold text-white py-1">${totalHoldingsUSD}</h1>
                {totalProfit24h > 0 ? (
                    <div className='flex items-center font-light'>
                        <h1 className="text-sm font-light tracking-wider text-green-400 py-1">+ ${totalProfit24h} </h1>
                        <svg className="fill-green-400 ml-2 mr-1" fill="#00ff55" xmlns="http://www.w3.org/2000/svg"
                            width="12px" height="12px"
                            viewBox="0 0 52.00 52.00" enable-background="new 0 0 52 52" xml:space="preserve" stroke="#00ff55" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g></svg>
                        <h1 className="text-sm font-light tracking-wider text-green-400 py-1">{totalPercentageChange24h}% (24h)</h1>
                    </div>
                ) : (
                    <div className='flex items-center font-light'>
                        <h1 className="text-sm font-light tracking-wider text-red-600 py-1">- ${totalProfit24h * (-1)} </h1>
                        <svg className="fill-red-600 ml-2 mr-1" fill="#00ff55" xmlns="http://www.w3.org/2000/svg"
                            width="12px" height="12px"
                            viewBox="0 0 52.00 52.00" transform="rotate(180)" enable-background="new 0 0 52 52" xml:space="preserve" stroke="#00ff55" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M43.7,38H8.3c-1,0-1.7-1.3-0.9-2.2l17.3-21.2c0.6-0.8,1.9-0.8,2.5,0l17.5,21.2C45.4,36.7,44.8,38,43.7,38z"></path> </g></svg>
                        <h1 className="text-sm font-light tracking-wider text-red-600 py-1">{totalPercentageChange24h * (-1)}% (24h)</h1>
                    </div>
                )}
            </div>
            {user && user._id === portfolio.user_id && (
                <div className="relative flex flex-row items-center">
                    <AddTransaction coins={coins} portfolio={portfolio} updatePortfolio={updatePortfolio}/>
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton className="border py-1 px-1 rounded-md border-1 border-gray-400/40 cursor-pointer hover:bg-gray-300/20 hover:border-gray-100/70">
                                <IoMdMore size={24}></IoMdMore>
                            </MenuButton>
                        </div>

                        <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="absolute right-0 z-10 mt-3 w-28 origin-top-right rounded-md shadow-lg ring-1 ring-gray-400 ring-opacity-30 focus:outline-none blue-glassmorphism border-none">
                                <div className="">
                                    <MenuItem>
                                        {({ active }) => (
                                            <button
                                                className={classNames(
                                                    active ? 'rounded-md bg-white/5 text-white' : 'text-white',
                                                    'block w-full px-4 py-2 text-left text-sm'
                                                )}
                                                onClick={handleEdit}
                                            >
                                                <div className="flex flex-row items-center gap-2 cursor-pointer">
                                                    <FiEdit size={15} />
                                                    <label htmlFor="Edit"> Edit</label>
                                                </div>
                                            </button>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {({ active }) => (
                                            <button
                                                className={classNames(
                                                    active ? 'rounded-md bg-white/5 text-white' : 'text-white',
                                                    'block w-full px-4 py-2 text-left text-sm'
                                                )}
                                                onClick={handleDelete}
                                            >
                                                <div className="flex flex-row items-center gap-2 cursor-pointer">
                                                    <AiOutlineDelete size={15} />
                                                    <label htmlFor="Delete">Delete</label>
                                                </div>
                                            </button>
                                        )}
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>
            )}

            {/* Edit Modal */}
            <ReactModal
                isOpen={isEditModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
                contentLabel="Edit Portfolio Modal"
                className="max-w-md flex items-center blue-glassmorphism-modalWindow bg-opacity-100 w-full p-8 mx-auto my-60 rounded-xl"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
                <div className="flex flex-col w-full">
                    <div className='flex flex-row items-start justify-between'>
                        <h2 className="text-white text-xl font-semibold mb-6">Edit Portfolio</h2>
                        <svg onClick={() => setEditModalOpen(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white"
                            className="size-7 cursor-pointer hover:opacity-70">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </div>

                    <label className="text-white text-sm font-medium" htmlFor="">Portfolio Name</label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className={`my-2 w-full rounded-md p-2 outline-none bg-blue-300/10 text-white border-transparent focus:ring-0  ${isOverLimit ? 'focus:border focus:border-red-500 bg-red-400/20' : 'focus:border-white/20'}`}
                    />
                    <div className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-white/80'}`}>
                        {charactersLeft}/24 characters
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isOverLimit}
                        className={`mt-4 p-2 rounded-md bg-blue-600 ${isOverLimit ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-500'} text-white`}
                    >
                        Save
                    </button>
                </div>
            </ReactModal>

            {/* Delete Modal */}
            <ReactModal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
                contentLabel="Delete Portfolio Modal"
                className="max-w-md flex items-center blue-glassmorphism-modalWindow bg-opacity-100 w-full p-8 mx-auto my-60 rounded-xl"
                overlayClassName="fixed inset-0 bg-black bg-opacity-75"
            >
                <div className="flex flex-col w-full">
                    <div className='flex flex-col items-center justify-between mt-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6" style={{ width: '50px', height: '50px', fill: 'red' }}>
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" fill="white" transform="scale(1.2) translate(-2, -2)" />
                        </svg>



                        <h2 className="text-white text-xl text-center font-semibold mt-3 mb-3">Remove {portfolio.name} portfolio?</h2>

                    </div>
                    <p className="text-white/70 font-light text-center text-sm mb-5">All coins and transactions in this wallet will be removed</p>
                    <div className="flex flex-col justify-center gap-4">
                        <button
                            onClick={handleConfirmDelete}
                            className="bg-red-600 h-12 hover:bg-red-500 border border-transparent hover:border-red-400 w-full text-white font-medium px-4 py-2 rounded-lg "
                        >
                            Remove
                        </button>
                        <button
                            onClick={() => setDeleteModalOpen(false)}
                            className="bg-gray-600 h-12 hover:bg-gray-500 border border-transparent hover:border-white/40 text-white font-medium px-4 py-2 rounded-lg mb-3"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
};

export default PortfolioMainInfo;
