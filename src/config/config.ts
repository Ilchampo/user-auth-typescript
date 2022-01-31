// Imports dotenv and configures path
import dotenv from 'dotenv';
import path from 'path';

// Configures dotenv path
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Exports as default
export default {
	// MongoDB attributes
	MONGO: {
		URI:
			process.env.MONGO_URI ||
			'yourmongodb_connectionURI',
		USER: process.env.MONGO_USER,
		PASSWORD: process.env.MONGO_PASSWORD,
	},
	// Jsonwebtoken attributes
	TOKEN: {
		KEY: process.env.TOKEN_KEY || 'thisisyourtokenkey',
		EXPIRE: process.env.TOKEN_EXPIRE || '1 hour',
	},
};
