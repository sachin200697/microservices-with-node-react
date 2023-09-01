## To install Typescript:

npm install -g typescript ts-node

//typescript module is used to write typescript

//ts-node module allow to compile and execute typescript with one command in the
terminal

//After install ts-node we will be able to use tsc command (tsc = typescript
compiler)

## Configure VS code for typescript

1. Add path in vs code:

VS code -> View command palette -> search install path -> click on it

2. Install prettier extension

VS code -> View -> extension -> search prettier (from Esben Peterson) -> install

Code -> preferences -> settings -> search format on save -> enable it

Code -> preferences -> settings -> search single quotes -> enable it

Code -> preferences -> settings -> scroll -> Tab size -> make it 2

## Project - fetchjson

API to use: https://jsonplaceholder.typicode.com/ -> Resources

Create folder fetchjson

cd fetchjson

npm init -y

npm install axios@0.27.2

<!-- compile and run typescript -->

tsc index.ts //it will generate index.js file

node index.js

<!-- we can do above two steps in one step using ts-node -->

ts-node index.ts
