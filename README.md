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
### Database instance
#### `myDB.data`
this is where your data is stored. You can interact with it like a normal array, and it also can be changed to an object. There's functions that help interacting with it. More information below.
#### `myDB.name`
the name of the database
#### `myDB.onupload`
if set it's called when the database is uploaded automatically or manually. The data is passed as a parameter
#### `myDB.reset()`
resets the whole database.
#### `myDB.upload()`
to manaully upload the database, independent of the automatic uploading cycle. Call after storing important data. The database will upload automatically once all 2 minutes or any other value that has been set when creating the database.
