require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db")
const authEthersRoutes = require('./routes/authEthers');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const userProfileRoutes = require('./routes/userProfileRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/CommentRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax',
        httpOnly: true
    } // 1 day
}));


app.use("/api/testlogin", authEthersRoutes);
app.use('/api/user', userProfileRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/reactions', reactionRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/transactions', transactionRoutes);

//database connection
connection();



const port = process.env.PORT || 8061;
app.listen(port, () => console.log(`Listening on port ${port}...`));
