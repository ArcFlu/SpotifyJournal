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

        // clear collection
        col.drop();

        // now we find one document 
        const myDocs = await col.find().toArray();

        // Print this
        console.log(myDocs);


    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);