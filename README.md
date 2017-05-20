# NodeCompare
NodeCompare is a tool for comparing sites.

It focuses on performance and a general flattening and simplification of the Database architecture
## Running the project locally:
1. Pull down the repo
2. Run `npm intall` to install dependencies
3. Run `node app` to kick off the server and browse to localhost:3000 .
4.  Less is used for styles. To compile it to css run: `gulp build-less`, or if you are using VS Code as your editor press `Ctr+Shift+B`


## Some notes on development.
* Will be looking at the architecture sometime in the future to see if I oversimplified it. I am running into some oddities. Don't know if it's because it's to simple or if it's a case of code-blindness :-)
* When passing arguments arround, always prefer objects to huge argument lists.
* Modules are your friends. They are the best defense agains the terrible daemons of Callback Hell.
* When writing chunks of functionality, use the Revealing Module pattern when it's a singleton, and if it's an instance object, use the Constructor pattern.
* Promises are utilized HEAVILY. Currently I use my own psudo-implementation of promises, but I will be switching it out for a third-party library in the future.
  * Any new functionality that will integrate with the `CompareMonitor` in any way should return a promise, as that's the only way to track anything's progress when everything is async.
* Use 2 spaces for indentation. (Or better yet, use Visual Studio Code as your editor and it'll take care of it for you.)