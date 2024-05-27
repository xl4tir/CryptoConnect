import React, { useState } from 'react';

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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(profileData);
    };

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
        </form>
    );
};

export default ProfileForm;
