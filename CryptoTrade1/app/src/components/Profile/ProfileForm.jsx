import React, { useState } from 'react';
import { getUserProfilePhotoURL } from '../../services/userProfileService';
import { FaCamera } from 'react-icons/fa';


const ProfileForm = ({ onSubmit, initialData, isEditing }) => {
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
        profilePhoto: "",
        backgroundPhoto: "",
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

    const inputStyles = " w-full rounded-md p-2 outline-none bg-blue-300/10 text-white border-transparent focus:ring-0 focus:border-white/20";
    const labelStyles = "text-white text-sm font-medium";


    const profilePhotoURL = getUserProfilePhotoURL(profileData.profilePhoto);

    const backgroundPhotoURL = getUserProfilePhotoURL(profileData.backgroundPhoto);

    return (
        <form onSubmit={handleSubmit} className=" ">
            <div className='flex flex-row gap-10'>
                <div className='max-w-xs w-full '>
                    <div className="mb-4">
                        <label className={labelStyles} htmlFor="name">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleChange}
                            className={inputStyles}
                            id="name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={labelStyles} htmlFor="username">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={profileData.username}
                            onChange={handleChange}
                            className={inputStyles}
                            id="username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={labelStyles} htmlFor="email">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleChange}
                            className={inputStyles}
                            id="email"
                            required
                        />
                    </div>



                    <div className="mt-10">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="size-4  mr-3 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:ring-offset-gray-900"
                                checked={showAdditionalFields}
                                onChange={(e) => setShowAdditionalFields(e.target.checked)}
                                onFocus={(e) => e.target.blur()}
                            />
                            <span className={labelStyles}>Add more details</span>
                        </label>
                    </div>
                </div>


                <div>
                    <div className="mb-4 flex flex-col items-center relative">
                        <label className={labelStyles} htmlFor="profilePhoto">
                            Profile photo
                        </label>
                        <label htmlFor="profilePhoto" className="block cursor-pointer mt-1 w-36 h-36 border border-white/30 rounded-full overflow-hidden relative">
                            {profileData.profilePhoto instanceof File ? (
                                <img src={URL.createObjectURL(profileData.profilePhoto)} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <img src={profilePhotoURL} alt="Profile" className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 pt-24 flex items-center justify-center ">
                                <FaCamera className="text-white text-2xl bg-black w-full py-1 h-8 bg-opacity-80" />
                            </div>
                            <input
                                type="file"
                                name="profilePhoto"
                                onChange={handleProfilePhotoChange}
                                id="profilePhoto"
                                accept=".png, .jpg, .jpeg, .webp"
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div className="mb-4 flex flex-col items-center relative">
                        <label className={labelStyles} htmlFor="backgroundPhoto">
                            Background photo
                        </label>
                        <label htmlFor="backgroundPhoto" className="block cursor-pointer mt-1 w-36 h-20 border border-white/30 rounded-lg overflow-hidden relative">
                            {profileData.backgroundPhoto instanceof File ? (
                                <img src={URL.createObjectURL(profileData.backgroundPhoto)} alt="Background" className="w-full h-full object-cover" />
                            ) : (
                                <img src={backgroundPhotoURL} alt="Background" className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 pt-12 flex items-center justify-center ">
                                <FaCamera className="text-white text-2xl bg-black w-full py-1 h-8 bg-opacity-80" />
                            </div>
                            <input
                                type="file"
                                name="backgroundPhoto"
                                onChange={handleBackgroundPhotoChange}
                                id="backgroundPhoto"
                                accept=".png, .jpg, .jpeg, .webp"
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            </div>



            {showAdditionalFields && (
                <>
                    <div className='flex flex-row gap-3'>
                        <div className='w-full'>
                            <div className="mb-4">
                                <label className={labelStyles} htmlFor="gender">
                                    Gender
                                </label>
                                <select
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleChange}
                                    className={inputStyles}
                                    id="gender"
                                >
                                    <option className=" text-white blue-glassmorphism-modalWindow" value="">Select Gender</option>
                                    <option className="text-white blue-glassmorphism-modalWindow" value="male">Male</option>
                                    <option className="text-white blue-glassmorphism-modalWindow" value="female">Female</option>
                                    <option className="text-white blue-glassmorphism-modalWindow" value="other">Other</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className={labelStyles} htmlFor="dateOfBirth">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={profileData.dateOfBirth}
                                    onChange={handleChange}
                                    className={inputStyles}
                                    id="dateOfBirth"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className={labelStyles} htmlFor="country">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={profileData.country}
                                    onChange={handleChange}
                                    className={inputStyles}
                                    id="country"
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className="mb-4">
                                <label className={labelStyles} htmlFor="city">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={profileData.city}
                                    onChange={handleChange}
                                    className={inputStyles}
                                    id="city"
                                />
                            </div>

                            <div className="mb-4">
                                <label className={labelStyles} htmlFor="favoriteCategories">
                                    Favorite Categories
                                </label>
                                <input
                                    type="text"
                                    name="favoriteCategories"
                                    value={profileData.favoriteCategories}
                                    onChange={handleChange}
                                    className={inputStyles}
                                    id="favoriteCategories"
                                />
                            </div>

                            <div className="mb-4">
                                <label className={labelStyles} htmlFor="bio">
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleChange}
                                    className={`${inputStyles} h-11`}
                                    id="bio"

                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className={`mt-4 p-3 w-full rounded-md bg-blue-700 hover:bg-blue-600 text-white`}
                >
                    {isEditing ? 'Edit Profile' : 'Create Profile'}
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
