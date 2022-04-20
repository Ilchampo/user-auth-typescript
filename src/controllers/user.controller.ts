// Import request and response from express
import { Request, Response } from 'express';

// Import helpers from lib
import helpers from '../lib/helpers';

// Import jsonwebtoken and config file
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Import User mongoose model
import User, { UserInterface } from '../models/user.model';

// Function to create a token
function createToken(user: UserInterface): string {
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

// Function to create a new admin user
export const CreateAdmin = async (req: Request, res: Response): Promise<Response> => {
	try {
		// Request and validates data from body
		const { firstname, lastname, email } = req.body;
		let user = await User.find({ email });
		if (user) {
			return res.status(400).json({ msg: 'User already exists', email });
		}
		const password = helpers.createRandomString(8);
		user = new User({ firstname, lastname, email, password });
		return res.status(200).json({ msg: 'New admin user created', email, password });
	} catch (err) {
		// If there was a server error
		console.log('Error at creating new admin user!', err);
		return res.status(500).json({ msg: 'Error at creating new admin user!', error: err });
	}
};

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
		const token = createToken(user);
		return res.status(200).json({ msg: 'User successfully signed up!', token });
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
			const token = createToken(user);
			return res.status(200).json({ token });
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

// Function to disable or enable an existing user
export const DisableOrEnable = async (req: Request, res: Response): Promise<Response> => {
	try {
		// Validates if the user id exists
		let user = await User.findById(req.params.id);
		if (!user) {
			// If there is no user found with id in params
			return res.status(400).json({ msg: 'No user registered with current id' });
		}
		// Disable or enable user depending on current enable value
		user.enable = !user.enable;
		await user.save();
		// Return success message and value
		return res.status(200).json({ msg: 'User successfully updated', value: user.enable });
	} catch (err) {
		// If there was a server error
		console.log('Error at user sign in!', err);
		return res.status(500).json({ msg: 'Error at user enable or disable!', error: err });
	}
};

// Function to change password as current user
export const ChangePassword = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { oldPassword, newPassword, confirmPassword } = req.body;
		// If one of the required fields are empty
		if (!oldPassword || !newPassword || !confirmPassword) {
			// Return error message
			return res.status(400).json({ msg: 'Please fill all the required fields!' });
		}
		const userId = helpers.getCurrentId(req.header('Authorization'));
		let user = await User.findById(userId);

		return res.status(200).json({ msg: 'Password changed successfully!' });
	} catch (err) {
		// If there was a server error
		console.log('Error at user sign in!', err);
		return res.status(500).json({ msg: 'Error at user enable or disable!', error: err });
	}
};

// Function to reset password of an existing user
