Copy blog-boilerplate from "section 2 - A Mini..."

cd posts

Create an image for posts: docker build -t sachin200697/posts:0.0.1

create a infra/k8s/posts.yml file

cd infra/k8s/ and run : kubectl apply -f posts.yml

---

## kubernates commands

1. kubectl apply -f [yaml-file-name]
2. kubectl get pods // it is equal to docker ps
3. kubectl exec -it [pod-name] [cmd] //it is equal to docker exec -it [container
   id] [cmd]
4. kubectl logs [pod-name] //it is equal to docker logs [container-id]
5. kubectl delete pod [pod-name]
6. kubectl describe pod [pod-name]

## Set alias

need to do it yourseld

## kubectl deployment

1. kubectl apply -f [yaml-file-name]
2. kubectl get deployments // it is equal to docker ps
3. kubectl delete deployment [deployment-name]
4. kubectl describe deployment [deployment-name]

Note: pods will be created by Deployment automatically as we define instructions
in config file. If we try to delete this automatically re-created pod then
Deployment will create it again.

## kubectl updte deployment or pods

1. First Method

Steps:

a. Make a change in index.js or any other file in posts

b. Create new image with new version no

c. Update posts-depl.yml file

d. apply change using: kubectl apply

2. Second Method: (prefered)

a. In posts-depl.yml file don't mention version of image or if you want to
mention then use latest

b. Make some changes in posts->index.js or any other file

c. Build an image : docker build -t sachin200697/posts //don't mention version

d. Push this image to dockerhub: docker push sachin200697/posts

e. Run command: kubectl rollout restart deployment [deployment-name]

## kubectl services

Types:

1. Cluster IP //use often //it is used to communication b/w diff pods
2. Node Port //used when we want to access pod from outside our cluster // used
   for development purpus
3. Load Balancer //use often //similar to Node Port means used to expose port to
   outside worlds
4. External Name
