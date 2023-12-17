import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/DatabaseConnectionError';
import { RequestValidationError } from '../errors/RequestValidationError';

const router = express.Router();

router.post(
	'/api/users/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 and 20'),
	],
	(req: Request, res: Response) => {
		console.log('signup');
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array());
		}

		const { email, password } = req.body;
		throw new DatabaseConnectionError();

		res.send({ email, password });
	},
);

router.post('/api/users/me', (req, res) => {
	console.log('post');
	res.send('Post method');
});

export { router as signupRouter };
