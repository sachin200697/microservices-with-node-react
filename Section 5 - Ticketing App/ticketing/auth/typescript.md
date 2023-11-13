## Install packages

cd ticketing/auth

npm i typescript ts-node-dev express @types/express

tsc --init

// in package.json make a script to run ts files

"start": "ts-node-dev src/index.ts"
