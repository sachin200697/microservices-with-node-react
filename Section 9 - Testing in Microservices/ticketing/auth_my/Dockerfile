From node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev  
# --omit=dev is used to avoid the installation of below dependencies
# while building images as these dependencies only for dev
# Dependencies: 
# @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server


COPY ./ ./

CMD [ "npm", "start" ]