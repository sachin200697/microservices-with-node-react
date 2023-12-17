// supertest allows to fake our request to the express server
import request from 'supertest';
import { app } from '../../app';
import {} from 'jasmine';

it('return a 201 on successfull signup', async () => {
	return request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com', password: 'password' })
		.expect(201);
});
