After creating kubectl cluster in google cloud login with the same account in
docker.

Run kubectl get pods command and it will give a pod automatically created by
google cloud with the name auto-dep.-...

Install google cloud skd to interect with google context to connect local to
google

https://cloud.google.com/sdk/docs/quickstarts

## Commands

1. gcloud auth login // login with the same google account that used for cloud
2. gcloud init ->
   1. Choose crete new config (or reinitialize previous)
   2. select account
   3. See the list of projects but it can have different name instead of what
      you created inside google cloud because it used id instead of name. To get
      the name go to cloud account select project then you can use id there.
   4. Configure region and zone - Y
   5. Choose the same zone that you choose while creating kubernates cluster in
      cloud

We need to tell kubectl to connect to the context to connect to cloud cluster.

We have two options:

1. Don't want to run Docker at all?

   1. Close docker desktop
   2. gcloud components install kubectl
   3. gcloud container clusters get-credentials <cluster name>

2. still running docker

   1. Below command will create a context that we need to use to connect google
      cloud: gcloud container clusters get-credentials <cluster name> //here
      name is the name of cluster that created on cloud: ticketing-dev

      gcloud container clusters get-credentials ticketing-dev
      --location=us-central1

if by ever means you don't have a mac or you want to know how to switch between
context with command line:

kubectl config get-contexts

this command will show you the different contexts existing

kubectl config use-context $CONTEXT_NAME

replace the variable with your context name found previously and that it's

## kubectl contexts commands

https://kubernetes.io/docs/reference/kubectl/cheatsheet/#kubectl-context-and-configuratio

## steps to connect local kubectl and cloud:

1. Enable google cloud build
   1. Go to project -> Cloud builds -> Enable
2. Update skaffold.yml to use google cloud build
3. Change the image name inside auth-depl.yml file as well (same as
   skaffold.yml)
4. Setup ingress-nginx on our google cloud cluster

   1. kubernetes.github.io/ingress-nginx -> Deployment -> GCE-GKE
   2. kubectl create clusterrolebinding cluster-admin-binding --clusterrole
      cluster-admin --user "$(gcloud config get-value account)"

      If above command is giving error in that case we can create a yml file
      (cluster-binding.yml) and use kubectl apply -f cluster-binding.yml

   3. kubectl apply -f
      https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml
   4. It will create a load balancer in your clour account for current project

5. update our host file again to point to the remote cluster
   1. Open the load balancer create in above step in google cloud
   2. Copy IP: 34.136.49.55
   3. Update host file: c:\Windows\System32\Drivers\etc\
      update previous entry Entry: 34.136.49.55 ticketing.dev
6. Restart skaffold: run skaffold dev
7. Test: https://ticketing.dev/api/users/currentuser/

   Might need to type: thisisunsafe on broser

## Problem:

Unable to connect to the server: dial tcp 49.44.79.236:443: connectex: A
connection attempt failed because the connected party did not properly respond
after a period of time, or established connection failed because connected host
has failed to respond.

Solution:

https://techoverflow.net/2019/04/01/how-to-fix-kubectl-unable-to-connect-to-the-server-dial-tcp-443-i-o-timeout/

https://stackoverflow.com/questions/74718494/i-cant-access-my-github-raw-githubusercontent-com-files

https://developers.google.com/speed/public-dns/docs/using#change_your_dns_servers_settings

## Not able to see the cloud build history:

1. gcloud container clusters get-credentials <cluster-name> --region=us-central1
2. inside Cloud build history -> Settings -> Enable [Kubernetes engine, Compute
   engine, Service account]
3. Do some changes in code file
4. run: skaffold dev again

## Deleting google cloud cluster

Because it we run the cluster then it will charge for it, so it is better to
delete the cluster if not using it.

Console -> Project -> Kuberenetes Engine -> Clusters -> delete
