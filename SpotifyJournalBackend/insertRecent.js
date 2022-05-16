const { MongoClient } = require("mongodb");
var bson = require("bson");
const { Cursor } = require("mongoose");
const { msToHour } = require("./utility");
require('dotenv').config();
const currentHourTime = require('./utility').currentHourTime;
const pastHourTime = require('./utility').pastHourTime;
const unixTimestamp = require('./utility').unixTimestamp;


// Replace the following with your Atlas connection string          
const url = process.env.DB_CONN;
const client = new MongoClient(url);
const dbName = "personalDB";


const insertRecent = async (itemList, userData) => {
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
            }
        });

        // remove market information
        let recentList = [];
        for (let item of itemList){
            delete item.track.album.available_markets;
            delete item.track.available_markets;
            recentList.push(item.track);
        }
        
        let testDocument = {
            recentList,
            pastHourUTC: new Date(pastHourTime).getUTCHours(),
            currentHourUTC: new Date(currentHourTime).getUTCHours(),
            pastHourUnixTimeStamp: pastHourTime,
            currentHourUnixTimeStamp: currentHourTime,
            createdUnixTimestamp: unixTimestamp,
        };
        
        // inserts the document and waits for a promise to read
        const p = await col.insertOne(testDocument);
        // const f = await col.findOne(testDocument);
        // console.log(f);
        
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
};

exports.insertRecent = insertRecent;
