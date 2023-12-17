## Note

In the upcoming lecture, we will be adding the --only=prod flag to the npm
install instruction of our Dockerfile. This flag no longer exists, and we need
to use the --omit=dev flag instead.

## Dependencies:

in auth dir:

npm i --save-dev @types/jest @types/supertest jest ts-jest supertest

npm i --save-dev mongodb-memory-server

## Issue with mongo-memory-server

In the upcoming lecture, we will be setting up our test environment with
MongoMemoryServer. If you are using the latest versions of this library a few
changes will be required:

In auth/src/test/setup.ts, change these lines:

mongo = new MongoMemoryServer();

const mongoUri = await mongo.getUri();

to this:

mongo = await MongoMemoryServer.create();

const mongoUri = mongo.getUri();

Remove the useNewUrlParser and useUnifiedTopology parameters from the connect
method. Change this:

await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology:
true, });

to this:

await mongoose.connect(mongoUri, {});

Then, find the afterAll hook and add a conditional check:

afterAll(async () => { if (mongo) { await mongo.stop(); } await
mongoose.connection.close(); });

For reference:

https://nodkz.github.io/mongodb-memory-server/docs/guides/migration/migrate7/https://nodkz.github.io/mongodb-memory-server/docs/guides/migration/migrate7/

## add script to package.json

"scripts" : {

    ...
    "test": "jest --watchAll --no-cache"

},

"jest": {

    "preset": "ts-jest",
    "testEnvironment": "node",
    "setupFilesAfterEnv": [
        "./src/test/setpu.ts"
    ]

},

## Typescript wasn't recognizing the beforeAll, beforeEach and afterAll functions from Jest.

I found this GitHub conversation which provided the solution, as the issue is
with VS Code:

- Within VS Code, press ⌘-SHIFT-P to bring up the command pallet.

- type `reload window` until you see `Developer: Reload Window`

- click `Developer: Reload Window`

This Developer: Reload Window solution did not work for me. I had to do this:
https://blog.kevinchisholm.com/jasmine/jasmine-cannot-find-name-describe-beforeeach-expect/

1 – In package.json, add this line to your devDependencies:

"@types/jasmine": "^2.6.0",

2 – And then in your unit test file (i.e. XXX.spec.ts), add this line:

import {} from 'jasmine';

## writing test

To write a test for a file (for example signup.ts) we need to create a folder in
the same directory with name '\_\_test\_\_' and also need to create a file :
signup.test.ts

## Error: TypeError: Cannot read properties of undefined (reading 'Router')

Unknown

## globalThis has no index signature TS Error

In the upcoming lecture (and later with the ticketing, orders and payments
services) you may end up seeing a TS error like this in your test/setup.ts file:

Element implicitly has an 'any' type because type 'typeof globalThis' has no
index signature.ts(7017)

To fix, find the following lines of code in src/test/setup.ts:

declare global {

    namespace NodeJS {

        export interface Global {

            signin(): Promise<string[]>;

        }

    }

}

change to:

    declare global {

      var signin: () => Promise<string[]>;

    }
