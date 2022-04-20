// Import required mongoose properties to create schema
import { model, Schema, Document } from 'mongoose';

// Import bcrypt to encrypt password
import bcrypt from 'bcrypt';

// Export interface for user for auto completion
export interface UserInterface extends Document {
	role: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	creationDate: Date;
	lastSignOut: Date;
	enable: boolean;
	comparePassword: (password: string) => Promise<boolean>;
}

// Creates user schema
const userSchema = new Schema(
	{
		// Defines user role
		role: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			default: 'user',
		},
		// Defines user firstname
		firstname: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			minlength: 2,
			maxLength: 32,
		},
		// Defines user lastname
		lastname: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			minlength: 2,
			maxLength: 32,
		},
		// Defines user email
		email: {
			type: Schema.Types.String,
			required: true,
			index: { unique: true },
			trim: true,
			minlength: 4,
			maxLength: 124,
		},
		// Defines user password
		password: {
			type: Schema.Types.String,
			required: true,
			trim: true,
		},
		// Defines when the user was created
		creationDate: {
			type: Schema.Types.Date,
			required: true,
			default: Date.now(),
		},
		// Defines when the user last sign out
		lastSignOut: {
			type: Schema.Types.Date,
			required: false,
		},
		// Defines is the user is enabled or not
		enable: {
			type: Schema.Types.Boolean,
			required: true,
			default: true,
		},
	},
	// Defines in which collections users are going to be saved
	{ collection: 'Users' }
);

// Encrypt password before saving to database
userSchema.pre<UserInterface>('save', async function (next) {
	const user = this;
	if (!user.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	next();
});

// Compare if given password matches encrypted password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch ? isMatch : false;
};

// Export created schema as a mongoose model
export default model<UserInterface>('User', userSchema);
