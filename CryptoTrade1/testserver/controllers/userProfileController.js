const { UserProfile } = require('../models/userProfile');
const fs = require('fs');


const userProfileController = {
  getUserProfile: async (req, res) => {
    try {
      const { userAddress } = req.params;
      const userProfile = await UserProfile.findOne({ userAddress });
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      res.json(userProfile);
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  createUserProfile: async (req, res) => {
    try {
      const { userAddress, ...profileData } = req.body;
      let profilePhoto = '';
      let backgroundPhoto = '';
      console.log(req.file)
      if (req.file) {
        profilePhoto = req.file.path;
      }
      console.log(req.file2)
      if (req.file2) {
        backgroundPhoto = req.file2.path;
      }

      const userProfile = await UserProfile.create({ userAddress, ...profileData, profilePhoto, backgroundPhoto });
      res.status(201).json(userProfile);
    } catch (error) {
      console.error('Error creating user profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const { userAddress } = req.params;
      const profileData = req.body;
      const userProfile = await UserProfile.findOneAndUpdate({ userAddress }, profileData, { new: true });
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      res.json(userProfile);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteUserProfile: async (req, res) => {
    try {
      const { userAddress } = req.params;
      const deletedUserProfile = await UserProfile.findOneAndDelete({ userAddress });
      if (!deletedUserProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      res.json({ message: 'User profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting user profile:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  uploadProfilePhoto: async (req, res) => {
    try {
      const { userAddress } = req.params;
      const profile = await UserProfile.findOne({ userAddress });
      if (!profile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      const { path } = req.file;
      profile.profilePhoto = path;
      await profile.save();
      res.json({ profilePhoto: profile.profilePhoto });
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  uploadBackgroundPhoto: async (req, res) => {
    try {
      const { userAddress } = req.params;
      const profile = await UserProfile.findOne({ userAddress });
      if (!profile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
      const { path } = req.file;
      profile.backgroundPhoto = path;
      await profile.save();
      res.json({ backgroundPhoto: profile.backgroundPhoto });
    } catch (error) {
      console.error('Error uploading background photo:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = userProfileController;
