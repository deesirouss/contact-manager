import pool from './db.js';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as controller from './db_controller.js';
import { jwtTokens } from './jwt/jwt-helpers.js';
// import { jwtTokens } from '../utils/jwt-helpers.js';

const authRouter = express.Router();

authRouter.post('/login', controller.userLogin);

authRouter.get('/refresh_token', controller.refreshToken);
authRouter.delete('/refresh_token', controller.deleteToken);

export default authRouter;