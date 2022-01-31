// Import express and methods from user controller
import { Router } from 'express';
import { SignIn, SignUp } from '../controllers/user.controller';

// Creates a new express router
const router = Router();

//  @route  POST /auth/signup
//  @desc   Sign up as a new user
//  @access Public
router.post('/signup', SignUp);

//  @route  POST /auth/signin
//  @desc   Sign in as an existing user
//  @access Public
router.post('/signin', SignIn);

// Exports express router
export default router;
