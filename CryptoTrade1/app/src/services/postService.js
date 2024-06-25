import axios from 'axios';

const API_URL = 'http://localhost:8061/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Додавання нового посту
export const createPost = async (postData) => {
    try {
        const response = await api.post('/posts', postData);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

// Отримання всіх постів
export const getAllPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

// Отримання постів за символом криптовалюти
export const getPostsByCryptoSymbol = async (cryptoSymbol) => {
    try {
        const response = await api.get(`/posts/crypto/${cryptoSymbol}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts by crypto symbol:', error);
        throw error;
    }
};

// Отримання посту за ідентифікатором
export const getPostById = async (postId) => {
    try {
        const response = await api.get(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
};

// Оновлення посту
export const updatePost = async (postId, postData) => {
    try {
        const response = await api.put(`/posts/${postId}`, postData);
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

// Видалення посту
export const deletePost = async (postId) => {
    try {
        const response = await api.delete(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};

// Створення репосту
export const createRepost = async (postId, content) => {
    try {
        const response = await api.post(`/posts/${postId}/repost`, content);
        return response.data;
    } catch (error) {
        console.error('Error creating repost:', error);
        throw error;
    }
};

// Отримання всіх репостів для певного посту
export const getRepostsByPostId = async (postId) => {
    try {
        const response = await api.get(`/posts/${postId}/reposts`);
        return response.data;
    } catch (error) {
        console.error('Error fetching reposts:', error);
        throw error;
    }
};

// Отримання всіх репостів для певного користувача
export const getRepostsByUserId = async (userId) => {
    try {
        const response = await api.get(`/reposts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user reposts:', error);
        throw error;
    }
};


export const getPostsByUserId = async (userId) => {
    try {
        const response = await api.get(`/posts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;
    }
};