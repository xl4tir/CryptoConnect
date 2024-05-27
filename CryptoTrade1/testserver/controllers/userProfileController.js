const { UserProfile } = require('../models/userProfile');

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
      const userProfile = await UserProfile.create({ userAddress, ...profileData });
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
  }
};

module.exports = userProfileController;
