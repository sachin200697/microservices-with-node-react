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

## connect ECONNREFUSED 127.0.0.1:80 error

There are two scenario :

1. we call an api from a component (not server side rendering)

in this case, if we don't mention any host then network layer will automatically
add domain based on browser URL. and this call will be successfull.

2. We call an api from getInitialProps method (server side rendering):

in this case because we are not making this call from the broser, so this call
will be go from comtainer not the broser and it will be go inside the contianer
itself of client not to the backend pod and it will fail.

We can think that to reach to the auth service we cau use http://auth-srv/...
but in this case first we need to react out to ingress nginx then we can go to
auth service and we can use service name (like auth-srv) when both service are
in the same namespace.

kubectl get namespace : using this command we can check if client and auth
service in the same namespace or not but these are not in the same name space,
so we need to use different solution.

Solution: we need to somehow tell client to make this request via ingress ngnx.
and also need to send the cookie (if needed manually). Cookies will not be
shared automatically in case of server side rendering api call

http://NAME_OF_SERVICE.NAME_OF_NAMESPACE.svc.cluster.local

to get namespace: kubectl get namespace

to get services inside ingress-nginx: kubectl get services -n
<ingress-namespace>

ex:
http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser

Note: instead of remembering the above url, we can create a External name
service that will convert our given domain to above one.

## Error: Invalid <Link> with <a> child

In the upcoming lecture, we will be adding a Link to our Header. In Next.js v13,
using an <a> tag will cause an error:

Error: Invalid <Link> with <a> child. Please remove <a> or use
<Link legacyBehavior>.

Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor

To resolve this, we need to remove the <a> and move the className up to the Link
component:

<Link className="navbar-brand" href="/">
  GitTix
</Link>
