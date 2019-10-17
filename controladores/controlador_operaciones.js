const fs = require('fs');
const validacion_esquema =  require('../validaciones/validacion_esquema');
const suma = require('../funciones/funcion_suma');
const resta = require('../funciones/funcion_resta');
const multiplicacion = require('../funciones/funcion_multiplicacion');
const division = require('../funciones/funcion_division');

let respuesta = JSON.parse(fs.readFileSync("configuraciones/respuesta.json"));

exports.ejecutar = async(req, res) => {       
    try
    {  
        let esquema_valido = await validacion_esquema.ejecutar(req.body);
        if(esquema_valido)
        {
            let respuesta_data = 
            {
                suma: suma.ejecutar(req.body.numeros), 
                resta: resta.ejecutar(req.body.numeros),
                multiplicacion: multiplicacion.ejecutar(req.body.numeros),
                division: division.ejecutar(req.body.numeros) 
            } ;
            respuesta.data = respuesta_data;
            respuesta.errors = [];
            res.status(200).send(respuesta);
        }
        else
        {
            respuesta.errors = ["invalid_data_format"];
            respuesta.data = "";
            res.status(422).send(respuesta);
        }
    }
    catch(err)
    {
        console.log("Error: ", err);
        respuesta.errors = ["internal_server_error"];
        respuesta.data = "";
        res.status(500).send(respuesta);                   
    }
}





 