## Problem

if we import mongoose in index.ts file it might give some error because of
typescript. err: implicitly has an 'any' type

To soleve it: npm i @types/mongoose

## Typescript and mongodb communication issue.

1. If we create a user then we have to tell explictly typescript about the
   properties that we pass to create user.
2. Because a User document inside mongodb can have aditional info like id, and
   other fields, so we also need to tell typescript these extra fields as well.

## unable to verify the first certificate

Postman -> Preferences/settings -> disable SSL certification

## if we don't see the cookie in postman

It might possible that we use middleware cookieSession after the middleware
singup router.

## Token

To get the token from cookie: https://www.base64decode.org/

To get the data from token: https://jwt.io/

## For jwt secret

Because it is sencetive data and we need to share it in all the pods, so we will
make it inside our cluster that holds our node and inside node all pods are
present.

kubectl create secret generic <secret-name> --from-literal=<key>=<value>

ex: kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf // here
secret-name = jwt-secret, we shall use it in auth-depl.yml file to tell the pod
about the secret value

kubectl get secrets

Note: If we use a secret that does not exist in our depl config file, then a pod
will be created but it will give CreateContainerConfigError status to debug it
we can use: kubectl describe <pod-id>

## override JSON.stringify

const obj = {name: 'sachin', toJSON() {return '1';}};

JSON.stringify(obj) //"1"
