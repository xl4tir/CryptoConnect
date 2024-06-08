import axios from 'axios';

const API_URL = 'http://localhost:8061/api/comments';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Створення нового коментаря
export const createComment = async (commentData) => {
  try {
    const response = await api.post('/', commentData);
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error.response?.data || error.message);
    throw error;
  }
};

// Отримання всіх коментарів
export const getAllComments = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error.response?.data || error.message);
    throw error;
  }
};

// Отримання коментаря за ідентифікатором
export const getCommentById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comment:', error.response?.data || error.message);
    throw error;
  }
};

// Отримання всіх коментарів за ідентифікатором посту
export const getCommentsByPostId = async (postId) => {
  try {
    const response = await api.get(`/post/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments for post:', error.response?.data || error.message);
    throw error;
  }
};

// Отримання всіх коментарів за ідентифікатором користувача
export const getCommentsByUserId = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments for user:', error.response?.data || error.message);
    throw error;
  }
};

// Оновлення коментаря
export const updateComment = async (id, commentData) => {
  try {
    const response = await api.put(`/${id}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error.response?.data || error.message);
    throw error;
  }
};

// Видалення коментаря
export const deleteComment = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting comment:', error.response?.data || error.message);
    throw error;
  }
};
