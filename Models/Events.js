const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    event_name: {
        type: String,
        required: true,
    },
    city_name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required:true
    },
    time: {
        type: String,
        required:true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Events', EventSchema);
