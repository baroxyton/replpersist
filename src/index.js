//require stuff
require("./prototypes.js")
req = require("./request.js")
fs = require("fs")
proc = require("child_process")
//database url
var base = process.env.REPLIT_DB_URL
//list of databases
databases = {}
//hacky way of getting the database synchronous on launch
function runSync(js){
fs.writeFileSync('../databaseTempSync.js', js)
var result = proc.spawnSync("node",["../databaseTempSync.js"])
fs.unlinkSync('../databaseTempSync.js');
var err = result.stderr.toString()
if(err){throw new Error(err)}
var out = result.stdout.toString().slice(0,-1)
return out
}
//constructor
function Database(key,delay,defa){
if(delay&&typeof delay != "number"){
  throw new Error(`${delay} is not a number!`)
}
if(databases[key]){
  throw new Error(`You can only create one database named ${key}!`)
}
let self = this
this.defa = defa||[]
this.name = key
this.data = []
this.lastBackup = ""
this.delay = delay||2
this.getSync = function(){
  var js = `
  http = require("https")
  req = function(url){
    http.get(url,function(res){
      var body = ""
      res.on("data", function(data){
        body += data
      })
      res.on("end", function(){
        console.log(body)
      })
    })
  }
  req("${base}/${key}")
  `
  return runSync(js)
}
this.functions = {
  "get":async function(){
    return await req.request(base+'/'+key)
  },
  "set":async function(data){
    var formData=`${key}=${encodeURIComponent(data)}`
    var reqd = {
      url:base,
      method:"POST",
      headers:{"content-type":"application/x-www-form-urlencoded"},
     data:formData
    }
    return await req.form(base,formData,reqd)
  },
  "list":async function(){
    return await req.request(base+'?prefix=')
  },
  "del":async function(){
    return await req.request(base+"/"+key,"DELETE")
  }
}
var data = this.getSync()
if(!data){
  data = JSON.stringify(self.defa)
}
self.data=JSON.parse(data)
self.lastBackup = data
databases[self.name] = self
this.upload = function(){
  self.functions.set(JSON.stringify(self.data))
  self.onupload?self.onupload(self.data):0
}
this.reset = this.functions.del
setInterval(function(){
  if(self.lastBackup != JSON.stringify(self.data)){
    self.upload()
    self.lastBackup = JSON.stringify(self.data)
  }
},self.delay*60000)
}
Database.databases = databases
module.exports = Database
