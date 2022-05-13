const { MongoClient } = require("mongodb");
require('dotenv').config();

// Replace the following with your Atlas connection string          
const url = process.env.DB_CONN;
const client = new MongoClient(url);
const dbName = "personalDB";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // use collection 
        const col = db.collection("testing");

        // convert collection items to array
        const items = await col.find().toArray();

        // Print this collection
        console.log(items);


    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);