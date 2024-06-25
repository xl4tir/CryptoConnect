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
const tokenRoutes = require('./routes/tokenRoutes');
const followRoutes = require('./routes/followRoutes');

const bodyParser = require('body-parser');
const { exec } = require('child_process')
const fs = require('fs');

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
app.use('/tokenimg', express.static('public/tokenimg'));
app.use('/api/tokens', tokenRoutes);
app.use('/api/follow', followRoutes);

app.use(bodyParser.json());

app.post('/api/forecast', (req, res) => {
    const data = req.body.data;
    console.log(data)
    // Збереження даних у файл
    fs.writeFile('data.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error('Error writing data to file:', err);
            res.status(500).send('Error saving data');
            return;
        }

        exec('python forecast.py', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error.message}`);
                res.status(500).send('Server Error');
                return;
            }
            if (stderr) {
                console.error(`Stderr: ${stderr}`);
                res.status(500).send('Server Error');
                return;
            }
            res.send(stdout);
        });
    });
});

//database connection
connection();



const port = process.env.PORT || 8061;
app.listen(port, () => console.log(`Listening on port ${port}...`));
