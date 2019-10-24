const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./index/routes.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extened: false }));

app.use('/', routes)

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



app.listen(3000,()=>{
  console.log("Listening port 3000")
})