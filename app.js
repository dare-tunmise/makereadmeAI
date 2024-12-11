const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.send("we're live!")
})


app.listen(port, ()=> {
    console.log(`app is listening at http;//localhost:${port}`);
})