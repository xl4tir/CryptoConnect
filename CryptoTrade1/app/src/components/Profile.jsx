import React, { useState, useEffect } from 'react';
import axios from 'axios';

import latestPublications from '../data/publications';
import ReactModal from 'react-modal';
import { Picker } from 'emoji-mart';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, useFetchProfileEffect } from '../services/userProfileService';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const navigate = useNavigate();

  const handleEmojiClick = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigatePortfolio = () => {
    navigate('/portfolio-tracker');
  };

  const handleCommentSubmit = (comment) => {
    // Логіка відправлення коментаря (до API або інше)
    console.log('Ваш коментар:', comment);
    closeModal(); // Закриття модального вікна після відправлення коментаря
  };

  useFetchProfileEffect(setUserProfile);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="flex w-full justify-center items-center">
      {userProfile ? (
        <div className="flex flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="max-w-screen-lg flex flex-1 justify-start items-center flex-col mb-10">
            <h1 className="text-3xl sm:text-5xl text-white py-1">User profile</h1>
            <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Welcome to your user profile. Here, you can view and edit your personal information, create posts, comment, interact with other users, as well as create and manage portfolios.
            </p>
          </div>

          <div className="max-w-screen-lg flex w-full flex-1 px-10 justify-around items-center flex-col sm:flex-row">
            <div className="flex w-full justify-start flex-col mb-10">
              <p className="text-left mt-5 text-white font-light md:w-9/12 text-xl w-11/12 text-semibase font-semibold">
                Your information
              </p>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                <b className="font-medium">Name:</b> {userProfile.firstName}
              </p>
              <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
                <b className="font-medium">Surname: </b> {userProfile.lastName}
              </p>
              <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
                <b className="font-medium">Nickname:</b> {userProfile.login}
              </p>
              <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
                <b className="font-medium">Email:</b> {userProfile.email}
              </p>
            </div>

            <nav className="h-32 flex justify-between flex-col">
              <button className="text-white bg-transparent py-1 px-7 rounded-full border border-[#2952e3] cursor-pointer hover:bg-[#2952e3] hover:text-white" onClick={handleLogout}>
                Edit
              </button>
              <button className="text-white bg-transparent py-1 px-7 rounded-full border border-[#A90E8F] cursor-pointer hover:bg-[#A90E8F] hover:text-white" onClick={handleNavigatePortfolio}>
                Portfolio
              </button>
              <button className="text-white bg-transparent py-1 px-7 rounded-full border border-[#FF0000] cursor-pointer hover:bg-[#FF0000] hover:text-white" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          </div>

          <div className="max-w-screen-lg flex w-full justify-start flex-col mt-10 px-10">
            <div className='flex flex-row pt-5 pb-10 items-center w-full justify-between'>
              <p className="text-left text-white font-light md:w-9/12 text-xl w-11/12 text-semibase font-semibold">Latest Publications</p>
              <div className='flex flex-row items-center cursor-pointer'>
                <p className='text-white font-semibold pr-3'>New post</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
                  class="w-10 h-10">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </div>
            </div>

            {latestPublications
              .filter((publication) => publication.author === userProfile.login) // Зміна тут
              .map((publication, index) => (
                <div key={index} className="flex items-start flex-col">
                  <div className="flex flex-row w-full">
                    <div className="flex-shrink-0 w-14 h-14 bg-gray-600 rounded-full mr-4"></div>
                    <div className="flex w-full flex-col pr-20">
                      <div className="flex w-full flex-row items-center">
                        <p className="text-white font-medium">{publication.author} </p>
                        <p className="px-2 text-white font-medium"> · </p>
                        <p className="text-gray-300 text-sm font-light">{publication.date}</p>
                      </div>
                      <p onClick={() => {
                        navigate(`/publications/${publication._id}`);
                      }} className="text-white font-light my-4">{publication.content}</p>

                      <div className="flex w-full items-center mt-2 justify-between">
                        <div onClick={() => {
                          openModal();
                          setSelectedPublication(publication); // Встановлюємо вибрану публікацію при кліці на кнопку
                        }} className="cursor-pointer flex items-center mr-4">
                          <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                            <line x1="12" y1="12" x2="12" y2="12.01" />
                            <line x1="8" y1="12" x2="8" y2="12.01" />
                            <line x1="16" y1="12" x2="16" y2="12.01" />
                          </svg>
                          <p className="text-white ml-1">Comment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full bg-gray-500 h-px my-5" />
                </div>
              ))}
          </div>

          <ReactModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Comment Modal"
            className="max-w-screen-lg flex items-center bg-gray-800 bg-opacity-80 w-full p-8 mx-auto my-20 rounded-xl"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75"
          >
            {selectedPublication && (
              <div className="flex flex-col w-full">
                <h2 className="text-white text-2xl font-semibold mb-4">Add a comment</h2>
                <div className="flex flex-col mb-4">
                  <p className="text-white text-lg">{selectedPublication.content}</p>
                  <p className="text-gray-400 text-sm mt-1">- {selectedPublication.author}, {selectedPublication.date}</p>
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your comment here..."
                />
                <button
                  onClick={handleEmojiClick}
                  className="mt-2 text-gray-500 hover:text-white"
                >
                  {showEmojiPicker ? 'Hide emojis' : 'Show emojis'}
                </button>
                {showEmojiPicker && (
                  <Picker
                    onSelect={(emoji) => setComment(comment + emoji.native)}
                    style={{ position: 'absolute', zIndex: '10', bottom: '20px', right: '20px' }}
                  />
                )}
                <button
                  onClick={() => handleCommentSubmit(comment)}
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                >
                  Submit Comment
                </button>
              </div>
            )}
          </ReactModal>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;
