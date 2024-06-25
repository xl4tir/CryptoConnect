import Loader from '../Loader';
import React, { useState, useEffect, useContext } from 'react';
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlineArticle } from "react-icons/md";
import { TransactionContext } from '../../context/TransactionContext';
import AuthService from '../../services/AuthService';
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { createPost, getPostsByCryptoSymbol } from '../../services/postService';
import { Toaster, toast } from 'react-hot-toast';

const CommunityBar = ({ coin }) => {
    const { currentAccount } = useContext(TransactionContext);
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCurrentUserProfile = async () => {
            try {
                const _currentUser = await AuthService.getCurrentUser();
                setCurrentUser(_currentUser.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getCurrentUserProfile();
    }, [currentAccount]);

    const fetchPosts = async () => {
        try {
            const filteredPosts = await getPostsByCryptoSymbol(coin.symbol);
            setPosts(filteredPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [coin.symbol]);

    const handlePostCreation = async () => {
        try {
            const postData = {
                content,
                crypto_symbol: coin.symbol
            };
            const newPost = await createPost(postData);
            setContent('');
            fetchPosts();
            toast.success('Post created successfully!', {className: "blue-glassmorphism-toast"});
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Error creating post.', {className: "blue-glassmorphism-toast"});
        }
    };

    const customStyle = {
        strokeWidth: 0.7,
    };

    if (loading) {
        return <Loader />;
    }

    if (!currentUser.profile) {
        return ( <div className='flex flex-col items-center text-center p-10'><Loader />Please connect your wallet to the app and create a profile</div> )
    }

    return (
        <div className='p-5'>
            <Toaster></Toaster>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center justify-start gap-2'>
                    <img className='w-6' src={coin.image} alt={coin.name} />
                    <h1 className='text-sm font-medium'>{coin.name}</h1>
                </div>
                <div className='flex flex-row items-center gap-2 border border-1 rounded-md px-2 py-1.5 text-xs border-blue-500'>
                    Subscribe
                </div>
            </div>

            <div className='text-xs mt-5 flex flex-row items-center gap-2 justify-start font-medium text-white'>
                <TfiAnnouncement size={15} style={customStyle} />
                <p>Project's announcements</p>
            </div>

            <div className='flex flex-col mt-2 bg-white/10 p-2 px-3 rounded-md gap-2 pb-4'>
                <div className="flex items-start flex-col">
                    <div className="flex flex-col w-full">
                        <p className="text-white text-sm pt-2 pb-4 cursor-pointer">
                            The Infinite Garden Open Source Department presents: 🌱 Q2 2024 Roadmap (<label className='text-blue-300' htmlFor="">@ethdotorg</label> version) 🌱 <b></b>
                        </p>
                        <div className="flex w-full items-center text-xs justify-between">
                            <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <p className="text-white ml-2">34</p>
                            </div>
                            <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                </svg>
                                <p className="text-white ml-2">54</p>
                            </div>
                            <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                </svg>
                                <p className="text-white ml-2">14</p>
                            </div>
                            <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='text-xs mt-5 flex flex-row items-center gap-2 justify-start font-medium text-white'>
                <MdOutlineArticle size={18} />
                <p>Last publications</p>
            </div>

            <div className='flex flex-col mt-2 bg-white/10 p-2 px-3 rounded-md gap-2 pb-4 overflow-auto max-h-72 scrollbar-custom'>
                {posts.map(post => (
                    <div key={post._id} className="flex items-start flex-col">
                        <div className="flex flex-col w-full">
                            <div className='flex flex-row gap-2 items-start justify-start'>
                                <img
                                    src={getUserProfilePhotoURL(post.user_id.profile.profilePhoto)}
                                    alt={`'s profile`}
                                    className="flex-shrink-0 w-9 h-9 rounded-full mb-2"
                                />
                                <div>
                                    <p className="text-white text-sm pb-1 font-semibold">
                                        {post.user_id.profile.name}
                                    </p>
                                    <p className="text-white text-sm pb-2">
                                        <label className='text-blue-300 cursor-pointer' htmlFor="">&{post.crypto_symbol}</label> {post.content}
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-full items-center text-xs justify-between pb-2">
                                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p className="text-white ml-2">34</p>
                                </div>
                                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                    </svg>
                                    <p className="text-white ml-2">54</p>
                                </div>
                                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                    </svg>
                                    <p className="text-white ml-2">14</p>
                                </div>
                                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='flex flex-row mt-4'>
                <div className='flex flex-col items-center w-14 justify-between'>
                    <img
                        src={getUserProfilePhotoURL(currentUser.profile.profilePhoto)}
                        alt={`'s profile`}
                        className="flex-shrink-0 w-9 h-9 rounded-full"
                    />
                    <div>
                        <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M8.9126 15.9336C10.1709 16.249 11.5985 16.2492 13.0351 15.8642C14.4717 15.4793 15.7079 14.7653 16.64 13.863" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="#ffffff"></ellipse>
                                <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="#ffffff"></ellipse>
                                <path d="M13 16.0004L13.478 16.9742C13.8393 17.7104 14.7249 18.0198 15.4661 17.6689C16.2223 17.311 16.5394 16.4035 16.1708 15.6524L15.7115 14.7168" stroke="#ffffff" strokeWidth="1.5"></path>
                                <path d="M4.92847 4.92663C6.12901 3.72408 7.65248 2.81172 9.41185 2.34029C14.7465 0.910876 20.2299 4.0767 21.6593 9.41136C23.0887 14.746 19.9229 20.2294 14.5882 21.6588C9.25357 23.0882 3.7702 19.9224 2.34078 14.5877C1.86936 12.8284 1.89775 11.0528 2.33892 9.41186" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                            </g>
                        </svg>
                    </div>
                </div>

                <div className="flex w-full flex-col">
                    <textarea
                        className="w-full p-2 rounded-md bg-white/0 placeholder-white/50 text-white border-none focus:outline-none focus:ring-0"
                        placeholder="What's on your mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className='flex flex-row items-end justify-end mt-3'>
                        <button
                            className="py-1.5 px-3 bg-blue-600 text-xs text-white font-medium rounded-md hover:bg-blue-700"
                            onClick={handlePostCreation}
                        >
                            Post
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityBar;
