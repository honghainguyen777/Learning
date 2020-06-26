const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'pizza';

MongoClient.connect(url, (err, client) => {
    // check if the error is null
    assert.equal(err, null);

    // if not
    console.log('Connected correctly to the server');
    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({"name": "Hai", "description": "a test"}, (err, result) => {
       assert.equal(err, null);
       
       console.log('After Insert:');
       console.log(result.ops);

       collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);

            console.log('Found:');
            console.log(docs);

            // delete the collection
            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);
                
                console.log("Connection is closed!");
                // close the connection to the database
                client.close();
            });
       });
    });
});