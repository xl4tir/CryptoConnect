import React, { useState } from 'react';
import { getUserProfilePhotoURL } from '../../services/userProfileService';


const ProfileForm = ({ onSubmit, initialData }) => {
    const [profileData, setProfileData] = useState(initialData || {
        name: '',
        username: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        country: '',
        city: '',
        bio: '',
        favoriteCategories: [],
        profilePhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo212qSykd8WNfU7jgmwhEo14NG5J8JRjQlw&s",
        backgroundPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo212qSykd8WNfU7jgmwhEo14NG5J8JRjQlw&s",
    });
    const [showAdditionalFields, setShowAdditionalFields] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleProfilePhotoChange = (e) => {
        setProfileData({ ...profileData, profilePhoto: e.target.files[0] });
    };

    const handleBackgroundPhotoChange = (e) => {
        setProfileData({ ...profileData, backgroundPhoto: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(profileData);
    };

    const profilePhotoURL = getUserProfilePhotoURL(profileData.profilePhoto);

    const backgroundPhotoURL = getUserProfilePhotoURL(profileData.backgroundPhoto);

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
                    Username <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    required
                />
            </div>


            <div className="mb-4 relative">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="profilePhoto">
                    Profile photo <span className="text-red-500">*</span>
                </label>
                <label htmlFor="profilePhoto" className="block cursor-pointer w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                    {profileData.profilePhoto instanceof File && <img src={URL.createObjectURL(profileData.profilePhoto)} alt="Profile" className="w-full h-full object-cover" />}
                    {!(profileData.profilePhoto instanceof File) && <img src={profilePhotoURL} alt="Profile" className="w-full h-full object-cover" />}
                    {!profileData.profilePhoto && <span className="block text-center text-gray-400 mt-12">Upload photo</span>}
                    <input
                        type="file"
                        name="profilePhoto"
                        onChange={handleProfilePhotoChange}
                        id="profilePhoto"
                        accept=".png, .jpg, .jpeg"
                        className="hidden" 
                    />
                </label>
            </div>

            <div className="mb-4 relative">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="backgroundPhoto">
                    Background photo  <span className="text-red-500">*</span>
                </label>
                <label htmlFor="backgroundPhoto" className="block cursor-pointer w-32 h-32 border border-gray-300 rounded-lg overflow-hidden">
                    {profileData.backgroundPhoto instanceof File && <img src={URL.createObjectURL(profileData.backgroundPhoto)} alt="Profile" className="w-full h-full object-cover" />}
                    {!(profileData.backgroundPhoto instanceof File) && <img src={backgroundPhotoURL} alt="Profile" className="w-full h-full object-cover" />}
                    {!profileData.backgroundPhoto && <span className="block text-center text-gray-400 mt-12">Upload photo</span>}
                    <input
                        type="file"
                        name="backgroundPhoto"
                        onChange={handleBackgroundPhotoChange}
                        id="backgroundPhoto"
                        accept=".png, .jpg, .jpeg"
                        className="hidden" 
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox text-blue-500"
                        checked={showAdditionalFields}
                        onChange={(e) => setShowAdditionalFields(e.target.checked)}
                    />
                    <span className="ml-2 text-white text-sm">Add more details</span>
                </label>
            </div>

            {showAdditionalFields && (
                <>

                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="dateOfBirth">
                            Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={profileData.dateOfBirth}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="dateOfBirth"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="gender">
                            Gender
                        </label>
                        <select
                            name="gender"
                            value={profileData.gender}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="gender"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="country">
                            Country
                        </label>
                        <input
                            type="text"
                            name="country"
                            value={profileData.country}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="country"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            name="city"
                            value={profileData.city}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="city"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="bio">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-none"
                            id="bio"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="favoriteCategories">
                            Favorite Categories
                        </label>
                        <input
                            type="text"
                            name="favoriteCategories"
                            value={profileData.favoriteCategories}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="favoriteCategories"
                        />
                    </div>
                </>
            )}

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Create Profile
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
