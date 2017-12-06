const basicAuth = require('basic-auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const jsrsasign = require('jsrsasign');
const app = express();

const controllerTask = require('./controller/controller_task.js');
var tasks = require ('./model/task').tasks;

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());


app.post('/api/tasks', controllerTask.nuevo);

app.get('/api/tasks', controllerTask.todo);

app.delete('/api/tasks/:id', controllerTask.borrar)

app.post('/api/auth/token', controllerTask.getToken)

exports.app = app;
