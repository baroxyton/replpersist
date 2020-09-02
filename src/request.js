http = require("https")
function form(url,body, options){
  options=options||{}
  var reqData = {
    headers:{"content-type":"application/x-www-form-urlencoded"},
    method:"POST",
    ...options
  }
  return new Promise(function(res){
    var bodyout = ""
    let req = http.request(url,reqData,function(result){
      result.on("data", function(data){
        bodyout += data
      })
      result.on("end", function(data){
        res(bodyout)
      })
    })
    req.write(body)
    req.end()
  })
}
function request(url,method,moptions){
  moptions=moptions||{}
  var options = {
    method:method||"GET",
    ...moptions
  }
  return new Promise(function(res){
    bodyout = ""
    var req = http.request(url,options, function(resu){
      resu.on("data", function(data){
        bodyout += data
      })
      resu.on("end", function(){
        res(bodyout)
      })
    }).end()
  })
}
module.exports.form = form
module.exports.request = request
