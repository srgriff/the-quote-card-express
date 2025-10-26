"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = 8080;

async function getRandomImage() {
    const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}`;
    try {
        const response = await fetch(endpoint);
        const returnedData = await response.json();
        console.log('API Response:', returnedData);
        const receivedPhotoUrl = returnedData.urls.regular;
        return receivedPhotoUrl;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

app.use(cors());
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/test', (req, res) => {
    res.json({ message: 'Server is working!' });
});

app.get("/api/v1/getRandomImage", async (request, response) => {
    response.status(200).json({
        status: 200,
        data: await getRandomImage(),
    });
});

app.get('/v1', async (req, res) => {
    const photoUrl = await getRandomImage();
    res.status(200).json({ url: photoUrl });
});

app.listen(port, () => {
    console.log(`Server is running http://localhost:8080`);
    console.log("Press Ctrl+C to end this process.");
});