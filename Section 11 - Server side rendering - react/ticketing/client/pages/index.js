import axios from 'axios';

const LandingPage = ({ color }) => {
	console.log('I am inside component with color:', color);
	return <div>Landing page 3</div>;
};

//	this method will be called by next js automatically
//		before rendering this component
// 	this method is for server side rendering, means it is on server and can
// 	fetch data on server
LandingPage.getInitialProps = () => {
	//this log will not be printed on browser as it is on server
	console.log('I am on server');
	return { color: 'red' };
};

export default LandingPage;
