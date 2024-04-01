const express = require('express');
const router = express.Router(); // Corrected router initialization
const Events = require('../Models/Events.js')


router.post('/data', async (req, res) => {
    try {
        const { city_name, event_name, date, time,longitude,latitude } = req.body;
        
        await Events.create({
            event_name,
            city_name,
            date,
            time,
            latitude,
            longitude,
        });
        res.json({ success: true, message: "Event created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
