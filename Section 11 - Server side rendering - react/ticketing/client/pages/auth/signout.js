import Router from 'next/router';
import userRequest from '../../hooks/user-request';
import { useEffect } from 'react';

export default function SignOut() {
	const { doRequest } = userRequest({
		url: '/api/users/signout',
		method: 'post',
		body: {},
		onSuccess: () => Router.push('/'),
	});

	useEffect(() => {
		// we need to make signout call from client side only because
		// signout should clear the cookie from browser, and cookies will
		// be removed by auth api automatically if we call this api only
		// from browser
		// server side rendering will not work because it don't khow how
		// to deal with cookies
		doRequest();
	}, []);

	return <div>Signing you out.........</div>;
}
