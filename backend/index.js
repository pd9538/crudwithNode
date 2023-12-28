const http = require('http');
const express = require("express");
const bodyParser=require('body-parser');
const router=require('./router');



/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

const server = http.Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',router);
/**
 * Routes Definitions
 */






  /*
 * Server Activation
 */

server.listen(port);