exports.ejecutar = function (arreglo) {
    console.log("Función suma");
    let funcion = (total, valor) => total + valor;

    let resultado = arreglo.reduce(funcion); 

    return resultado;
}