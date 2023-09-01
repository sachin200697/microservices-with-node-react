## Docker commands

1. docker run <image-name>
2. docker run -it <image-name>
3. docker run <image-name> echo hollo there //echo is command that takes a work
   of sentence to print
4. docker create <image-name> // to create container form an image
5. docker start -a <container-id> // to run a container (stoped or newly
   created). -a option is to show the output
6. docker system prune // to remove the containers
7. docker logs <container-id>
8. docker stop <container-id> //can take some time to save the fs and do
   something, docker automaticall call kill command if stop command does not
   stop container in 10 seconds
9. docker kill <container-id> //stop as quickly as it can without saving the
   work and fs

some examples: if we have redis install locally then we can use redis-server to
run the redis server and can use redis-cli to type some commands of redis. We
can use set mynumber 2 to set a mynumber in redis and to get it: get mynumber.

But in docker container we can run it like this: #> docker run redis

if we open a send terminal and try to run redis-cli then it will not work
because redis is running inside a container and if we open the new terminal then
it is not in that container, so we can not use redis-cli.

To solve it we can run below command for an already running container:

#> docker exec -it <container-id> <command> //exec is to run another command and
it is to provide a direct input to the container.

ex: #> docker run redis #> docker exec -it <container-id> redis-cli

-it flag is made of two flags:

-i = to tell whatever input giving it should interact with the containers
(STDIN, STDOUT, STDERR) -t = to format the output in beautiful representation

We can use: #> docker exec -i -t <container-id> redis-cli

10. docker exec -it <container-id> redis-cli
11. docker exec -i -t <container-id> redis-cli // we can use -i -t or -it
12. docker exec -i <container-id> redis-cli //without -t flag to see how the
    output looks now

13. docker exec -it <container-id> sh //to open a terminal in the container, so
    that we can run commands inside container //to stop container we can use
    ctr+c, or ctr+d or d //sh(it is a program) is a command processor or shell,
    other option are bash, powershell, zsh
14. docker run -it <image-name> sh //to get terminal while running container
    with an image

Note: Two running containers are two seprate file systems and do not share data
among each other

## Building a docker file

We are building a docker image in redis-image folder. Create a file with name as
Dockerfile

To build a image:

15. docker build . // to create a image from docker file in . directory

## To tag an image:

16. docker build -t sachin200697/<project-name>:<version> .  
    //to give image a name to run it as container

## Manual Image generation

1. #>docker run -it alpine sh

now we are on the command line of the alpine container

2. container#> apk add --update redis

Open another terminal and run below command to generate image by attaching a
command that will be run when image will be used as a container:

3. docker commit -c "CMD 'redis-server'" CONTAINERID

Note: To run a container with the image id or container id we don't need to use
full id. we can use some starting part of the id.

##### Project

create a folder name: simpleweb

To run the image:

1. docker run -p 9090:9090 <image-id>
