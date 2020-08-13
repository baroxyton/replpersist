# replpersist
## About
replpersist is a nodeJS database client for https://repl.it
## why to use replpersist?
- it's sync. You don't need to restructure your whole code and an async function around it.
- it's super leightweight. It only takes up 5kb unpacked and 1.9kb packed. In fact, it got 10% leighter in the last update. In conparison. replits official node client is 180kb
- it's lightning fast. You don't need to `await` any time, the data is cached
## Documentation
### Import module
Import the module like this: `const Database = require("replpersist");`
### Database constructor
A database instance can be created like this: `let myDB = new Database(dbName[,upload delay (in minutes)][,start value]);`
additionally you can use `Database.databases` to list all databases.
### Database function
Access t
