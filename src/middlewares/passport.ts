// Import required methods from passport module
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';

// Import app config and user model
import config from '../config/config';
import User from '../models/user.model';

// Sets options for passport
const options: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.TOKEN.KEY,
};

// Exports as default new passport strategy for admin users
export default new Strategy(options, async (payload, done) => {
	try {
		// Looks for user in database with id from token
		const user = await User.findById(payload.id).lean();
		// If there is an user, continue
		if (user) return done(null, user);
		// If the conditions are not meet, the user is not authorized
		done(null, false);
	} catch (err) {
		// If there was a server error
		console.log('Error at user auth middleware', err);
	}
});
