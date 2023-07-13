const express = require('express');
const router = express.Router();
const axios = require('axios');
const apicache = require('apicache');
require('dotenv').config();

// ENV VAR
const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = process.env.API_KEY;

const cache = apicache.middleware;

let photoData;
 
router.get('/', (req, res) => {
    res.redirect('/photo');
});

router.get('/photo', cache('10 minutes'), async (req, res) => {
    try {
        const { date } = req.query;
        const selectedDate = date || '2020-10-14';
        const config = { params: { date: selectedDate, api_key: API_KEY } };

        const response = await axios.get(BASE_URL, config);

        if (response.status !== 200) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const isErrorStatus = response.data.error || false;
        if (isErrorStatus) {
            throw new Error(`API Error: ${response.data.error.message}`);
        }

        photoData = response.data;

        res.render('home');
    } catch (error) {
        console.error(error);
        console.error(error.message);
        console.error(error.stack);

        res.status(500).send('Internal Server Error');
    }
});


router.get('/getPhotoData', (req, res) => {
    res.json(photoData);
});

module.exports = router;
