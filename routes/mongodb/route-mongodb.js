const globals = require('../../common/globals');
const env = require('dotenv').config();
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Global variables
let collectionName = "";

// Database reference for chosen database type
let db = require('../../databases/mongodb/db-mongodb');

// API info
router.get('/info', (req, res, next) => {
  try {
    const result = {host: globals.HOST, port: globals.PORT, databasetype: globals.DATABASE_TYPE, databasetypename: globals.DATABASE_TYPE_NAME, databasename: globals.DATABASE_NAME, collectionname: globals.COLLECTION_NAME};
    res.send(result);
  }
  catch (err) {
      console.log("There was an error getting API info: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }
});

//////
// GET
//////

// Retrieving dsos
router.get('/dsos', async (req, res, next) => {
  try {
    collectionName = "dsos";
    const cursor = db.collection(collectionName).find();
    // Print a message if no documents were found
    if ((await db.collection(collectionName).countDocuments() === 0)) {
        console.log("No documents found!");
    }
    // Print found documents
    const result = await cursor.toArray();
    res.send(result);
  }
  catch (err) {
      console.log("There was an error retrieving data: " + err);
      res.send({error: err});
  } 
  finally {
      // await client.close();
  }
});

// Retrieving locations
router.get('/locations', async (req, res, next) => {
  collectionName = "locations";
  try {
    const cursor = db.collection(collectionName).find();
    // Print a message if no documents were found
    if ((await db.collection(collectionName).countDocuments() === 0)) {
        console.log("No documents found!");
    }
    // Print found documents
    const result = await cursor.toArray();
    res.send(result);
  }
  catch (err) {
      console.log("There was an error retrieving data: " + err);
      res.send({error: err});
  } 
  finally {
      // await client.close();
  }
});

// Retrieving moonfeatures
router.get('/moonfeatures', async (req, res, next) => {
  collectionName = "moonfeatures";
  try {
    const cursor = db.collection(collectionName).find();
    // Print a message if no documents were found
    if ((await db.collection(collectionName).countDocuments() === 0)) {
        console.log("No documents found!");
    }
    // Print found documents
    const result = await cursor.toArray();
    res.send(result);
  }
  catch (err) {
      console.log("There was an error retrieving data: " + err);
      res.send({error: err});
  } 
  finally {
      // await client.close();
  }
});

// Retrieving lunareclipses
router.get('/lunareclipses', async (req, res, next) => {
  collectionName = "lunareclipses";
  try {
    const cursor = db.collection(collectionName).find();
    // Print a message if no documents were found
    if ((await db.collection(collectionName).countDocuments() === 0)) {
        console.log("No documents found!");
    }
    // Print found documents
    const result = await cursor.toArray();
    res.send(result);
  }
  catch (err) {
      console.log("There was an error retrieving data: " + err);
      res.send({error: err});
  } 
  finally {
      // await client.close();
  }
});

// Retrieving solareclipses
router.get('/solareclipses', async (req, res, next) => {
  collectionName = "solareclipses";
  try {
    const cursor = db.collection(collectionName).find();
    // Print a message if no documents were found
    if ((await db.collection(collectionName).countDocuments() === 0)) {
        console.log("No documents found!");
    }
    // Print found documents
    const result = await cursor.toArray();
    res.send(result);
  }
  catch (err) {
      console.log("There was an error retrieving data: " + err);
      res.send({error: err});
  } 
  finally {
      // await client.close();
  }
});

// Retrieving stores
router.get('/stores', async (req, res, next) => {
  collectionName = "stores";
  try {
    const cursor = db.collection(collectionName).find();
    // Print a message if no documents were found
    if ((await db.collection(collectionName).countDocuments() === 0)) {
        console.log("No documents found!");
    }
    // Print found documents
    const result = await cursor.toArray();
    res.send(result);
  }
  catch (err) {
      console.log("There was an error retrieving data: " + err);
      res.send({error: err});
  } 
  finally {
      // await client.close();
  }
});

///////
// POST
///////

// Add location
router.post('/location', async (req, res, next) => {
  collectionName = "locations";
  let newLocation = {"locationaddedbyemail": req.body.locationaddedbyemail, "locationcomment": req.body.locationcomment, "locationcountry": req.body.locationcountry, "locationmarker": {"markerlat": req.body.locationmarker.markerlat, "markerlng": req.body.locationmarker.markerlng}, "locationsqm": req.body.locationsqm};
  try {
    const result = await db.collection(collectionName).insertOne(newLocation);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send({_id: result.insertedId});
  }
  catch (err) {
      console.log("There was an error adding a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }
});

// Add store
router.post('/store', async (req, res, next) => {
  collectionName = "stores";
  let newStore = {"storeaddedbyemail": req.body.storeaddedbyemail, "storeaddress": req.body.storeaddress, "storecity": req.body.storecity, "storecomment": req.body.storecomment, "storecountry": req.body.storecountry, "storemarker": {"markerlat": req.body.storemarker.markerlat, "markerlng": req.body.storemarker.markerlng}, "storename": req.body.storename, "storepostalcode": req.body.storepostalcode};
  try {
    const result = await db.collection(collectionName).insertOne(newStore);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send({_id: result.insertedId});
  }
  catch (err) {
      console.log("There was an error adding a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }
});

/////////
// DELETE
/////////

// Delete location
router.delete('/location/:id', async (req, res, next) => {
  collectionName = "locations";
  let id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await db.collection(collectionName).deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      res.send({_id: id});
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      res.send({_id: ""});
    }
  } catch (err) {
      console.log("There was an error deleting a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }  
});

// Delete store
router.delete('/store/:id', async (req, res, next) => {
  collectionName = "stores";
  let id = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await db.collection(collectionName).deleteOne(query);
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      res.send({_id: id});
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      res.send({_id: ""});
    }
  } catch (err) {
      console.log("There was an error deleting a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }  
});

//////
// PUT
//////

// Update location
router.put('/location/:id', async (req, res, next) => {
  collectionName = "locations";
  let id = req.params.id;
  let updatedLocation = {"locationaddedbyemail": req.body.locationaddedbyemail, "locationcomment": req.body.locationcomment, "locationcountry": req.body.locationcountry, "locationmarker": {"markerlat": req.body.locationmarker.markerlat, "markerlng": req.body.locationmarker.markerlng}, "locationsqm": req.body.locationsqm};
  try {
    const query = { _id: new ObjectId(id) };
    const result = await db.collection(collectionName).replaceOne(query, updatedLocation);
    if (result.modifiedCount === 1) {
      console.log("Successfully updated one document.");
      res.send({_id: id});
    } else {
      console.log("No documents matched the query. Updated 0 documents.");
      res.send({_id: ""});
    }
  } 
  catch (err) {
      console.log("There was an error updating a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }  
});

// Update store
router.put('/store/:id', async (req, res, next) => {
  collectionName = "stores";
  let id = req.params.id;
  let updatedStore = {"storeaddedbyemail": req.body.storeaddedbyemail, "storeaddress": req.body.storeaddress, "storecity": req.body.storecity, "storecomment": req.body.storecomment, "storecountry": req.body.storecountry, "storemarker": {"markerlat": req.body.storemarker.markerlat, "markerlng": req.body.storemarker.markerlng}, "storename": req.body.storename, "storepostalcode": req.body.storepostalcode};
  try {
    const query = { _id: new ObjectId(id) };
    const result = await db.collection(collectionName).replaceOne(query, updatedStore);
    if (result.modifiedCount === 1) {
      console.log("Successfully updated one document.");
      res.send({_id: id});
    } else {
      console.log("No documents matched the query. Updated 0 documents.");
      res.send({_id: ""});
    }
  } 
  catch (err) {
      console.log("There was an error updating a document: " + err);
      res.send({error: err});
  } finally {
      // await client.close();
  }  
});

module.exports = router;
