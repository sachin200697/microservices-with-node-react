// import express from 'express';
import express from 'express';
import { Request, Response } from 'express';

import { currentUser } from '../middleware/current-user';
import { requireAuth } from '../middleware/require-auth';

const router = express.Router();
router.get(
	'/api/users/currentuser',
	currentUser,
	requireAuth,
	(req: Request, res: Response) => {
		res.send({ currentUser: req.currentUser || null });
	},
);

export { router as currentUserRouter };
