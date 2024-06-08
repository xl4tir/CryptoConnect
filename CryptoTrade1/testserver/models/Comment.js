const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    content: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reaction' }],
    comments: [this],
    reposts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]  
});

module.exports = mongoose.model('Comment', CommentSchema);
