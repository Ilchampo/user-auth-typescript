// Import required node modules
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';

// Import required local modules
import passportAuth from './middlewares/passport';
import authRoutes from './routes/auth.routes';
import privateRoutes from './routes/private.routes';

// Configures dotenv path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Creates express app
const app = express();

// Configures express app
app.set('port', process.env.PORT || 3000);

// Express app middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// Passport middlewares for authentication
passport.use(passportAuth);

// Express app routes
app.use('/auth', authRoutes);
app.use('/', privateRoutes);

// Exports express app
export default app;
