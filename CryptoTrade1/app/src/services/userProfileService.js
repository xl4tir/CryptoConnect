import axios from 'axios';

const API_URL = 'http://localhost:8061/api/user';


const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const fetchUserProfile = async (userAddress) => {
  try {
    const response = await api.get(`/profile/${userAddress}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getUserProfilePhotoURL = (profilePhoto) => {
  if (profilePhoto) {
    return `http://localhost:8061/${profilePhoto}`;
  }

  return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo212qSykd8WNfU7jgmwhEo14NG5J8JRjQlw&s';
};

export const createUserProfile = async (profileData) => {
  try {
    const response = await api.post('/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userAddress, profileData) => {
  try {
    const response = await api.put(`/profile/${userAddress}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const deleteUserProfile = async (userAddress) => {
  try {
    await api.delete(`/profile/${userAddress}`);
  } catch (error) {
    console.error('Error deleting user profile:', error);
    throw error;
  }
};

export const uploadProfilePhoto = async (userAddress, photo) => {
  try {
      const formData = new FormData();
      formData.append('photo', photo);
      console.log(photo)
      const response = await api.post(`/profile/photo/${userAddress}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error uploading profile photo:', error);
      throw error;
  }
};

export const uploadBackgroundPhoto = async (userAddress, background) => {
  try {
      const formData = new FormData();
      formData.append('background', background);

      const response = await api.post(`/profile/background/${userAddress}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error uploading background photo:', error);
      throw error;
  }
};