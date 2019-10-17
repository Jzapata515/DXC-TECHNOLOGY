exports.ejecutar = function (arreglo) {
    console.log("Función resta");
    let funcion = (total, valor) => total - valor;
    let resultado = arreglo.reduce(funcion); 

    return resultado;
}