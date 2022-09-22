const env = require('dotenv').config();

// Server (unless serverless)
const SERVERLESS = false;
const HOST = "localhost";
const PORT = 8080;

// Database
const DATABASE_TYPE = 0 // 0 = MongoDb, 1 = SQLite3, 2 = MySQL, 3 = PostgreSQL
const DATABASE_TYPE_NAME = getDatabaseTypeName(DATABASE_TYPE);
const DATABASE_NAME = "astro-info-database";
const COLLECTION_NAME = "locations";

// MongoDb specific
const MONGODB_URI = process.env.MONGODB_URI; // <YOUR-MONGODB-URI-HERE>

// Flickr API key
const FLICKR_API_KEY = process.env.FLICKR_API_KEY; // <YOUR-FLICKR-API-KEY-HERE>

// NASA API key
const NASA_API_KEY = process.env.NASA_API_KEY; // <YOUR-NASA-API-KEY-HERE>

// Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY; // <YOUR-GOOGLE-MAPS-API-KEY-HERE>

// SQLite3 specific
const SQLITE_DB_LOCATION = "./databases/sqlite";

// MySQL specific
const MYSQL_HOST = "127.0.0.1";
const MYSQL_PORT = 3306;
const MYSQL_USER = "root";
const MYSQL_PASSWORD = "";

// PostgreSQL specific
const POSTGRESQLL_HOST = "127.0.0.1";
const POSTGRESQL_PORT = 5432;
const POSTGRESQL_USER = "postgres";
const POSTGRESQL_PASSWORD = "";

function getDatabaseTypeName(databaseType) {
  if (databaseType == 0) {
    return "MongoDb";
  } else if (databaseType == 1) {
    return "SQLite3";
  } else if (databaseType == 2) {
    return "MySQL";
  } else if (databaseType == 3) {
    return "PostgreSQL";
  }
}

module.exports = {
  SERVERLESS,
  HOST,
  PORT,
  DATABASE_TYPE,
  DATABASE_TYPE_NAME,
  DATABASE_NAME,
  COLLECTION_NAME,
  MONGODB_URI,
  FLICKR_API_KEY,
  NASA_API_KEY,
  GOOGLE_MAPS_API_KEY,
  SQLITE_DB_LOCATION,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  POSTGRESQLL_HOST,
  POSTGRESQL_PORT,
  POSTGRESQL_USER,
  POSTGRESQL_PASSWORD
}