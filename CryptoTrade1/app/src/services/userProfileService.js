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