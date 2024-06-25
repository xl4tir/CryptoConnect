import React, { useState, useEffect, useContext } from 'react';
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { FiChevronDown } from 'react-icons/fi';
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from '../../services/followService';
import { AuthContext } from '../../context/authContext';
import { Toaster, toast } from 'react-hot-toast';

const ProfileInfo = ({ userProfile, onEdit, onDelete, isOwner }) => {
  const { user } = useContext(AuthContext);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [profilePhotoURL, setProfilePhotoURL] = useState('');
  const [backgroundPhotoURL, setBackgroundPhotoURL] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(userProfile.followers.length);
  const [followingCount, setFollowingCount] = useState(userProfile.following.length);

  useEffect(() => {
    setProfilePhotoURL(getUserProfilePhotoURL(userProfile.profilePhoto));
    setBackgroundPhotoURL(getUserProfilePhotoURL(userProfile.backgroundPhoto));
    setIsFollowing(userProfile.followers.includes(user.profile._id));
  }, [userProfile, user.profile._id]);

  const handleFollow = async () => {
    try {
      await followUser(userProfile._id);
      setIsFollowing(true);
      setFollowersCount(prevCount => prevCount + 1);
      toast.success('Followed successfully!', { className: "blue-glassmorphism-toast" });
    } catch (error) {
      console.error('Error following user:', error);
      toast.error('Error following user.', { className: "blue-glassmorphism-toast" });
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(userProfile._id);
      setIsFollowing(false);
      setFollowersCount(prevCount => prevCount - 1);
      toast.success('Unfollowed successfully!', { className: "blue-glassmorphism-toast" });
    } catch (error) {
      console.error('Error unfollowing user:', error);
      toast.error('Error unfollowing user.', { className: "blue-glassmorphism-toast" });
    }
  };

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
            <div className="w-full h-56 mb-4 rounded-lg overflow-hidden">
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
              <b className="font-medium"> {followingCount} </b> Following <b className="font-medium ml-2"> {followersCount} </b> Followers
            </p>
          </div>
          {isOwner ? (
            <>
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
            </>
          ) : (
            <>
              {isFollowing ? (
                <button
                  onClick={handleUnfollow}
                  className="ml-2 py-2 px-4 h-10 w-auto bg-inherit text-sm text-white rounded-md hover:bg-red-600 flex border-solid justify-between gap-2 items-center border border-red-600"
                >
                  Unfollow
                </button>
              ) : (
                <button
                  onClick={handleFollow}
                  className="ml-2 py-2 px-4 h-10 w-auto bg-inherit text-sm text-white rounded-md hover:bg-blue-600 flex border-solid justify-between gap-2 items-center border border-blue-600"
                >
                  Follow
                </button>
              )}
              <Link 
                to={`/portfolio-tracker/${userProfile._id}`} 
                className="ml-2 py-2 px-4 h-10 w-auto  text-sm text-white rounded-md bg-blue-600 hover:bg-blue-700 flex border-solid justify-between gap-2 items-center border border-blue-600"
              >
                Portfolio
              </Link>
            </>
          )}
        </div>
        <div className='flex  mt-8 justify-start'>
          <p className='text-left text-gray-300 text-sm '>Joined {formatRegistrationDate(userProfile.registrationDate)}</p>
          <button
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="bg-inherit text-left text-white text-sm ml-10 flex items-center"
          >
            <span>More info </span>
            <FiChevronDown className={`ml-2 ${showMoreInfo ? 'transform rotate-180' : ''}`} />
          </button>
        </div>
        <div className="flex w-full bg-white opacity-10 h-px mt-3 mb-1" />

        {showMoreInfo && (
          <div>
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
              <div className='flex flex-row mt-1'>
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

      </div>
    </div>
  );
};

export default ProfileInfo;
