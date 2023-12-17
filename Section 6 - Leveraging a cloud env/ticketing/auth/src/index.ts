import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.listen(3000, () => {
	console.log('Listening on port', 3000);
	console.log('FOr build');
});
