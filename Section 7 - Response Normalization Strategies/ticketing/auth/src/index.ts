import express from 'express';
import 'express-async-errors';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', () => {
	throw new NotFoundError();
});

//in case of async, instead of throwing an error
// we need to pass this to next function
// but if want to use it same like without async then we can install
// a new package express-async-errors
// app.all('*', async (req, res, next) => {
// 	next(new NotFoundError());
// });
app.all('*', async () => {
	throw new NotFoundError();
});

//this middleware will catch all thrown errors
app.use(errorHandler);

app.listen(3000, () => {
	console.log('Listening on port', 3000);
	console.log('For build');
});
