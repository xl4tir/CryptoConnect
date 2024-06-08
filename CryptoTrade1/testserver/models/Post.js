const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    view_count: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
    reposts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    original_post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

module.exports = mongoose.model('Post', PostSchema);
