// Import required modules
import { Router } from 'express';
import { adminAuth, userAuth } from '../middlewares/roles';
import passport from 'passport';

// Creates new router
const router = Router();

// Only admin users can access this route
router.get('/admin', passport.authenticate('jwt', { session: false }), adminAuth, (req, res) => {
	res.status(200).send('This is admin page');
});

// Only users can accesss this route
router.get('/user', passport.authenticate('jwt', { session: false }), userAuth, (req, res) => {
	res.status(200).send('This is user page');
});

// Any registered user can access this route
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send('This is all user page');
});

// Any client can access this route
router.get('/', (req, res) => {
	res.status(200).send('This is any client page');
});

// Exports router
export default router;
