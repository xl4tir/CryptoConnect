const { UserProfile } = require('../models/userProfile');
const { User } = require('../models/user');
const fs = require('fs');

const userProfileController = {
  getUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const userProfile = await UserProfile.findOne({ _id: userId });
      if (!userProfile) {
        return res.status(404).json({ message: 'Профіль користувача не знайдено' });
      }
      res.json(userProfile);
    } catch (error) {
      console.error('Помилка отримання профілю користувача:', error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },

  createUserProfile: async (req, res) => {
    try {
      const { userId, ...profileData } = req.body;
      let profilePhoto = '';
      let backgroundPhoto = '';

      if (req.file) {
        profilePhoto = req.file.path;
      }

      if (req.file2) {
        backgroundPhoto = req.file2.path;
      }

      const userProfile = await UserProfile.create({ _id: userId, ...profileData, profilePhoto, backgroundPhoto });

      await User.findOneAndUpdate({ _id: userId }, { profile: userProfile._id });

      res.status(201).json(userProfile);
    } catch (error) {
      console.error('Помилка створення профілю користувача:', error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const profileData = req.body;
      const userProfile = await UserProfile.findOneAndUpdate({ _id: userId }, profileData, { new: true });
      if (!userProfile) {
        return res.status(404).json({ message: 'Профіль користувача не знайдено' });
      }
      res.json(userProfile);
    } catch (error) {
      console.error('Помилка оновлення профілю користувача:', error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },

  deleteUserProfile: async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUserProfile = await UserProfile.findOneAndDelete({ _id: userId });
      if (!deletedUserProfile) {
        return res.status(404).json({ message: 'Профіль користувача не знайдено' });
      }
      res.json({ message: 'Профіль користувача успішно видалено' });
    } catch (error) {
      console.error('Помилка видалення профілю користувача:', error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },

  uploadProfilePhoto: async (req, res) => {
    try {
      const { userId } = req.params;
      const profile = await UserProfile.findOne({ _id: userId });
      if (!profile) {
        return res.status(404).json({ message: 'Профіль користувача не знайдено' });
      }
      const { path } = req.file;
      profile.profilePhoto = path;
      await profile.save();
      res.json({ profilePhoto: profile.profilePhoto });
    } catch (error) {
      console.error('Помилка завантаження фотографії профілю:', error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  },

  uploadBackgroundPhoto: async (req, res) => {
    try {
      const { userId } = req.params;
      const profile = await UserProfile.findOne({ _id: userId });
      if (!profile) {
        return res.status(404).json({ message: 'Профіль користувача не знайдено' });
      }
      const { path } = req.file;
      profile.backgroundPhoto = path;
      await profile.save();
      res.json({ backgroundPhoto: profile.backgroundPhoto });
    } catch (error) {
      console.error('Помилка завантаження фонового зображення:', error);
      res.status(500).json({ message: 'Внутрішня помилка сервера' });
    }
  }
};

module.exports = userProfileController;
