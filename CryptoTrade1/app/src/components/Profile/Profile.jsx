import React, { useState, useEffect, useContext } from 'react';
import ReactModal from 'react-modal';
import ProfileInfo from './ProfileInfo';
import ContentTabs from './ContentTabs';
import ProfileForm from './ProfileForm';
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, createUserProfile, updateUserProfile, deleteUserProfile, uploadProfilePhoto, uploadBackgroundPhoto } from '../../services/userProfileService';
import { TransactionContext } from '../../context/TransactionContext';
import AuthService from '../../services/AuthService';
import Loader from '../Loader';
import { Toaster, toast } from 'react-hot-toast';


const Profile = ({ user_id }) => {
    const { currentAccount } = useContext(TransactionContext);
    const [userProfile, setUserProfile] = useState(null);
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false); 
    const navigate = useNavigate();

    const handleGoIndex = () => {
        navigate('/');
    };

    useEffect(() => {
        const getCurrentUserProfile = async () => {
            try {
                const _currentUser = await AuthService.getCurrentUser();
                setCurrentUser(_currentUser.data);
                const profile = await fetchUserProfile(user_id);
                setUserProfile(profile);
                const _user = await AuthService.getUserById(user_id);
                setUser(_user)
                setIsOwner(_currentUser.data._id === user_id); 
                setIsLoading(false);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setIsEditing(false);
                    setIsLoading(false);
                    setShowCreateProfileModal(true);
                } else {
                    navigate('/');
                    console.error(error);
                }
            }
        };
        if (currentAccount) {
            getCurrentUserProfile();
        }
    }, [currentAccount, user_id, userProfile]);


    const closeModalCreateProfile = () => {
        setShowEditProfileModal(false);
        
      };

    const handleCreateProfile = async (profileData) => {
        try {
            const newProfileData = { ...profileData, userId: currentUser._id };
            const newProfile = await createUserProfile(newProfileData);
            setUserProfile(newProfile);
            let profilePhoto = newProfileData.profilePhoto;
            let backgroundPhoto = newProfileData.backgroundPhoto;

            if (profilePhoto) {
                await uploadProfilePhoto(currentUser._id, profilePhoto);
                const updatedProfile = await fetchUserProfile(currentUser._id);
                setUserProfile(updatedProfile);
            }

            if (backgroundPhoto) {
                await uploadBackgroundPhoto(currentUser._id, backgroundPhoto);
                const updatedProfile = await fetchUserProfile(currentUser._id);
                setUserProfile(updatedProfile);
            }

            toast.success('Profile created successfully!', {className: "blue-glassmorphism-toast"});
            setShowCreateProfileModal(false);
        } catch (error) {
            toast.error('Error creating profile.', {className: "blue-glassmorphism-toast"});
            console.error('Error creating profile:', error);
        }
    };

    const handleEditProfile = async (profileData) => {
        try {
            const { name, username, email, dateOfBirth, gender, country, city, bio, favoriteCategories } = profileData;
            const updatedProfile = await updateUserProfile(currentUser._id, { name, username, email, dateOfBirth, gender, country, city, bio, favoriteCategories });
            setUserProfile(updatedProfile);

            let profilePhoto = profileData.profilePhoto;
            let backgroundPhoto = profileData.backgroundPhoto;

            if (profilePhoto instanceof File || profilePhoto instanceof Blob) {
                await uploadProfilePhoto(currentUser._id, profilePhoto);
                const updatedProfile = await fetchUserProfile(currentUser._id);
                setUserProfile(updatedProfile);
            }

            if (backgroundPhoto instanceof File || backgroundPhoto instanceof Blob) {
                await uploadBackgroundPhoto(currentUser._id, backgroundPhoto);
                const updatedProfile = await fetchUserProfile(currentUser._id);
                setUserProfile(updatedProfile);
            }

            toast.success('Profile updated successfully!', {className: "blue-glassmorphism-toast"});
            setShowEditProfileModal(false);
        } catch (error) {
            toast.error('Error updating profile.', {className: "blue-glassmorphism-toast"});
            console.error('Error updating profile:', error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await deleteUserProfile(currentUser._id);
            setUserProfile(null);
            setShowCreateProfileModal(true);
            toast.success('Profile deleted successfully!', {className: "blue-glassmorphism-toast"});
        } catch (error) {
            toast.error('Error deleting profile.', {className: "blue-glassmorphism-toast"});
            console.error('Error deleting profile:', error);
        }
    };

    return (
        <div className="flex w-full justify-center items-center gradient-bg-welcome">
            <Toaster />
            {isLoading ? (
                <div className='flex justify-center items-center h-screen'>
                    <Loader />
                </div>
            ) : userProfile ? (
                <div className="max-w-screen-md flex w-full flex-col items-center">
                    <ProfileInfo
                        userProfile={userProfile}
                        onEdit={isOwner ? () => {
                            setIsEditing(true);
                            setShowEditProfileModal(true);
                        } : null}
                        onDelete={isOwner ? handleDeleteProfile : null}
                        isOwner={isOwner}
                    />
                    <div className='px-10'>
                        <ContentTabs user={user} currentUser={currentUser} />
                    </div>
                </div>
            ) : showCreateProfileModal ? (
                <ReactModal
                    isOpen={showCreateProfileModal}
                    onRequestClose={() => navigate('/sendto')}
                    contentLabel="Create Profile"
                    className=" overflow-auto max-h-none max-w-lg flex items-center blue-glassmorphism-modalWindow bg-opacity-100  p-8 mx-auto my-20 rounded-xl"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-75"
                >
                    <div className="flex flex-col w-full">
                        <div className='flex flex-row items-start justify-between'>
                            <h2 className="text-white text-xl font-semibold mb-6">Create Profile</h2>
                            <svg onClick={() => navigate('/')} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white"
                                className="size-7 cursor-pointer hover:opacity-70">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <ProfileForm onSubmit={handleCreateProfile} />
                    </div>
                </ReactModal>
            ) : (
                <div>Loading...</div>
            )}

            {showEditProfileModal && (
                <ReactModal
                    isOpen={showEditProfileModal}
                    onRequestClose={closeModalCreateProfile}
                    contentLabel="Edit Profile"
                    className=" overflow-auto z-50 max-h-none max-w-xl flex items-center blue-glassmorphism-modalWindow bg-opacity-100  p-8 mx-auto my-20 rounded-xl"
                    overlayClassName="fixed z-50 inset-0 bg-black bg-opacity-75"
                >
                    <div className="flex flex-col w-full ">
                        <div className='flex flex-row items-start justify-between'>
                            <h2 className="text-white text-xl font-semibold mb-6">Edit Profile</h2>
                            <svg onClick={closeModalCreateProfile} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white"
                                className="size-7 cursor-pointer hover:opacity-70">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <ProfileForm onSubmit={handleEditProfile} initialData={userProfile} isEditing={isEditing} />
                    </div>
                </ReactModal>
            )}
        </div>
    );
};

export default Profile;
