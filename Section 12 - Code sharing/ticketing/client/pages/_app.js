// creating this file to add bootstrap in the project
// we can only import bootstrap inside _app.js file

// we can also use this file to show common thing for all components for
// exmaple navigation bar

import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import React from 'react';

const AppComponent = ({ Component, pageProps, currentUser }) => {
	// here Component is the Wrapper component by next js
	// and pageProps includes our component from pages filder
	return (
		<React.Fragment>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</React.Fragment>
	);
};

//if we call getInitialProps in _app file means for AppComponent then
// other components getInitialProps will not be called
// to overcome from this issue we need to do some
AppComponent.getInitialProps = async (appContext) => {
	// this appContext object is different from the object of getInitialProps
	// for other components
	// AppComponent is inside _app.js file so it is app component
	// but for index.js or other component (page component) inside
	// page folder this object will have different properties
	const client = buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser');

	// calling getInitialProps method for page components like index.js file
	let pageProps = {}; //pageProps is same variable that we are using as props for AppComponent
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx);
	}

	console.log('app component', data);
	console.log('page props', pageProps);
	return {
		pageProps,
		...data,
	};
};

export default AppComponent;
