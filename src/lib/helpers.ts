// Import jsonwebtoken and config file
import jwt, { decode } from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/config';

// Creates interface for token
export interface TokenInterface {
	id: string;
	role: string;
}

// Function to generate a random string based on size
export const createRandomString = (bytes: number): string => {
	const generatedString = crypto.randomBytes(bytes).toString('hex');
	return generatedString;
};

// Function to get current user ID
export const getCurrentId = (header: string): string => {
	const codedToken = header.split('')[1];
	const decodedToken = <TokenInterface>jwt.verify(codedToken, config.TOKEN.KEY);
	return decodedToken.id;
};

// Function to verify if a token is valid
export const validateToken = (token: string): boolean => {
	const isValid = jwt.verify(token, config.TOKEN.KEY);
	return isValid ? true : false;
};
