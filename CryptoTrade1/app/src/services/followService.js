import axios from 'axios';

const API_URL = 'http://localhost:8061/api/follow';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const followUser = async (userId) => {
  try {
    const response = await api.post(`/follow/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await api.post(`/unfollow/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};
