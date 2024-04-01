const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.url);
        const db = mongoose.connection;
        const collection = db.collection("events");
        const data = await collection.find({}).toArray();
        console.log("connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB
