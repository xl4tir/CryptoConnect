import React from 'react';
import ReactModal from 'react-modal';
import { getUserProfilePhotoURL } from '../../services/userProfileService';


const NewPostModal = ({ isOpenNewPostModal, onRequestClose, onSubmitPost, newPostText, onNewPostTextChange, user }) => {
    return (
        <ReactModal
            isOpen={isOpenNewPostModal}
            onRequestClose={onRequestClose}
            contentLabel="New Post Modal"
            className="max-w-screen-sm flex items-center bg-gray-800 bg-opacity-100 w-full p-8 mx-auto my-60  rounded-xl"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        >
            <div className="flex flex-col w-full">
                <div className='flex flex-row items-start justify-between'> 
                    <h2 className="text-white text-2xl font-semibold mb-6">Post</h2>
                    <svg onClick={onRequestClose} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" 
                    className="size-7 cursor-pointer hover:opacity-70">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className='flex flex-row'>
                    <img
                        src={getUserProfilePhotoURL(user.profile.profilePhoto)}
                        alt={`${user.profile.name}'s profile`}
                        className="flex-shrink-0 w-14 h-14  rounded-full mr-4"
                    />

                    <div className="flex w-full flex-col">
                        <div className="flex w-full flex-row items-center">
                            <p className="text-white font-medium">{user.profile.name} <span className='text-gray-300 pl-1'>@{user.profile.username}</span></p>

                        </div>
                        <textarea
                            className="w-full mt-3 p-2 rounded-md bg-gray-700 placeholder-gray-400 text-white border-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                            placeholder="What's on your mind?"
                            value={newPostText}
                            onChange={(e) => onNewPostTextChange(e.target.value)}
                        />
                        <div className='flex flex-row justify-between items-center mt-4'>
                            <div>
                                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.9126 15.9336C10.1709 16.249 11.5985 16.2492 13.0351 15.8642C14.4717 15.4793 15.7079 14.7653 16.64 13.863" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="#ffffff"></ellipse> <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="#ffffff"></ellipse> <path d="M13 16.0004L13.478 16.9742C13.8393 17.7104 14.7249 18.0198 15.4661 17.6689C16.2223 17.311 16.5394 16.4035 16.1708 15.6524L15.7115 14.7168" stroke="#ffffff" stroke-width="1.5"></path> <path d="M4.92847 4.92663C6.12901 3.72408 7.65248 2.81172 9.41185 2.34029C14.7465 0.910876 20.2299 4.0767 21.6593 9.41136C23.0887 14.746 19.9229 20.2294 14.5882 21.6588C9.25357 23.0882 3.7702 19.9224 2.34078 14.5877C1.86936 12.8284 1.89775 11.0528 2.33892 9.41186" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                            </div>
                            <button
                                className=" w-20 py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
                                onClick={onSubmitPost}
                            >
                                Post
                            </button>




                        </div>
                    </div>
                </div>

            </div>
        </ReactModal>
    );
};

export default NewPostModal;