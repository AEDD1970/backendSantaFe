require('dotenv').config();

module.exports = {
    API_SECRET: '9_*322dUK__e[@L3x',
    environment: process.env['NODE_ENV'] || 'development',
    LIMITTER_MAX: 200, // Maximo 200 peticiones a la API
    LIMITTER_WINDOW_MS: 60 * 1000 // Tiempo en el que se reestablece el numero de peticiones (en milisegundos)
}