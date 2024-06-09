import React, { useEffect, useState } from 'react';
import { getCommentsByUserId } from '../../services/commentsService'; // Оновлений імпорт функції
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { formatDate } from '../../utils/dateMainFormat';
import Loader from '../Loader';

const CommentListByUserId = ({ user_id }) => { // Заміна post_id на user_id
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const userComments = await getCommentsByUserId(user_id); // Оновлений виклик функції
                setComments(userComments);

            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);

            }
        };

        fetchComments();
    }, [user_id]); // Додано updateTabs до залежностей ефекту

    if (loading) {
        return <div className='flex max-w-screen-lg items-center justify-center w-screen m-auto'><Loader></Loader></div>;
    }

    return (
        <div className="max-w-screen-lg flex w-screen justify-start flex-col ">
            {comments.map(comment => (
                <div key={comment._id} className="flex max-w-screen-md  w-screen m-auto items-start flex-col ">
                    <div className="flex flex-row w-full">
                        <img
                            src={getUserProfilePhotoURL(comment.user_id.profile.profilePhoto)}
                            alt={`${comment.user_id.profile.name}'s profile`}
                            className="flex-shrink-0 w-14 h-14  rounded-full mr-4"
                        />
                        <div className="flex w-full flex-col pr-20">
                            <div className="flex w-full flex-row items-center">
                                <p className="text-white font-medium">{comment.user_id.profile.name} <span className='text-gray-300 pl-1'>@{comment.user_id.profile.username}</span></p>
                                <p className="px-2 text-white font-medium"> · </p>
                                <p className="text-gray-300 text-sm font-light">{formatDate(comment.created_at)}</p>
                            </div>
                            <p className='text-sm text-gray-400 font-semibold'>Replying to <span className='text-blue-400 font-normal'>@{comment.post_id.user_id.profile.username}</span></p>
                            <p className="text-white font-light pt-2 pb-4 cursor-pointer">
                                {comment.content}
                            </p>
                            <div className="flex w-full items-center text-sm justify-between">
                                {/* Решта вашого JSX коду для відображення реакцій */}
                            </div>
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-white opacity-10 my-5" />
                </div>
            ))}
        </div>
    );
};

export default CommentListByUserId;
