import React, { useEffect, useState } from 'react';
import { getRepostsByPostId } from '../../services/postService';
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { formatDate } from '../../utils/dateMainFormat';
import Loader from '../Loader';

const RepostList = ({ post_id, updateTabs, setUpdateTabs }) => {
    const [reposts, setReposts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReposts = async () => {
            try {
                const postReposts = await getRepostsByPostId(post_id);
                setReposts(postReposts);
                setUpdateTabs(false);
            } catch (error) {
                console.error('Error fetching reposts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReposts();
    }, [post_id, updateTabs]);

    if (loading) {
        return <div className='flex items-center justify-center m-auto'><Loader /></div>;
    }

    return (
        <div className="max-w-screen-lg flex w-full justify-start flex-col">
            {reposts.map(repost => (
                <div key={repost._id} className="flex items-start flex-col">
                    <div className="flex flex-row w-full">
                        <img
                            src={getUserProfilePhotoURL(repost.user_id.profile.profilePhoto)}
                            alt={`${repost.user_id.profile.name}'s profile`}
                            className="flex-shrink-0 w-14 h-14 rounded-full mr-4"
                        />
                        <div className="flex w-full flex-col pr-20">
                            <div className="flex w-full flex-row items-center">
                                <p className="text-white font-medium">{repost.user_id.profile.name} <span className='text-gray-300 pl-1'>@{repost.user_id.profile.username}</span></p>
                                <p className="px-2 text-white font-medium"> · </p>
                                <p className="text-gray-300 text-sm font-light">{formatDate(repost.created_at)}</p>
                            </div>
                            <p className='text-sm text-gray-400 font-semibold'>Reposted</p>
                            <p className="text-white font-light pt-2 pb-4 cursor-pointer">
                                {repost.content}
                            </p>
                            <div className="flex w-full items-center text-sm justify-between">
                                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <p className="text-white ml-3">{repost.comments.length}</p>
                                </div>
                                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                    </svg>
                                    <p className="text-white ml-3">{repost.reposts.length}</p>
                                </div>
                                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                                    </svg>
                                    <p className="text-white ml-3">{repost.reactions.length}</p>
                                </div>
                                <div className="cursor-pointer opacity-70 hover:opacity-100 flex items-center mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-white opacity-10 my-5" />
                </div>
            ))}
        </div>
    );
};

export default RepostList;
