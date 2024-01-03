// creating this file to add bootstrap in the project
// we can only import bootstrap inside _app.js file

import 'bootstrap/dist/css/bootstrap.css';

export default ({ Component, pageProps }) => {
	// here Component is the Wrapper component by next js
	// and pageProps includes our component from pages filder
	return <Component {...pageProps} />;
};
