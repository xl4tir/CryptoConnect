const { UserProfile } = require('../models/userProfile');
const { User } = require('../models/user');

const followController = {
  followUser: async (req, res) => {
    try {
      const currentUserId = req.session.userId;
      const userIdToFollow = req.params.id;

      const currentUser = await User.findById(currentUserId).populate('profile');
      const userToFollow = await UserProfile.findById(userIdToFollow);

      if (!userToFollow.followers.includes(currentUser.profile._id)) {
        userToFollow.followers.push(currentUser.profile._id);
        currentUser.profile.following.push(userIdToFollow);

        await userToFollow.save();
        await currentUser.profile.save();

        res.status(200).json({ message: 'User followed successfully.' });
      } else {
        res.status(400).json({ message: 'You are already following this user.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  unfollowUser: async (req, res) => {
    try {
      const currentUserId = req.session.userId;
      const userIdToUnfollow = req.params.id;

      const currentUser = await User.findById(currentUserId).populate('profile');
      const userToUnfollow = await UserProfile.findById(userIdToUnfollow);

      if (userToUnfollow.followers.includes(currentUser.profile._id)) {
        userToUnfollow.followers.pull(currentUser.profile._id);
        currentUser.profile.following.pull(userIdToUnfollow);

        await userToUnfollow.save();
        await currentUser.profile.save();

        res.status(200).json({ message: 'User unfollowed successfully.' });
      } else {
        res.status(400).json({ message: 'You are not following this user.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = followController;
