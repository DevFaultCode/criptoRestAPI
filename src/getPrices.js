import axios from 'axios';

async function obtenerValoresCriptomonedas() {
  try {
    // Hacer la solicitud a la API de CoinGecko
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');

    // Filtrar los resultados para obtener solo BTC, ETH, BNB y USDT
    const monedasDeseadas = ['bitcoin', 'ethereum', 'binancecoin', 'tether'];
    const resultadosFiltrados = response.data.filter(moneda => monedasDeseadas.includes(moneda.id));

    // Crear un JSON con los valores deseados
    const jsonResultado = resultadosFiltrados.map(moneda => ({
      id: moneda.id,
      nombre: moneda.name,
      simbolo: moneda.symbol,
      valor: moneda.current_price,
    }));

    // Obtener el tipo de cambio del dólar a euro
    const tipoCambioUSDeuro = await obtenerValorDeEuroEnDolares();

    // Añadir el tipo de cambio al JSON final
    jsonResultado.push({
      id: 'eur',
      nombre: 'Euro',
      simbolo: 'eur',
      valor: tipoCambioUSDeuro.toFixed(2),
    });

    // Obtener el tipo de cambio del dólar a Bolivares
    const tipoCambioUSDbolivares = await obtenerValorDeBSEnDolares();

    // Añadir el tipo de cambio al JSON final
    jsonResultado.push({
      id: 'bs',
      nombre: 'Bolivares',
      simbolo: 'bs',
      valor: tipoCambioUSDbolivares,
    });

    console.log(JSON.stringify(jsonResultado, null, 2)); // Mostrar el resultado en la consola
    return jsonResultado; // Retornar el resultado si es necesario
  } catch (error) {
    console.error('Error al obtener los valores de las criptomonedas:', error);
  }
}

async function obtenerValorDeEuroEnDolares() {
  try {
    const response = await axios.get('https://v6.exchangerate-api.com/v6/e3a6ca2fa698fa2794442428/latest/EUR');
    return response.data.conversion_rates.USD;
  } catch (error) {
    console.error('Error al obtener el tipo de cambio USD/EUR:', error);
  }
}

async function obtenerValorDeBSEnDolares() {
  try {
    
    const response = await axios.get('https://ve.dolarapi.com/v1/dolares/oficial');
    const bs = (1/response.data.promedio).toFixed(2);
    return bs;

    
  } catch (error) {
    console.error('Error al obtener el tipo de cambio USD/BS:', error);
  }
}



// Llamar a la función
// const valores = await obtenerValoresCriptomonedas();
export { obtenerValoresCriptomonedas }; // Exporta la funcion