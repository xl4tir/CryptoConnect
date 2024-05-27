import React from 'react';

const ProfileInfo = ({ userProfile, onEdit, onDelete }) => {
  return (
    <div className="max-w-screen-lg flex w-full flex-1 px-10 justify-around items-center flex-col sm:flex-row">
      <div className="flex w-full justify-start flex-col mb-10">
        <p className="text-left mt-5 text-white font-light md:w-9/12 text-xl w-11/12 text-semibase font-semibold">
          Your information
        </p>
        <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">Name:</b> {userProfile.name}
        </p>
        <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">Username:</b> {userProfile.username}
        </p>
        <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">Email:</b> {userProfile.email}
        </p>
        <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">Date of Birth:</b> {userProfile.dateOfBirth}
        </p>
        <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">Gender:</b> {userProfile.gender}
        </p>
        <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">Country:</b> {userProfile.country}
        </p>
        <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">City:</b> {userProfile.city}
        </p>
        <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">Bio:</b> {userProfile.bio}
        </p>
        <p className="text-left mt-1 text-white font-light md:w-9/12 w-11/12 text-base">
          <b className="font-medium">Favorite Categories:</b> {userProfile.favoriteCategories.join(', ')}
        </p>
        <div className="flex mt-4">
          <button
            onClick={onEdit}
            className="mr-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
          <button
            onClick={onDelete}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
