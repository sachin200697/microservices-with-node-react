// because we are creating this file inside page/auth, so next will create
// a route automatically with /auth/signup

import { useState } from 'react';
import useRequest from '../../hooks/user-request';
import Router from 'next/router';

export default () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signin',
		method: 'post',
		body: { email, password },
		onSuccess: (data) => Router.push('/'),
	});
	const onSubmit = async (e) => {
		e.preventDefault();
		doRequest();
	};
	return (
		<form onSubmit={onSubmit}>
			<h1>Sing In</h1>
			<div className='form-group'>
				<label htmlFor='exampleInputEmail1'>Email address</label>
				<input
					className='form-control'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete='false'
				/>
			</div>
			<div className='form-group'>
				<label htmlFor='exampleInputEmail1'>Password</label>
				<input
					type='password'
					className='form-control'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{errors}

			<button className='btn btn-primary'>Sign In</button>
		</form>
	);
};
