const Comment = require('../models/comment');
const Post = require('../models/post');

// Додавання нового коментаря

exports.createComment = async (req, res) => {
    try {
        const user_id = req.session.userId;
        if (!user_id) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { post_id, content } = req.body;
        const newComment = new Comment({
            user_id,
            post_id,
            content
        });

        await newComment.save();

        // Оновлення посту додаванням посилання на коментар
        await Post.findByIdAndUpdate(
            post_id,
            { $push: { comments: newComment._id } },
            { new: true }
        );

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
};


exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('user_id').populate('reactions').populate('reposts');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// Отримання коментаря за ідентифікатором
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('user_id').populate('reactions').populate('reposts');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comment', error });
    }
};

// Отримання всіх коментарів за ідентифікатором посту
exports.getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ post_id: req.params.post_id })
            .populate({
                path: 'user_id',
                select: 'profile',
                populate: {
                    path: 'profile',
                    select: 'name username profilePhoto'
                }
            })
            .populate('reactions')
            .populate('reposts')
            .populate({
                path: 'post_id',
                select: '',
                populate: {
                    path: 'user_id',
                    select: 'profile',
                    populate: {
                        path: 'profile',
                        select: 'username'
                    }
                }
            })
            .sort({ created_at: -1 }); // Додано сортування за полем created_at у порядку спадання
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};

// Отримання всіх коментарів за ідентифікатором користувача
exports.getCommentsByUserId = async (req, res) => {
    try {
        const comments = await Comment.find({ user_id: req.params.user_id })
            .populate({
                path: 'user_id',
                select: 'profile',
                populate: {
                    path: 'profile',
                    select: 'name username profilePhoto'
                }
            })
            .populate('reactions')
            .populate('reposts')
            .populate({
                path: 'post_id',
                select: '',
                populate: {
                    path: 'user_id',
                    select: 'profile',
                    populate: {
                        path: 'profile',
                        select: 'username'
                    }
                }
            })
            .sort({ created_at: -1 }); // Додано сортування за полем created_at у порядку спадання
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error });
    }
};


// Оновлення коментаря
exports.updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { content },
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating comment', error });
    }
};

// Видалення коментаря
exports.deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting comment', error });
    }
};
