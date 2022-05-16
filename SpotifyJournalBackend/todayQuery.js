// utility Imports
const { msToHour } = require("./utility");
var bson = require("bson");
require('dotenv').config();

// Mongoose/MongoDB
const { MongoClient } = require("mongodb");
const url = process.env.DB_CONN;
const client = new MongoClient(url);
const dbName = "personalDB";

const todayQuery = async (userData) => {
    const userID = userData.body.id;

    try {
        await client.connect();
        // console.log("Connected correctly to MongoDB server");
        const db = client.db(dbName);

        // use collection
        const col = db.collection(userID, {
            timeseries: {
                timeField: "pastUTC",
                granularity: "hours",
            },
        });

        const currentDayStart = new Date(
            new Date().setHours(00, 00, 00)
        ).getTime();
        const roundedCurrentDayStart =
            currentDayStart - (currentDayStart % msToHour);
        const currentDayEnd = new Date(
            new Date().setHours(23, 59, 59)
        ).getTime();
        const roundedCurrentDayEnd = currentDayEnd - (currentDayEnd % msToHour);

        let test = await col.find({
            pastHourUnixTimeStamp: {
                $gte: roundedCurrentDayStart,
                $lte: roundedCurrentDayEnd,
            },
        });

        console.log(roundedCurrentDayStart);
        console.log(roundedCurrentDayEnd);

        console.log(await test.toArray());
    } catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }
};

