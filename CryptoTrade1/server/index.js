require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./db")
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/authh");
const profileRoutes = require("./routes/profile");
const portfolioRoutes = require('./routes/portfolio');
const transactionRoutes = require('./routes/transaction');
const authEthersRoutes = require('./routes/authEthers');


//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());


// routes
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/transactions', transactionRoutes);

app.use("/api/testlogin", authEthersRoutes);


const port = process.env.PORT || 8060;
app.listen(port, () =>console.log(`Listening on port ${port}...`));
