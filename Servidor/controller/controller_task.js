const basicAuth = require('basic-auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jsrsasign = require('jsrsasign');
const tasks = require ('../model/task').tasks;
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

exports.nuevo = function(request, response){
  response.setHeader('Content-Type', 'application/json');
  if (request.body.text && request.body.done && request.body.date) {
    if(tasks.length>0){
      var num = (tasks[tasks.length-1].id);
    }
    else{
      num = 0;
    }
    request.body.id = num+1;
    request.body.createdAt = new Date();
    request.body.updatedAt = new Date();
    tasks.push(request.body);
    // console.log(request.body);      // your JSON
    response.send('{"id:":'+request.body.id+'}');    // echo the result back
  }else{
    response.status(400);
    response.send("Not Found");
  }

};

exports.todo = function(request,response){
    response.setHeader('Content-Type', 'application/json');
    response.send(tasks);
};

exports.getToken = function(request,response){
  response.setHeader('Content-Type', 'application/json');

  var user = request.body.username;
  var pass = request.body.password;

  let header = {
    alg: "HS256",
    typ: "JWT"
  };

  let payload = {
  };

  payload.iat = jsrsasign.jws.IntDate.get('now');
  payload.user = user;
  payload.pass = pass;

  let secret_phrase = pass;
  let jwt = jsrsasign.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), secret_phrase);

  jwtJSON = {"token": jwt}
  response.send(jwtJSON);
};


exports.borrar = function(request,response){
    response.setHeader('Content-Type', 'application/json');
    var error = false;
    for (var i = 0; i < tasks.length; i++){
      if (tasks[i].id == request.params.id){
        tasks.splice(i,1);
        response.send("Se borró c:");
      }
    }
      response.send("No existe :c");
};
