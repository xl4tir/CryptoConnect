import React, { useState, useEffect } from 'react';
import axios from 'axios';

import latestPublications from '../data/publications';

import ReactModal from 'react-modal';

<link rel="stylesheet" href="https://unpkg.com/emoji-mart/css/emoji-mart.css" />
import { Picker } from 'emoji-mart';

import { useNavigate } from 'react-router-dom';


import { fetchUserProfile, useFetchProfileEffect } from '../services/authUser';




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

          <div className="max-w-screen-lg flex w-full  justify-start flex-col mt-10 px-10">
            <div className='flex flex-row  pt-5 pb-10  items-center w-full justify-between'>
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
                <div
                  key={index}
                  className="flex items-start flex-col ">
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
                          <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />  <line x1="12" y1="12" x2="12" y2="12.01" />  <line x1="8" y1="12" x2="8" y2="12.01" />  <line x1="16" y1="12" x2="16" y2="12.01" /></svg>
                          <span className="text-white ml-2">{publication.comments}</span>
                        </div>

                        <div className="flex items-center mr-4 cursor-pointer">
                          <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" />  <path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3-3l3-3" /></svg>
                          <span className="text-white ml-2">{publication.reposts}</span>
                        </div>

                        <div className="flex items-center mr-4 cursor-pointer">
                          <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7" /></svg>
                          <span className="text-white ml-2">{publication.reactions}</span>
                        </div>

                        <div className="flex items-center cursor-pointer">
                          <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </div>
                    </div>


                  </div>
                  <div className="h-[1px] w-full bg-gray-600 my-5 " />
                </div>

              ))}

          </div>


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
                background: 'rgba(255, 255, 255, 0)', /* Змініть колір фону на потрібний вам */
                padding: '0',
                boxShadow: '0px 4px 30px rgba(0, 0, 0, 0)', /* Додайте тінь за потреби */

              },
              overlay: {
                background: 'rgba(0, 0, 0, 0.1)', /* Змініть колір фону оверлею на потрібний вам */
              },
            }}
          >
            {/* Вміст модального вікна */}
            <div className="fixed w-full inset-0 flex items-center justify-center">
              <div className="absolute w-full inset-0  bg-gray-800 opacity-75"></div>
              <div className="z-10 max-w-2xl w-full mx-auto p-10 opacity-100 blue-glassmorphism-modalWindow rounded-md shadow-md relative">
                <button className="absolute top-2 right-2 p-2 bg-none rounded-md" onClick={closeModal}>
                  <svg width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.0303 8.96965C9.73741 8.67676 9.26253 8.67676 8.96964 8.96965C8.67675 9.26255 8.67675 9.73742 8.96964 10.0303L10.9393 12L8.96966 13.9697C8.67677 14.2625 8.67677 14.7374 8.96966 15.0303C9.26255 15.3232 9.73743 15.3232 10.0303 15.0303L12 13.0607L13.9696 15.0303C14.2625 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2625 15.0303 13.9696L13.0606 12L15.0303 10.0303C15.3232 9.73744 15.3232 9.26257 15.0303 8.96968C14.7374 8.67678 14.2625 8.67678 13.9696 8.96968L12 10.9393L10.0303 8.96965Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM2.75 12C2.75 6.89137 6.89137 2.75 12 2.75C17.1086 2.75 21.25 6.89137 21.25 12C21.25 17.1086 17.1086 21.25 12 21.25C6.89137 21.25 2.75 17.1086 2.75 12Z" fill="#ffffff"></path> </g></svg>
                </button>
                <h2 className="text-2xl font-bold mb-10 text-white">
                  Reply to {selectedPublication?.author}
                </h2>
                <div className="flex flex-row w-full">
                  <div className="flex-shrink-0 w-14 h-14 bg-gray-600 rounded-full mr-4"></div>
                  <div className="flex w-full flex-col ">
                    <div className="flex w-full flex-row items-end">
                      <p className="text-white font-medium">{selectedPublication?.author} </p>
                      <p className="px-2 text-white font-medium"> · </p>
                      <p className="text-gray-300 text-sm font-light">{selectedPublication?.date}</p>
                    </div>
                    <p className="text-white font-light mb-4 mt-2">{selectedPublication?.content}</p>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); }}>

                  <div className="flex flex-row w-full pt-5">
                    <div className="flex-shrink-0 w-14 h-14 bg-gray-300 rounded-full mr-4"></div>
                    <div className="flex w-full flex-col">
                      <div className="flex w-full flex-row items-end">
                        <p className="text-white font-medium">{userProfile.firstName} </p>
                      </div>

                      <textarea
                        className="text-white blue-glassmorphism placeholder:text-white shadow-none border-0 font-light mb-4 mt-2 w-full h-24 p-2 mb-4 rounded-md resize-none"
                        placeholder="Wtire your comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />


                      <div className='flex flex-row w-full justify-between items-center mt-2'>
                        <div
                          className=" "
                          onClick={handleEmojiClick}
                        >
                          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.9126 15.9336C10.1709 16.249 11.5985 16.2492 13.0351 15.8642C14.4717 15.4793 15.7079 14.7653 16.64 13.863" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="#ffffff"></ellipse> <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="#ffffff"></ellipse> <path d="M13 16.0004L13.478 16.9742C13.8393 17.7104 14.7249 18.0198 15.4661 17.6689C16.2223 17.311 16.5394 16.4035 16.1708 15.6524L15.7115 14.7168" stroke="#ffffff" stroke-width="1.5"></path> <path d="M4.92847 4.92663C6.12901 3.72408 7.65248 2.81172 9.41185 2.34029C14.7465 0.910876 20.2299 4.0767 21.6593 9.41136C23.0887 14.746 19.9229 20.2294 14.5882 21.6588C9.25357 23.0882 3.7702 19.9224 2.34078 14.5877C1.86936 12.8284 1.89775 11.0528 2.33892 9.41186" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                        </div>

                        {console.log("heloo")}

                        {showEmojiPicker && (
                          <div className="absolute z-10">
                            <Picker
                              onSelect={(emoji) => {
                                setComment((prevComment) => prevComment + emoji.native);
                                setShowEmojiPicker(false);
                              }}
                            />
                          </div>
                        )}


                        <button
                          className=" text-white bg-[#2952e3] py-3 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]"
                          type="submit"
                          onClick={() => handleCommentSubmit(comment)}
                        >
                          Send a comment
                        </button>
                      </div>
                    </div>
                  </div>




                </form>
              </div>
            </div>



          </ReactModal>



        </div>
      ) : (
        <p className="text-white mt-4">Loading...</p>

      )}
    </div>
  );
};

export default Profile;
