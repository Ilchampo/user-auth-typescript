// Import required jsonwebtoken and passport modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import decoder from 'jwt-decode';

// Import app config
import config from '../config/config';

// Export interface for token payload
export interface TokenInterface {
	id: string;
	role: string;
}

// Function to authorize an admin via token
export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
	// Gets token from header
	const tokenHeader = req.header('Authorization');
	if (!tokenHeader) {
		// If there is no token in header
		return res.status(401).json({ msg: 'Access denied - No token header provided' });
	} else {
		// Splits string from token, only getting the token string and verifies it with token key
		const token = tokenHeader.split(' ')[1];
		const isTokenValid = jwt.verify(token, config.TOKEN.KEY);
		if (!isTokenValid) {
			// If the token is not valid with key
			return res.status(401).json({ msg: 'Access denied - Invalid Token' });
		}
		// Decodes token and saves the payload
		const payload = decoder<TokenInterface>(token);
		if (payload.role === 'admin') {
			// If the role is admin, middleware is successful
			next();
		} else {
			// Else return permission error
			return res.status(401).json({ msg: 'Access denied - Not enough permissions' });
		}
	}
};

// Function to authorize an user via token
export const userAuth = (req: Request, res: Response, next: NextFunction) => {
	// Gets token from header
	const tokenHeader = req.header('Authorization');
	if (!tokenHeader) {
		// If there is no token in header
		return res.status(401).json({ msg: 'Access denied - No token header provided' });
	} else {
		// Splits string from token, only getting the token string and verifies it with token key
		const token = tokenHeader.split(' ')[1];
		const isTokenValid = jwt.verify(token, config.TOKEN.KEY);
		if (!isTokenValid) {
			// If the token is not valid with key
			return res.status(401).json({ msg: 'Access denied - Invalid Token' });
		}
		// Decodes token and saves the payload
		const payload = decoder<TokenInterface>(token);
		if (payload.role === 'user') {
			// If the role is user, middleware is successful
			next();
		} else {
			// Else return permission error
			return res.status(401).json({ msg: 'Access denied - Not enough permissions' });
		}
	}
};
