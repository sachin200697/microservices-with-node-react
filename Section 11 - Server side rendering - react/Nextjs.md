## Dependencies:

npm i react react-dom next

## Create a folder name pages inside client

this folder is special in next js as the file that we create in this folder can
be identify as routes based on their names.

index.js file will be used a root route in next js.

## Problem: inside container changes might not reflect immidately

we need to create a file name: next.config.js, and write below code in it:

module.exports = {

    webpackDevMiddleware: (config) => {
    	config.watchOptions.poll = 300; //pull all files in 300 milisecond
    	return config;
    },

};

but if you still not see your change then kill the pod, kubectl will start it
automatically.

Note: In the upcoming lecture, we will be creating a next.config.js file and
adding some configuration to it. The latest versions of Next.js use a newer
version of Webpack which moves watchOptions out from webpackDevMiddleware.

So, the next.config.js file should now look like this:

module.exports = {

    webpack: (config) => {

        config.watchOptions.poll = 300;

        return config;

    },

};

## A note about ECONNREFUSED errors

we will be moving the axios request from the getInitialProps function directly
to the LandingPage as part of an explanation. This will likely fail with a long
ECONNREFUSED error in your Skaffold output.

Node Alpine Docker images are now likely using the v16 version of Node, so, we
will again encounter a situation that will require a catch block.

Change this code in client/pages/index.js

const LandingPage = ({ currentUser }) => {

    console.log(currentUser);

    axios.get('/api/users/currentuser');

    return <h1>Landing Page</h1>;

};

to this:

const LandingPage = ({ currentUser }) => {

console.log(currentUser);

axios.get('/api/users/currentuser').catch((err) => {

    console.log(err.message);

});

return <h1>Landing Page</h1>;

};
