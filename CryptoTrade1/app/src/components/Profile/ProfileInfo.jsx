import React, { useState } from 'react';
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { FiChevronDown } from 'react-icons/fi';
import { AiOutlineDelete } from "react-icons/ai";

const ProfileInfo = ({ userProfile, onEdit, onDelete }) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const profilePhotoURL = getUserProfilePhotoURL(userProfile.profilePhoto);
  const backgroundPhotoURL = getUserProfilePhotoURL(userProfile.backgroundPhoto);

  // Функція для перетворення дати з ISO 8601 в формат "рік Місяць"
  const formatRegistrationDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const year = dateObj.getFullYear();
    const month = dateObj.toLocaleString('en-US', { month: 'long' });
    return `${year} ${month}`;
  };

  return (
    <div className="max-w-screen-lg flex w-full flex-1 pt-10 px-10 justify-around items-center flex-col sm:flex-row">
      <div className="flex w-full justify-start flex-col ">

        <div className='relative'>
          {backgroundPhotoURL && (
            <div className="w-full h-64 mb-4 rounded-lg overflow-hidden">
              <img src={backgroundPhotoURL} alt="Background" className="w-full h-full object-cover" />
            </div>
          )}
          {profilePhotoURL && (
            <img src={profilePhotoURL} alt="Profile" className="absolute bottom-0 transform  translate-y-3/4 rounded-full h-32 w-32 mb-4" />
          )}
        </div>
        <div className="ml-40 flex justify-between items-end">
          <div className='w-full'>
            <p className="text-left text-white  md:w-9/12 w-11/12">
              <b className="font-medium"> {userProfile.name}</b>
            </p>
            <p className="text-left font-medium text-gray-300 text-sm md:w-9/12 w-11/12 ">
              @{userProfile.username}
            </p>
            <p className="text-left mt-2 text-white text-sm font-light md:w-9/12 w-11/12 ">
              <b className="font-medium"> 10 </b> Following <b className="font-medium ml-2"> 3 </b> Followers
            </p>
          </div>
          <button
            onClick={onEdit}
            className="ml-2 py-2 px-4 h-10 w-auto bg-inherit text-sm text-white rounded-md hover:bg-blue-600 flex border-solid justify-between gap-2 items-center border border-blue-600"
          >

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            Edit
          </button>
          <AiOutlineDelete onClick={onDelete} className=' cursor-pointer ml-2 py-2 px-3 h-10 w-auto bg-inherit 
          text-sm text-white rounded-md hover:bg-red-600 flex border-solid 
          justify-between gap-2 items-center border border-red-600' size={35} />
          
        </div>
        <div className='flex  mt-8 justify-start'>
          <p className='text-left text-gray-300 text-sm '>Joined {formatRegistrationDate(userProfile.registrationDate)}</p>
          <button
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="bg-inherit text-left text-white text-sm ml-10 flex items-center"
          >
            <span>More info </span>
            <FiChevronDown  className={`ml-2 ${showMoreInfo ? 'transform rotate-180' : ''}`} />
          </button>
        </div>
        <div className="flex w-full bg-white opacity-10 h-px mt-3 mb-1" />

        {showMoreInfo && (
          <div >
            {/* Додаткова інформація */}
            <div className=''>
              <div className='flex flex-row'>
                <p className="text-left text-md mt-1 text-white font-light md:w-9/12 w-11/12 text-sm">
                  <b className="font-base">Email:</b> {userProfile.email}
                </p>
                <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-sm">
                  <b className="font-base">Date of Birth:</b> {userProfile.dateOfBirth}
                </p>
                <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-sm">
                  <b className="font-base">Gender:</b> {userProfile.gender}
                </p>
              </div>
              <div className='flex flex-row mt-1' >
                <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-sm">
                  <b className="font-base">Country:</b> {userProfile.country}
                </p>
                <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-sm">
                  <b className="font-base">City:</b> {userProfile.city}
                </p>

                <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-sm">
                  <b className="font-base">Favorite Categories:</b> {userProfile.favoriteCategories.join(', ')}
                </p>
              </div>
            </div>

            <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-sm">
              <b className="font-base">Bio:</b> {userProfile.bio}
            </p>
          </div>
        )}

        <div className="flex mt-4 items-center">


          
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
