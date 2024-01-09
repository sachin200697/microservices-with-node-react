## Options to share code

1. simply copy and paste in both services
2. Make a git repo and then include it as submodule in both services
3. Make a npm module -> push it to npm registery -> include it as dependency in
   both services

## Options 3 (best among all three mention above)

There are three options to publish a module:

1. Public : visible to others
2. Organization:
   1. public: free but some setup we can make it private
   2. private: paid
3. private: paid

for 2.1 option:

npmjs.com -> login -> Click on your profile icon -> + Add Organization -> give
name (sachin200697-skticketing) -> create public -> skip to invite others

## Creating package

create a new folder common -> npm init -y -> update package.json:

name: @sachin200697-skticketing/common

## publishing:

1. npm login -> username -> password
2. cd common -> git init -> git add . -> git commit -m "Initial Commit" -> npm
   publish --access public

now we can install this package like : npm i @sachin200697-skticketing/common

## common package

1. npm i typescript del-cli --save-dev

2. package.json:

   1. scripts:

      "clean": "del ./build/\*", // to always clean before building the js code

      "build": "npm run clean && tsc" // to run clean and then compile .ts code

   2. "main" : "./build/index.js"
   3. add "types": "./build/index.d.ts"
   4. add "files": ["build/**/*"] //for which files will be insluded 100% in our
      final version of published package

3. tsc --init

then uncomment some option in tsconfig.json file generated from above command:

"declaration": true, // to generate type defenition file

"outDir": "./build", // to generate .js file from .ts file in this folder

## FYI del script error: invalid switch

"clean": "del-cli ./build/\*"

or

"clean": "del /S /Q .\\build\\\*"
