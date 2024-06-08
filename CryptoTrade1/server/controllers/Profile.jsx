import React, { useState, useEffect, useContext } from 'react';
import ReactModal from 'react-modal';
import ProfileInfo from './ProfileInfo';
import ContentTabs from './ContentTabs';
import ProfileForm from './ProfileForm';
import { fetchUserProfile, createUserProfile, updateUserProfile, deleteUserProfile, uploadProfilePhoto, uploadBackgroundPhoto } from '../../services/userProfileService';
import { TransactionContext } from '../../context/TransactionContext';
import AuthService from '../../services/AuthService';

const Profile = () => {
    const { currentAccount } = useContext(TransactionContext);
    const [userProfile, setUserProfile] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    useEffect(() => {
        const getCurrentUserProfile = async () => {
            try {
                const user = await AuthService.getCurrentUser();
                setCurrentUser(user.data);
                console.log(currentUser._id)
                const profile = await fetchUserProfile(currentAccount);
                setUserProfile(profile);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setShowCreateProfileModal(true);
                } else {
                    console.error(error);
                }
            }
        };
        if (currentAccount) {
            getCurrentUserProfile();
        }
    }, [currentAccount, currentUser]);

    const handleCreateProfile = async (profileData) => {
        try {
            const newProfileData = { ...profileData, userAddress: currentAccount };
            const newProfile = await createUserProfile(newProfileData);
            setUserProfile(newProfile);
            let profilePhoto = newProfileData.profilePhoto;
            let backgroundPhoto = newProfileData.backgroundPhoto;

            if (profilePhoto) {
                await uploadProfilePhoto(currentAccount, profilePhoto);
                const updatedProfile = await fetchUserProfile(currentAccount);
                setUserProfile(updatedProfile);
            }

            if (backgroundPhoto) {
                await uploadBackgroundPhoto(currentAccount, backgroundPhoto);
                const updatedProfile = await fetchUserProfile(currentAccount);
                setUserProfile(updatedProfile);
            }

            setShowCreateProfileModal(false);
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

    const handleEditProfile = async (profileData) => {
        try {
            const { name, username, email, dateOfBirth, gender, country, city, bio, favoriteCategories } = profileData;
            const updatedProfile = await updateUserProfile(currentAccount, { name, username, email, dateOfBirth, gender, country, city, bio, favoriteCategories });
            setUserProfile(updatedProfile);

            let profilePhoto = profileData.profilePhoto;
            let backgroundPhoto = profileData.backgroundPhoto;

            if (profilePhoto instanceof File || profilePhoto instanceof Blob) {
                await uploadProfilePhoto(currentAccount, profilePhoto);
                const updatedProfile = await fetchUserProfile(currentAccount);
                setUserProfile(updatedProfile);
            }

            if (backgroundPhoto instanceof File || backgroundPhoto instanceof Blob) {
                await uploadBackgroundPhoto(currentAccount, backgroundPhoto);
                const updatedProfile = await fetchUserProfile(currentAccount);
                setUserProfile(updatedProfile);
            }

            setShowEditProfileModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await deleteUserProfile(currentAccount);
            setUserProfile(null);
            setShowCreateProfileModal(true);
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    return (
        <div className="flex w-full justify-center items-center gradient-bg-welcome">
            {userProfile ? (
                <div className="max-w-screen-lg flex w-full flex-col items-center">
                    <ProfileInfo userProfile={userProfile} onEdit={() => setShowEditProfileModal(true)} onDelete={handleDeleteProfile} />
                    <div className='px-10'>
                        <ContentTabs userId={currentUser._id} />
                    </div>

                </div>
            ) : showCreateProfileModal ? (
                <ReactModal
                    isOpen={showCreateProfileModal}
                    onRequestClose={() => setShowCreateProfileModal(false)}
                    contentLabel="Create Profile"
                    className="max-w-screen-lg flex items-center bg-gray-800 bg-opacity-80 w-full p-8 mx-auto my-20 rounded-xl"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-75"
                >
                    <div className="flex flex-col w-full">
                        <h2 className="text-white text-2xl font-semibold mb-4">Create Profile</h2>
                        <p className="text-white mb-4">User Address: {currentAccount}</p>
                        <ProfileForm onSubmit={handleCreateProfile} />
                    </div>
                </ReactModal>
            ) : (
                <div>Loading...</div>
            )}

            {showEditProfileModal && (
                <ReactModal
                    isOpen={showEditProfileModal}
                    onRequestClose={() => setShowEditProfileModal(false)}
                    contentLabel="Edit Profile"
                    className="max-w-screen-lg flex items-center bg-gray-800 bg-opacity-80 w-full p-8 mx-auto my-20 rounded-xl"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-75"
                >
                    <div className="flex flex-col w-full">
                        <h2 className="text-white text-2xl font-semibold mb-4">Edit Profile</h2>
                        <ProfileForm onSubmit={handleEditProfile} initialData={userProfile} />
                    </div>
                </ReactModal>
            )}
        </div>
    );
};

export default Profile;
