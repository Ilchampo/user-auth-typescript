// Import request and response from express
import { Request, Response } from 'express';

// Import jsonwebtoken and config file
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Import User mongoose model
import User, { UserInterface } from '../models/user.model';

// Function to create a token
function createToken(user: UserInterface) {
	// Creates new token with id and role
	const token = jwt.sign(
		{
			id: user._id,
			role: user.role,
		},
		// Configures key and expiration time
		config.TOKEN.KEY,
		{ expiresIn: config.TOKEN.EXPIRE }
	);
	// Returns token
	return token;
}

// Function to sign up as a user
export const SignUp = async (req: Request, res: Response): Promise<Response> => {
	try {
		// Request and validates data from body
		const { firstname, lastname, email, password } = req.body;
		if (!firstname || !lastname || !email || !password) {
			return res.status(400).json({ msg: 'Please complete all the required fields!' });
		}
		// Looks for an user with email in database
		let user = await User.findOne({ email });
		if (user) {
			// If there is already one, can't sign up with email
			return res.status(400).json({ msg: 'User already exists!' });
		}
		// Else creates a new user with data, saves and return message
		user = new User({ firstname, lastname, email, password });
		await user.save();
		return res
			.status(200)
			.json({ msg: 'User successfully signed up!', token: createToken(user) });
	} catch (err) {
		// If there was a server error
		console.log('Error at user sign up!', err);
		return res.status(500).json({ msg: 'Error at user sign up!', error: err });
	}
};

// Function to sign in as a user
export const SignIn = async (req: Request, res: Response): Promise<Response> => {
	try {
		// Request and validates data from body
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ msg: 'Please complete all the required fields!' });
		}
		// Looks for an user with email in database
		let user = await User.findOne({ email });
		if (!user) {
			// If there is no user registered with email
			return res.status(400).json({ msg: 'No user registered with that email' });
		}
		// Compares body password with encrypted password
		const isMatch = await user.comparePassword(password);
		if (isMatch) {
			// If they match, return token
			return res.status(200).json({ token: createToken(user) });
		} else {
			// If they don't match, return credentials error
			return res.status(400).json({ msg: 'Invalid user credentials' });
		}
	} catch (err) {
		// If there was a server error
		console.log('Error at user sign in!', err);
		return res.status(500).json({ msg: 'Error at user sign in!', error: err });
	}
};
