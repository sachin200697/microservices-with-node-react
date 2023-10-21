## communication b/w different services

To achieve it we need to use ClusterIP service.

Create event-bus-srv in event-bus-depl.yml file. event-bus-srv sould be of
ClusterIP type.

Create posts-clusterip-srv in posts-depl.yml file. posts-clusterip-srv sould be
of ClusterIP type.

If we want to communication b/w:

posts --> event-buss then use like this: http://event-bus-srv:9005

event-buss --> posts then use: http://posts-clusterip-srv/9000

1. After chancning the services communation endpoints, re-build images
2. Push images
3. kubectl rollout restart deployment [deployment-name]
4. do step 3 for all deployments for which images changed

To see the file inside a pod:

kubectl exec -it [pods-name/tagged named] -- cat index.js

## issue: error connect to event-bus

Hi, I had the same issue, (I am using Docker-toolbox maybe it's related
somehow).

I've noticed that my index.js file in the posts container is not up to date (it
used localhost instead of event-bus-srv in the axios request) even though I
built the docker again, and did all the steps in the video.

you can check it by using "kubectl exec -it [containerID / tagged named] -- cat
index.js".

I think that maybe somehow the image is taken from the local machine instead of
the docker hub, and that makes the problem (I am not an expert, it's just a
guess).

I solved it by deleting the image from my local machine:

"docker images -a" - list all the images

take the image ID from posts repository.

"docker rmi -f <image ID> " - to delete the image.

then try to build the docker images, push to them docker hub, etc..

## apply all files together

kubectl apply -f .

## ingress nginx intallation

https://kubernetes.github.io/ingress-nginx/deploy/#quick-start

as I am using inbuild docker's kubernates so need to run below command:

kubectl apply -f
https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

## ingress documentation

https://kubernetes.io/docs/concepts/services-networking/ingress/

## Error

When running kubectl apply in the upcoming lecture, you may encounter a warning
or error about the v1beta1 API version that is being used.

The v1 Ingress API is now required as of Kubernetes v1.22 and the v1beta1 will
no longer work.

A few very minor changes are needed:

https://kubernetes.io/docs/concepts/services-networking/ingress/

1.  A pathType needs to be added

2.  How we specify the backend service name and port has changed

3.  The kubernetes.io/ingress.class annotation should be removed and replaced by
    the ingressClassName field under the spec:

4.  apiVersion: networking.k8s.io/v1
5.  kind: Ingress
6.  metadata:
7.  name: ingress-srv
8.  spec:
9.  ingressClassName: nginx
10. rules:
11.     - host: posts.com
12.       http:
13.        paths:
14.          - path: /posts
15.            pathType: ImplementationSpecific
16.            backend:
17.               service:
18.                 name: posts-clusterip-srv
19.                 port:
20.                   number: 4000

Cannot be used with pathType Prefix Warning: A few lectures from now, you may
eventually see a warning in your terminal:

Warning: path /posts/?{._}/comments cannot be used with pathType Prefix Warning:
path /?{._} cannot be used with pathType Prefix

This is not an error and only a warning and does not cause a failure of the
project. If you wish to suppress the warning and follow the latest guidance,
then, you can use the ImplementationSpecific pathType as explained in the
updated docs:

https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#strict-validate-path-type

So, for any path that makes use of a regex, you would use ImplementationSpecific
instead of Prefix.

eg:

          - path: /posts/?(.*)/comments
            pathType: ImplementationSpecific

## Important Note to Add Environment Variable

we are going to show the deployment of the React app to our Kubernetes cluster.
The React app will be running in a Docker container.

Unfortunately, create-react-app currently has two bugs that prevent it from
running correctly in a docker container:

https://github.com/facebook/create-react-app/issues/8688

https://github.com/facebook/create-react-app/issues/11779 To solve this, we have
to add two environment variables to the Dockerfile in the client folder. Find
the Dockerfile in the client folder and make the following change:

Docekr file:

FROM node:alpine

// Add the following lines

ENV CI=true

ENV WDS_SOCKET_PORT=0

# Change client app to request to posts.com instead of localhost:port

Because ingress cretaed a pod that will handle outside request and inside
request mapping, and we configure ingress to handle request at posts.com, so now
we need to change our UI to alwasy make request to posts.com

## Unique Route Path

Because ingress does not know about the post, get, and other methods, so we need
to make these routes unique to tell the ingress how to route them.

So need to change it in posts, client and the map the rulles in ingress yml file

## How do I set up a Kubernetes Ingress rule with a regex path?

https://stackoverflow.com/questions/40009640/how-do-i-set-up-a-kubernetes-ingress-rule-with-a-regex-path
