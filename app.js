    
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./rutas');
const logger = require('morgan');
const puerto = process.env.port || 8000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const packageJson =require('./package.json');
const moment = require('moment-timezone');
const fecha = moment().tz("America/Mexico_City").format("YYYY-MM-DD");

if (!fs.existsSync(path.join(__dirname+"/logs/"+packageJson.name))){
  fs.mkdirSync(path.join(__dirname+"/logs/"+packageJson.name),{ recursive: true });
}
var accessLogStream = fs.createWriteStream(path.join(__dirname+"/logs/"+packageJson.name, fecha+"_"+packageJson.name+'.log'), { flags: 'as+' })
morgan.token('header', function (req, res) { return JSON.stringify(req.headers)});
morgan.token('body', function (req, res) { return JSON.stringify(req.body)});

app.use(morgan('[:date[clf]] :status ":method :url HTTP/:http-version"  :req[header] :header :body', { stream: accessLogStream }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.get('/', (req, res) => res.send('Servicio Test'))

app.use('/', routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(puerto, () => console.log('Servicio Test: ' + puerto))

module.exports = {
  app
}