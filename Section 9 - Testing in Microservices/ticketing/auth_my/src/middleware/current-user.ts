import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	id: string;
	email: string;
}

// by adding below code below error will be
// solved while doing req.currentUser = payload;
// Property 'currentUser' does not exist on type
declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.session?.jwt) {
		return next();
	}
	try {
		// telling ts what we shall get from jwt.verify
		// it is helpful to solve req.currentUser = payload problem below
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!,
		) as UserPayload;

		//Property 'currentUser' does not exist on type
		// to solve this error
		req.currentUser = payload;
	} catch (error) {}

	next();
};
