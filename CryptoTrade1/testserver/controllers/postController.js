const Post = require('../models/post');

// Додавання нового посту
exports.createPost = async (req, res) => {
    try {
        const userId = req.session.userId;
        const { content, crypto_symbol } = req.body;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const newPost = new Post({
            user_id: userId,
            content,
            crypto_symbol: crypto_symbol || '',
            created_at: new Date(),
        });

        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate({
            path: 'user_id',
            populate: {
                path: 'profile',
                model: 'UserProfile'
            }
        }).populate({
            path: 'original_post',
            model: 'Post',
            populate: [
                {
                    path: 'user_id',
                    model: 'User',
                    populate: {
                        path: 'profile',
                        model: 'UserProfile'
                    }
                },
                {
                    path: 'comments',
                    model: 'Comment'
                },
                {
                    path: 'reactions',
                    model: 'Reaction'
                }
            ]
        });

        console.log(posts[0])
        res.json(posts);
    } catch (error) {
        console.error('Error getting posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




// Отримання посту за ідентифікатором
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate({
            path: 'user_id',
            populate: {
                path: 'profile',
                model: 'UserProfile'
            }
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Error getting post by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Оновлення посту
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.findByIdAndUpdate(req.params.id, { content }, { new: true });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Видалення посту
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.createRepost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const user_id = req.session.userId;

        // Знаходимо оригінальний пост
        const originalPost = await Post.findById(postId);
        if (!originalPost) {
            return res.status(404).json({ error: 'Original post not found' });
        }

        const repost = new Post({
            user_id,
            content: content || "none",
            original_post: originalPost._id // Зберігаємо посилання на оригінальний пост
        });

        await repost.save();

        // Додаємо репост до оригінального поста
        originalPost.reposts.push(repost._id);
        await originalPost.save();

        res.status(201).json(repost);
    } catch (error) {
        console.error('Error creating repost:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// Отримання всіх репостів для певного поста
exports.getRepostsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId)
            .populate({
                path: 'reposts',
                populate: {
                    path: 'user_id',
                    model: 'User',
                    populate: {
                        path: 'profile',
                        model: 'UserProfile',
                        select: 'username profilePhoto'
                    }
                }
            });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post.reposts);
    } catch (error) {
        console.error('Error getting reposts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getRepostsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Знаходимо всі репости, зроблені користувачем
        const posts = await Post.find({ reposted_by: userId }).populate('reposts');
        res.json(posts);
    } catch (error) {
        console.error('Error getting reposts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getPostsAndRepostsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        // Знаходимо всі пости, зроблені користувачем
        const userPosts = await Post.find({ user_id: userId }).populate('user_id');

        // Знаходимо всі репости, зроблені користувачем, з інформацією про оригінальний пост
        const userReposts = await Post.find({ reposted_by: userId })
            .populate('user_id')
            .populate({
                path: 'reposts',
                populate: {
                    path: 'user_id',
                    model: 'User'
                }
            })
            .populate('reposts'); // Populate для отримання всіх полів оригінального посту

        // Об'єднуємо результати
        const allPostsAndReposts = [...userPosts, ...userReposts];

        res.json(allPostsAndReposts);
    } catch (error) {
        console.error('Error getting posts and reposts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getPostsByUserId = async (req, res) => {
    try {
        const posts = await Post.find({ user_id: req.params.userId })
            .populate({
                path: 'user_id',
                populate: {
                    path: 'profile',
                    model: 'UserProfile',
                    select: '_id name username profilePhoto'
                }
            })
            .populate({
                path: 'original_post',
                model: 'Post',
                populate: [
                    {
                        path: 'user_id',
                        model: 'User',
                        populate: {
                            path: 'profile',
                            model: 'UserProfile',
                            select: '_id name username profilePhoto'
                        }
                    },
                    {
                        path: 'comments',
                        model: 'Comment'
                    },
                    {
                        path: 'reactions',
                        model: 'Reaction'
                    }
                ]
            })
            .sort({ created_at: -1 }); // Сортування за спаданням за датою
        res.json(posts);
    } catch (error) {
        console.error('Error fetching user posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getPostsByCryptoSymbol = async (req, res) => {
    try {
        const { crypto_symbol } = req.params;
        const posts = await Post.find({ crypto_symbol })
            .populate({
                path: 'user_id',
                populate: {
                    path: 'profile',
                    model: 'UserProfile',
                    select: '_id name username profilePhoto'
                }
            })
            .populate({
                path: 'original_post',
                model: 'Post',
                populate: [
                    {
                        path: 'user_id',
                        model: 'User',
                        populate: {
                            path: 'profile',
                            model: 'UserProfile',
                            select: '_id name username profilePhoto'
                        }
                    },
                    {
                        path: 'comments',
                        model: 'Comment'
                    },
                    {
                        path: 'reactions',
                        model: 'Reaction'
                    }
                ]
            })
            .sort({ created_at: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.incrementViewCount = async (req, res, next) => {
    try {
        const postId = req.params.id;
        await Post.findByIdAndUpdate(postId, { $inc: { view_count: 0.5 } });
        next();
    } catch (error) {
        console.error('Error incrementing view count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};