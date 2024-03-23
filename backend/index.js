const express = require('express');
const cors = require('cors');

const app = express();
require("dotenv").config()
const PORT = process.env.PORT ;

app.use(cors());
app.use(express.json());

app.use('/auth', authrouter);
app.use('/task', auth , taskrouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running on port ${PORT}`);
        console.log("Connected to mongodb")
        
    } catch (error) {
        console.log("error connecting to db")
        console.log(error)
    }
});
