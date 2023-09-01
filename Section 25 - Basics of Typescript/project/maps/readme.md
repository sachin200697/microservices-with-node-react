To use the .ts files in the html directly we can do below steps:

1. <!-- need to add type="module" to use typescript files -->
<script src="./src/index.ts" type="module"></script>

2. create index.ts file in src folder and write some code.

3. <!--  use parcel-bundler:  -->

   npx parcel index.html
    <!-- it will automatically install parcel and will run a server on
        port localhost:1234 -->

4. <!-- To use faker library, you can install it by running: -->

npm install @faker-js/faker

You'll then need to update all of your imports:

import { faker } from "@faker-js/faker";

As of their v6 release, TS support is now native and does not require installing
the @types declarations.

https://github.com/faker-js/faker#typescript-support

5. <!-- install type definition library -->

faker is a js library and to include it into a ts file or project, ts need a
type defenition, so that it can check types.

npm install @types/faker

6. Google maps api key from course: AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU

we can generate our own key:

Go to -> https://console.cloud.google.com/ -> Craete new project -> Go to newly
created project

Nevigation (burger) -> APIs and Services -> Library -> search maps javascript
api -> enable

Navigation (burger) -> APIs and Services -> Credentials -> Create Credentials ->
API Key -> Copy and save it

7. <!-- include below script for maps -->
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBNLrJhOMz6idD05pzfn5lhA-TAw-mAZCU&callback=Function.prototype"></script>

8. The @types/googlemaps library that is installed in the next video has been
   deprecated. Instead, we need to install a different library:

If we want to use a third party script (that we can include in our html file),
even then we need to install the type definition for it as we are using it in
our ts file.

npm install @types/google.maps

Also, you will still see a TS error in your code editor:

Cannot find name 'google'.ts(2304)

As the very first line in the index.ts file, you will need to add a triple slash
directive:

/// <reference types="@types/google.maps" /> You can read about this in the
official docs here:

https://developers.google.com/maps/documentation/javascript/using-typescript#Module_Import
