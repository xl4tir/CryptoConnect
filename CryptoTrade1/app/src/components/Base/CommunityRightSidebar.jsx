import React, { useState, useEffect } from 'react';
import { FiInfo } from "react-icons/fi";
import { getRecentUsers } from '../../services/userProfileService';
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { Link } from 'react-router-dom';

const CommunityRightSidebar = ({ user_id }) => {
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {

        const fetchRecentUsers = async () => {
            try {
                const users = await getRecentUsers();
                console.log(users)
                const filteredUsers = users.filter(user => user._id !== user_id);
                setRecentUsers(filteredUsers)
               
            } catch (error) {
                console.error('Помилка отримання останніх користувачів:', error);
            }
        };

        fetchRecentUsers();
    }, [user_id]);

    return (
        <div className="w-56   mt-8">

            <div className="space-y-5">
                <div className="flex-row  items-center w-full shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                    <p className='text-base font-semibold text-white flex flex-row items-center gap-2'>
                        🔥 Trending Topics <FiInfo />
                    </p>

                    <div className='flex flex-col gap-2 mt-3'>
                        <p className='flex-row flex items-center gap-4 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-2" htmlFor="">1</label>
                            <label htmlFor="">#Bitcoin</label>
                        </p>
                        <p className='flex-row flex items-center  gap-4 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-2" htmlFor="">2</label>
                            <label htmlFor="">#DePIN</label>
                        </p>
                        <p className='flex-row flex items-center gap-4 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-2" htmlFor="">3</label>
                            <label htmlFor="">#Arbitrum</label>
                        </p>
                        <p className='flex-row flex items-center gap-4 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-2" htmlFor="">4</label>
                            <label htmlFor="">#Binance</label>
                        </p>
                        <p className='flex-row flex items-center gap-4 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-2" htmlFor="">5</label>
                            <label htmlFor="">#Solana</label>
                        </p>
                    </div>

                </div>

                <div className="flex-row  items-center w-full shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                    <p className='text-base font-semibold text-white flex flex-row items-center gap-2'>
                        🔥  Trending Tokens <FiInfo />
                    </p>

                    <div className='flex flex-col gap-2 mt-3'>
                        <Link to={`/coin-info/mantra`}>
                            <p className='flex-row flex items-center gap-2 text-white text-sm font-semibold'>
                                <label className="text-white/70 w-4" htmlFor="">1</label>
                                <label htmlFor="">$OM</label>
                                <label className="text-white/70 font-medium" htmlFor="" >MANTRA</label>
                            </p>
                        </Link>
                        <p className='flex-row flex items-center  gap-2 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-4" htmlFor="">2</label>
                            <label htmlFor="">$TURBO</label>
                            <label className="text-white/70 font-medium" htmlFor="">Turbo</label>
                        </p>
                        <p className='flex-row flex items-center gap-2 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-4" htmlFor="">3</label>
                            <label htmlFor="">$BOBO</label>
                            <label className="text-white/70 font-medium" htmlFor="">Bobo</label>
                        </p>
                        <p className='flex-row flex items-center gap-2 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-4" htmlFor="">4</label>
                            <label htmlFor="">$SWAP</label>
                            <label className="text-white/70 font-medium" htmlFor="">TrustSwap</label>
                        </p>
                        <p className='flex-row flex items-center gap-2 text-white text-sm font-semibold'>
                            <label className="text-white/70 w-4" htmlFor="">5</label>
                            <label htmlFor="">$PONKE</label>
                            <label className="text-white/70 font-medium" htmlFor="">Ponke</label>
                        </p>
                    </div>

                </div>

                <div className="flex-row items-center w-full shadow-sm shadow-gray-300 rounded-lg bg-white p-4 bg-opacity-5">
                    <p className='text-base font-semibold text-white flex flex-row items-center gap-2'>
                        Recommended <FiInfo />
                    </p>

                    <div className='flex flex-col gap-5 mt-3'>

                    {recentUsers.slice(0, 4).map(user => (
                            <Link to={`/profile/${user._id}` } >
                                <div key={user._id} className="flex-row flex items-center gap-4 text-white text-sm font-semibold">
                                    <div className="flex flex-row w-full">
                                        <img
                                            src={getUserProfilePhotoURL(user.profilePhoto)}
                                            alt={`${user.username}'s profile`}
                                            className="flex-shrink-0 w-9 h-9 rounded-full mr-2"
                                        />
                                        <div className="flex w-full flex-col">
                                            <div className="flex w-full flex-col flex-start">
                                                <p className="text-white text-md font-semibold">
                                                    {user.name.length > 15 ? `${user.name.slice(0, 15)}...` : user.name}
                                                </p>
                                                <p className='font-semibold text-xs text-gray-300'>@{user.username}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityRightSidebar;
