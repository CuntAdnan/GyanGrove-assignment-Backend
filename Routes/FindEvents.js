const express = require('express');
const router = express.Router();
const Events = require('../Models/Events.js');
const axios = require('axios');

//function to fetch weather
const getWeather = async (city_name, date) => {
    try {
        const url = `https://gg-backend-assignment.azurewebsites.net/api/Weather?code=KfQnTWHJbg1giyB_Q9Ih3Xu3L9QOBDTuU5zwqVikZepCAzFut3rqsg==&city=${city_name}&date=${date}`;
        const response = await axios.get(url);
        return response.data.weather;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

//function to calculate the distance using API...
const getDistance = async(lat1,long1,lat2,long2) =>{
    try {
        const url = `https://gg-backend-assignment.azurewebsites.net/api/Distance?code=IAKvV2EvJa6Z6dEIUqqd7yGAu7IZ8gaH-a0QO6btjRc1AzFu8Y3IcQ==&latitude1=${lat1}&longitude1=${long1}&latitude2=${lat2}&longitude2=${long2}`;
        const response = await axios.get(url);
        return response.data.distance;
    } catch (error) {
        console.error("Error fetching Distance data:", error);
        return null;
    }
}

// Function to chunk the array into smaller arrays of specified size
function chunkArray(arr, size) {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
        chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
}

router.get('/:latitude/:longitude/:date', async (req, res) => {
    try {
        const givenDate = req.params.date;
        const fourteenDaysFromNow = new Date(new Date(givenDate).setDate(new Date(givenDate).getDate() + 14));
        const fourteenDaysFromNowString = fourteenDaysFromNow.toISOString().split('T')[0];
        const givenDateObj = new Date(req.params.date);

        const events = await Events.find({
            date: { $gte: givenDate, $lte: fourteenDaysFromNowString }
        }).select('-_id -time');

        // Create an array of promises to fetch weather and distance data for each event
        const dataPromises = events.map(async (event) => {
            const [weather, distance] = await Promise.all([
                getWeather(event.city_name, event.date),
                getDistance(req.params.latitude, req.params.longitude, event.latitude, event.longitude)
            ]);
            return {
                event_name: event.event_name,
                city_name: event.city_name,
                date: event.date,
                weather: weather.summary, // Assuming 'summary' is the field in weather object
                distance_km: distance // Rename distance field to distance_km
            }; // Merge event data with weather and distance
        });

        // Wait for all weather and distance data to be fetched
        const eventsWithData = await Promise.all(dataPromises);

        // Sort eventsWithData array as needed
        const sortedEvents = eventsWithData.sort((a, b) => {
            const dateA = new Date(a.date).setHours(0, 0, 0, 0);
            const dateB = new Date(b.date).setHours(0, 0, 0, 0);

            if (dateA < givenDateObj) {
                return 1;
            }

            if (dateB < givenDateObj) {
                return -1;
            }

            if (dateA < dateB) {
                return -1;
            }

            if (dateA > dateB) {
                return 1;
            }

            return 0;
        });

        const pageSize = 10;

        // Chunk the sortedEvents array into smaller arrays of pageSize
        const chunks = chunkArray(sortedEvents, pageSize);

        const totalPages = chunks.length;

        // Create an object to hold all pages
        const allPages = {};

        // Assign each chunk to its respective page
        chunks.forEach((chunk, index) => {
            allPages[index + 1] = chunk;
        });

        res.json({
            total_pages: totalPages,
            events: allPages
        });

    } catch (err) {
        console.error('Error querying events:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});





module.exports = router;
