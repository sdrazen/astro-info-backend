const globals = require('../../common/globals');
const env = require('dotenv').config();
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();
const https = require('https');

// Global variables
let collectionName = "";

// Database reference for chosen database type
let db = require('../../databases/mongodb/db-mongodb');

///////////
// API info
///////////

router.get('/mongodb/info', (req, res, next) => {
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

////////////////
// Flickr photos
////////////////

router.get('/mongodb/flickr', (req, res, next) => {
  
  let tags = req.query.tags;

  try {
    
    let api_key = globals.FLICKR_API_KEY;
    let method = 'flickr.photos.search';
    let per_page = '21'
    let tag_mode = 'all' // any = OR, all = AND

    https.get('https://api.flickr.com//services/rest/?format=json&sort=random&method=' + method + '&tags=' + tags + '&per_page=' + per_page + '&tag_mode=' + tag_mode + '&api_key=' + api_key + '&nojsoncallback=1', (resp) => {

      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res.status(200).send(data);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });    

  } catch (err) {
    console.log(err);

  } finally {

  }

})

////////////
// Nasa APOD
////////////

router.get('/mongodb/apod', (req, res, next) => {
  
  try {
    
    let api_key = globals.NASA_API_KEY;

    https.get('https://api.nasa.gov/planetary/apod?api_key=' + api_key, (resp) => {

      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res.status(200).send(data);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });    

  } catch (err) {
    console.log(err);

  } finally {

  }

})

///////////
// Nasa NEO
///////////

router.get('/mongodb/neo', (req, res, next) => {

  let start_date = req.query.start_date;
  let end_date = req.query.end_date;

  try {
    
    let api_key = globals.NASA_API_KEY;

    https.get('https://api.nasa.gov/neo/rest/v1/feed?start_date=' + start_date + '&end_date=' + end_date + '&api_key=' + api_key, (resp) => {

      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res.status(200).send(data);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });    

  } catch (err) {
    console.log(err);

  } finally {

  }

})

///////////////////
// Nasa NEO details
///////////////////

router.get('/mongodb/neodetails', (req, res, next) => {

  let id = req.query.id;
  
  try {
    
    let api_key = globals.NASA_API_KEY;

    https.get('https://api.nasa.gov/neo/rest/v1/neo/' + id + '?api_key=' + api_key, (resp) => {

      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res.status(200).send(data);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });    

  } catch (err) {
    console.log(err);

  } finally {

  }

})

//////////////////
// Google timezone
//////////////////

router.get('/mongodb/timezone', (req, res, next) => {

  let lat = req.query.lat;
  let lng = req.query.lng;
  let timestamp = req.query.timestamp;
  
  try {
    
    let api_key = globals.GOOGLE_MAPS_API_KEY;

    https.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + lat + ',' + lng + '&timestamp=' + timestamp.toString() + '&key=' + api_key, (resp) => {

      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res.status(200).send(data);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });    

  } catch (err) {
    console.log(err);

  } finally {

  }

})

//////
// ISS
//////

router.get('/mongodb/iss', (req, res, next) => {

  try {
    
    https.get('https://api.wheretheiss.at/v1/satellites/25544', (resp) => {

      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res.status(200).send(data);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });    

  } catch (err) {
    console.log(err);

  } finally {

  }

})

////////////
// Wikipedia
////////////

router.get('/mongodb/wikipedia', (req, res, next) => {

  let term = req.query.term;

  try {
    
    https.get(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=${term}&namespace=`, (resp) => {

      let data = '';

      // A chunk of data has been received.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        res.status(200).send(data);
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });    

  } catch (err) {
    console.log(err);

  } finally {

  }

})

//////
// GET
//////

// Retrieving dsos
router.get('/mongodb/dsos', async (req, res, next) => {
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
router.get('/mongodb/locations', async (req, res, next) => {
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

// Retrieving moonfeatures part one
router.get('/mongodb/moonfeatures1', async (req, res, next) => {
  collectionName = "moonfeatures";
  try {
    const cursor = db.collection(collectionName).find().limit(5000);
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

// Retrieving moonfeatures part two
router.get('/mongodb/moonfeatures2', async (req, res, next) => {
  collectionName = "moonfeatures";
  try {
    const cursor = db.collection(collectionName).find().skip(5000);
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
router.get('/mongodb/lunareclipses', async (req, res, next) => {
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
router.get('/mongodb/solareclipses', async (req, res, next) => {
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
router.get('/mongodb/stores', async (req, res, next) => {
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
router.post('/mongodb/location', async (req, res, next) => {
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
router.post('/mongodb/store', async (req, res, next) => {
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
router.delete('/mongodb/location/:id', async (req, res, next) => {
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
router.delete('/mongodb/store/:id', async (req, res, next) => {
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
router.put('/mongodb/location/:id', async (req, res, next) => {
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
router.put('/mongodb/store/:id', async (req, res, next) => {
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
