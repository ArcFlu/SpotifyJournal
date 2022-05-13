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
        console.log("Connected correctly to MongoDB server");
        const db = client.db(dbName);

        // use collection 
        todayDate = new Date().toLocaleDateString("en-us");
        const col = db.collection(todayDate);

        // remove information
        let recentList = [];
        let nameList = [];
        for (let item of itemList){
            delete item.track.album.available_markets;
            delete item.track.available_markets;
            recentList.push(item.track);
            nameList.push(item.track.name);
        }
        
        let testDocument = {
            recentList,
            nameList,
            createdDate: new Date(),
            thisHour: new Date().getHours() - 1,
        };
        

        // inserts the document and waits for a promise to read
        const p = await col.insertOne(testDocument);

        // now we find one document 
        const myDocs = await col.find(testDocument).toArray();

        // Print this
        console.log("Finished inserting recent Spotify data for " + todayDate +"!");
        console.log(nameList);

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
};

exports.insertRecent = insertRecent;
