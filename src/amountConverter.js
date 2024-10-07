import { obtenerValoresCriptomonedas } from "./getPrices.js"

async function conversorDeMontos(monto, moneda) {
    const tasasArray = await obtenerValoresCriptomonedas();
    
    // Transformar el array en un objeto
    const tasas = {};
    tasasArray.forEach(moneda => {
        tasas[moneda.simbolo] = moneda; // Guarda el objeto completo
    });

    const resultados = convertirMoneda(monto, moneda, tasas);
    console.log(resultados);
    return resultados;
}

function convertirMoneda(monto, monedaOrigen, tasas) {
    if (!tasas[monedaOrigen]) {
        throw new Error(`La moneda de origen "${monedaOrigen}" no está disponible.`);
    }

    const montoEnUSD = monto * tasas[monedaOrigen].valor; // Convertir el monto a USD

    return {
      BTC: parseFloat((montoEnUSD / tasas['btc'].valor).toFixed(2)) || 0,
      ETH: parseFloat((montoEnUSD / tasas['eth'].valor).toFixed(2)) || 0,
      USDT: parseFloat((montoEnUSD / tasas['usdt'].valor).toFixed(2)) || 0,
      BNB: parseFloat((montoEnUSD / tasas['bnb'].valor).toFixed(2)) || 0,
      BS: parseFloat((montoEnUSD / tasas['bs'].valor).toFixed(2)) || 0,
      EUR: parseFloat((montoEnUSD / tasas['eur'].valor).toFixed(2)) || 0
    };
}


// const values = await conversorDeMontos(1, 'btc');
export { conversorDeMontos };