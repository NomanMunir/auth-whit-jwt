const express = require('express');
const env = require('dotenv');
const app = express();

env.config();

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

// Server 
app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));


