# replpersist
## About
replpersist is a nodeJS database client for https://repl.it
## why to use replpersist?
- it's sync. You don't need to restructure your whole code and an async function around it.
- it's super leightweight. It only takes up 5kb unpacked and 1.9kb packed. In fact, it got 10% leighter in the last update. In conparison, replits official node database client is 180kb
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
### additional array functions
intended to use on `myDB.data`, but can be used on any array.
#### `array.add(name,value)`
adds/pushes the following object:
    ```JSON{
    "name":name,
    "content":value
    }```
#### `array.addCustom(nameProp,contentObj)`
will add/push contentObj if there's no other object with the name value of nameProp. If duplicates don't matter, use javascript's normal `array.push`.
#### `array.clear()`
empties array
#### `array.del(delname)`
deletes object with the property name being `delname`. For instance, if you have the array `[{name:"test"}]` you can delete the object by using `array.del("test")`
#### `array.delCustom(nameProp,nameValue)`
deletes object with the property `nameProp` having the value of `nameValue`. For instance, if you have the array `[{someProp:"hello world"}]` you can delete it by using `delCustom("someProp","hello world")`
#### `array.delItem(item)`
if you know what the value of the item you want to delete is, you can use this function. If you have the array `["delete","the","second","item"]` you can call `array.delItem("the")` to remove the second item.
#### `array.f(nameValue)`
same as `array.del`, but it returns the found item instead of deleting it
#### `array.fAll(nameProp,nameVal)`
same as `array.fCustom`, but it returns a list of all found elements instead of just the first one
#### `array.fCustom(nameProp,nameVal)`
same as `array.delCustom`, but it returns the item instead of deleting it
#### `array.fi(nameVaö)`
same as `array.f`, but only returns the index
#### `array.fiCustom(nameProp,nameVal)`
same as `array.fCustom`, but only returns index
