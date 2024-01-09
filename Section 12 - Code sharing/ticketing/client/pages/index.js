import axios from 'axios';
import buildClient from '../api/build-client';

const LandingPage = (props) => {
	console.log('I am inside component with color:', props);

	return (
		<div>
			{props.currentUser ? (
				<h1>User is signed in</h1>
			) : (
				<h1>User is not signed in</h1>
			)}
		</div>
	);
};

//	this method will be called by next js automatically
//		before rendering this component
// 	this method is for server side rendering, means it is on server and can
// 	fetch data on server
// remove example from getIitialPropsexmaple method to make it like getInitialProps
LandingPage.getInitialPropsexample = async ({ req }) => {
	// Note: when a getInitialProps api requests called on server
	// on server: reload page, type url in browser, cliek on link from different domain app
	// on client: when a link clicked from different page of same app
	//this log will not be printed on browser as it is on server

	console.log(req.headers);
	if (typeof window === 'undefined') {
		console.log('I am on server');
		const { data } = await axios.get(
			'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
			{
				headers: {
					//inside ingress-srv.yml service we only mention routing rules
					// for ticketing.dev, so we need to set below header to tell
					// ingress-nginx that this request is made for ticketing.dev
					Host: 'ticketing.dev',
					...req.headers, //req.headers also have host: ticketing.dev so we can user above line or can ignore it
				},
			},
		);
		return data;
	} else {
		// on client
		console.log('I am on client');
		const { data } = await axios.get('/api/users/currentuser');
		return data;
	}
	return {};
};

// we are doing similar this like LandingPage.getInitialPropsexample
// but here we are making it more simple
LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);
	const { data } = await client.get('/api/users/currentuser');
	return data;
};

export default LandingPage;
