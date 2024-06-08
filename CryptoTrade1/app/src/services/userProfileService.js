import axios from 'axios';

const API_URL = 'http://localhost:8061/api/user';


const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const fetchUserProfile = async (userId) => {
  try {
    const response = await api.get(`/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Помилка отримання профілю користувача:', error);
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
    console.error('Помилка створення профілю користувача:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/profile/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Помилка оновлення профілю користувача:', error);
    throw error;
  }
};

export const deleteUserProfile = async (userId) => {
  try {
    await api.delete(`/profile/${userId}`);
  } catch (error) {
    console.error('Помилка видалення профілю користувача:', error);
    throw error;
  }
};

export const uploadProfilePhoto = async (userId, photo) => {
  try {
      const formData = new FormData();
      formData.append('photo', photo);

      const response = await api.post(`/profile/photo/${userId}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Помилка завантаження фотографії профілю:', error);
      throw error;
  }
};

export const uploadBackgroundPhoto = async (userId, background) => {
  try {
      const formData = new FormData();
      formData.append('background', background);

      const response = await api.post(`/profile/background/${userId}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      return response.data;
  } catch (error) {
      console.error('Помилка завантаження фонового зображення:', error);
      throw error;
  }
};
