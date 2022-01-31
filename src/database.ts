// Import mongoose module and loads config
import mongoose from 'mongoose';
import config from './config/config';

// Define mongoDB connection URI
mongoose.connect(config.MONGO.URI);

// Creates a new connection
const connection = mongoose.connection;

// If the database is opened
connection.once('open', () => {
	console.log('Mongodb connection established');
});

// If there was an error while connecting to database
connection.on('error', (err) => {
	console.log(`Mongodb connection error ${err}`);
	process.exit(0);
});
