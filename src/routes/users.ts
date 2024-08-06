import express from 'express';
//import { userAuth } from '../middlewares/checkAuth.mjs';

const router = express.Router();

import { registerUser } from '../controllers/users.js';

router.post('/register', registerUser);
//router.post('/login', login);
//router.delete('/:user_id', userAuth, delete_user);

export { router as userRoutes }; 