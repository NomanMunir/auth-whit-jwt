const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

env.config();

// Connect to DB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true , useUnifiedTopology: true}, () => console.log('Db Connected'));

// Middleware
app.use(express.json());

// Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

// Server 
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));


