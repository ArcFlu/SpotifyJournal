const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const client = new MongoClient(url);

const dbName = "personalDB";

async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // use collection 
        const col = db.collection("testing");
        
        // construct document
        let testDocument = {
            "name": { "first": "Aldrich", "last": "Agabin" },
            "birth": new Date(2002, 1, 15),    
            "bankAccount": -5000,
            "randomNum": Math.random(),                                                                                                             
        }

        // inserts the document and waits for a promise to read
        const p = await col.insertOne(testDocument);

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