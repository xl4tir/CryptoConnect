import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TransactionContext } from '../../context/TransactionContext';
import PublicationTabs from './PublicationTabs';
import { getPostById } from '../../services/postService';
import AuthService from '../../services/AuthService';
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { createComment } from '../../services/commentsService'; // Імпорт сервісу для створення коментаря

const Publication = () => {
    const { currentAccount } = useContext(TransactionContext);
    const { id } = useParams();

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

    if (!publication || !user) {
        return <div>Loading...</div>;
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
                        <div className="flex w-full items-center text-sm justify-between">
                            {/* ... (інші елементи) */}
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
