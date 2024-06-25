import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionContext } from '../../context/TransactionContext';
import PublicationTabs from './PublicationTabs';
import { getPostById } from '../../services/postService';
import AuthService from '../../services/AuthService';
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { createComment } from '../../services/commentsService'; // Імпорт сервісу для створення коментаря
import Loader from '../Loader';


const Publication = () => {
    const { currentAccount } = useContext(TransactionContext);
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [publication, setPublication] = useState(null);
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState(''); // Додати стан для коментаря
    const [updateTabs, setUpdateTabs] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userf = await AuthService.getCurrentUser();
                setUser(userf.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('User not found:', error);
                } else {
                    console.error('Error fetching user:', error);
                }
            }
        };

        if (currentAccount) {
            fetchUserProfile();
        }
    }, [currentAccount]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const post = await getPostById(id);
                setPublication(post);
            } catch (error) {
                console.error('Error fetching post:', error);
                navigate('/not-found');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id, navigate]);

    const goBack = () => {
        navigate(-1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        return date.toLocaleString('en-US', options).replace(',', ' at');
    };

    const handleCommentSubmit = async () => {
        try {
            const newComment = {
                post_id: publication._id,
                content: comment
            };
            await createComment(newComment);
            setComment('');
            setUpdateTabs(true);
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    };

    if (!publication || !user || isLoading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <Loader />
            </div>);
    }

    return (
        <div className="max-w-screen-md flex md:w-9/12 mx-auto justify-center items-center">
            <div className="flex items-start flex-col">
                <div className='flex items-center flex-row mt-10 mb-5 gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={goBack}
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth={2} stroke="white"
                        className="size-7 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>

                    <p className="text-left text-white font-light text-2xl w-11/12 text-semibase font-semibold">Post detail</p>
                </div>
                <div className="h-[1px] max-w-screen-md w-screen bg-white opacity-10 mb-5" />
                <div className="flex max-w-screen-md flex-row w-screen">
                    <img
                        src={getUserProfilePhotoURL(publication.user_id.profile.profilePhoto)}
                        alt={`${publication.user_id.profile.name}'s profile`}
                        className="flex-shrink-0 w-14 h-14 rounded-full mr-4"
                    />
                    <div className="flex w-full flex-col">
                        <div className="flex w-full flex-row items-center">
                            <p className="text-white font-medium">{publication.user_id.profile.name} <span className='text-gray-300 pl-1'>@{publication.user_id.profile.username}</span></p>
                        </div>
                        <p
                            onClick={() => {
                                navigate(`/publications/${publication._id}`);
                            }}
                            className="text-white font-light mt-1 mb-4"
                        >
                            {publication.content}
                        </p>
                        <p className="text-gray-300 text-sm font-light mb-4">{formatDate(publication.created_at)}</p>
                        <div className="flex w-full items-center text-white text-sm justify-between">
                            <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                <p className="ml-3">{publication.view_count}</p>
                            </div>

                            <div
                                className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4"
                                onClick={() => openModalComment(publication)}>

                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                </svg>
                                <p className="text-white ml-3">{publication.comments.length}</p>
                            </div>

                            <div
                                className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4"
                                onClick={() => openModalRepost(publication)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                </svg>
                                <p className="text-white ml-3">{publication.reposts.length}</p>
                            </div>



                            <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                </svg>
                                <p className="text-white ml-3"></p>
                            </div>

                            <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[1px] w-full bg-white opacity-10 my-5" />
                <form className="w-full" onSubmit={(e) => { e.preventDefault(); handleCommentSubmit(); }}>
                    <div className="flex flex-row w-full pt-2 mb-10">
                        <img
                            src={getUserProfilePhotoURL(user.profile.profilePhoto)}
                            alt={`${user.profile.name}'s profile`}
                            className="flex-shrink-0 w-14 h-14 rounded-full mr-4"
                        />
                        <div className="flex w-full flex-col">
                            <textarea
                                className="text-white blue-glassmorphism placeholder:text-white shadow-none border-0 font-light mb-4 mt-2 w-full p-2 mb-4 rounded-md"
                                placeholder="Write your comment..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <div className='flex flex-row w-full justify-between items-center mt-2'>
                                <div>
                                    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                        <path d="M8.9126 15.9336C10.1709 16.249 11.5985 16.2492 13.0351 15.8642C14.4717 15.4793 15.7079 14.7653 16.64 13.863" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                        <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="#ffffff"></ellipse>
                                        <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="#ffffff"></ellipse>
                                        <path d="M13 16.0004L13.478 16.9742C13.8393 17.7104 14.7249 18.0198 15.4661 17.6689C16.2223 17.311 16.5394 16.4035 16.1708 15.6524L15.7115 14.7168" stroke="#ffffff" strokeWidth="1.5"></path>
                                        <path d="M4.92847 4.92663C6.12901 3.72408 7.65248 2.81172 9.41185 2.34029C14.7465 0.910876 20.2299 4.0767 21.6593 9.41136C23.0887 14.746 19.9229 20.2294 14.5882 21.6588C9.25357 23.0882 3.7702 19.9224 2.34078 14.5877C1.86936 12.8284 1.89775 11.0528 2.33892 9.41186" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
                                    </svg>
                                </div>
                                <button
                                    className="text-white bg-[#2952e3] py-3 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                                    type="submit"
                                >
                                    Send a comment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="h-[1px] w-full bg-white opacity-10" />
                <PublicationTabs post_id={publication._id} updateTabs={updateTabs} setUpdateTabs={setUpdateTabs} />

            </div>
        </div>
    );
};

export default Publication;
