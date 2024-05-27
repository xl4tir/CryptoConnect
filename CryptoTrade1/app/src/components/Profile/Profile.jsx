import React, { useState, useEffect, useContext } from 'react';
import ReactModal from 'react-modal';
import ProfileInfo from './ProfileInfo';
import LatestPublications from './LatestPublications';
import ProfileForm from './ProfileForm';
import { fetchUserProfile, createUserProfile, updateUserProfile, deleteUserProfile } from '../../services/userProfileService';
import { TransactionContext } from '../../context/TransactionContext';

const Profile = () => {
    const { currentAccount } = useContext(TransactionContext);
    const [userProfile, setUserProfile] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPublication, setSelectedPublication] = useState(null);
    const [showCreateProfileModal, setShowCreateProfileModal] = useState(false);
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    useEffect(() => {
        const getUserProfile = async () => {
            try {
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
            getUserProfile();
        }
    }, [currentAccount]);
    const handleCreateProfile = async (profileData) => {
        try {
            const newProfile = await createUserProfile(profileData);
            setUserProfile(newProfile);
            setShowCreateProfileModal(false);
        } catch (error) {
            console.error('Error creating profile:', error);
        }
    };

    const handleEditProfile = async (profileData) => {
        try {
            const updatedProfile = await updateUserProfile(userAddress, profileData);
            setUserProfile(updatedProfile);
            setShowEditProfileModal(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleDeleteProfile = async () => {
        try {
            await deleteUserProfile(userAddress);
            setUserProfile(null);
            setShowCreateProfileModal(true);
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    const openModal = (publication) => {
        setSelectedPublication(publication);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPublication(null);
    };

    return (
        <div className="flex w-full justify-center items-center gradient-bg-welcome">
            {userProfile ? (
                <div className="flex w-full flex-col items-center">
                    <ProfileInfo userProfile={userProfile} onEdit={() => setShowEditProfileModal(true)} onDelete={handleDeleteProfile} />
                    <LatestPublications userProfile={userProfile} openModal={openModal} />
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
                                    className="w-full p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Write your comment here..."
                                />
                                <button
                                    className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                >
                                    Submit Comment
                                </button>
                            </div>
                        )}
                    </ReactModal>
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
