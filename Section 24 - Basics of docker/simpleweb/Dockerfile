FROM alpine

WORKDIR /usr/app

# to copy all file (ex: index.js, package.js) from our computer to the image/container
COPY ./package.json ./  

RUN npm install

COPY ./ ./

CMD ['npm', 'start']