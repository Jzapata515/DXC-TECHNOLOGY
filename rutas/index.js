const express = require('express');
const controlador_operaciones = require('../controladores/controlador_operaciones');
const router = express.Router();

router.post('/test', controlador_operaciones.ejecutar);


router.get('/', function(req, res, next) {
    res.render('index', { title: 'Servicio Test' });
  });
  

module.exports = router