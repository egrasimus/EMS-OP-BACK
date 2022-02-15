//Imports
const express = require('express');
var cookieParser = require('cookie-parser');
const http = require('http');
const cors = require('cors');
const apiNmclRouter = require('./src/controllers/Nomenclatures/api-nmcl.controller');
const apiNmclTypeRouter = require('./src/controllers/Nomenclatures/api-nmclType.controller');
const { notFound, errorHandler } = require('./src/middlewares/middlewares');
const { initDB } = require('./src/dataBase/dbSync');
const { host, port} = require('./initiator');

//Init zone
const app = express();

//InitDB
initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use('/api/nmcl', apiNmclRouter);
app.use('/api/nmclType', apiNmclTypeRouter);

app.use(notFound);
app.use(errorHandler);

//Create server
http.createServer(app).listen(port, host ? host : null, () => {
  console.log(`Server is working on port ${port}`);
});