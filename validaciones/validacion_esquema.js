const esquema = require("../configuraciones/esquema");
const validador = require('jsonschema').Validator;
const v = new validador();

exports.ejecutar = async function(body_json) {
    console.log("Validación Esquema");
    let resultado = false;

    let validacion = await v.validate(body_json, esquema.arreglo);
    resultado = validacion.valid;
    if (!validacion.valid) {
        validacion.errors.forEach(function(error) {
            console.log("Error en el esquema: ", error.stack);
        });
    }

    return resultado;
}