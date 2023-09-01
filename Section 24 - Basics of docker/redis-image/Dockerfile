# Step: 1. User an existing docker image as base
FROM alpine
# To have a OS or a specific env that can be used to 
# run the instruction that we want to run

# Step: 2. Download and install a dependency
RUN apk add --update redis  
# apk is used to install the programs, so in this case
# we are just installing and updating redis in our OS

# Step: 3. Tell the image what to do when it starts as a container
CMD ["redis-server"]