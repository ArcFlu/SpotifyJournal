const { MongoClient } = require("mongodb");
var bson = require("bson");
require('dotenv').config();

// Replace the following with your Atlas connection string          
const url = process.env.DB_CONN;
const client = new MongoClient(url);
const dbName = "personalDB";

const insertRecent = async (itemList) => {
    try {
        await client.connect();
        // console.log("Connected correctly to MongoDB server");
        const db = client.db(dbName);


        // Calculate the time for the past hour, this gets rid of next day cases.
        const currentTime = Date.now();
        const pastHourTime = currentTime - 3_600_000;

        // use collection 
        todayDate = new Date(pastHourTime).toLocaleDateString("en-us");
        const col = db.collection(todayDate);

        // remove information
        let recentList = [];
        // let nameList = [];
        for (let item of itemList){
            // delete item.track.album.available_markets;
            // delete item.track.available_markets;
            recentList.push(item.track);
            // nameList.push(item.track.name);
        }
        
        let testDocument = {
            recentList,
            pastHourUTC: new Date(pastHourTime).getUTCHours(),
            pastUTC: pastHourTime,
            currentHourUTC: new Date(currentTime).getUTCHours(),
            currentUTC: currentTime,
        };
        

        // inserts the document and waits for a promise to read
        const p = await col.insertOne(testDocument);

        // now we find one document 
        const myDocs = await col.find(testDocument).toArray();

        // Print this
        // console.log("Finished inserting recent Spotify data for " + todayDate +"!");
        // console.log(nameList);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
};

exports.insertRecent = insertRecent;
