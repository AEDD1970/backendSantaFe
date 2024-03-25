/**
 * Module dependencies.
 */
var app = require('./indexConfig.js');
var http = require('http');
var config = require('./config.js');


/**
 * Get port from environment and store in Express.
 */

//connection local-port
const port = process.env.PORT || 3005
app.set('port', port);
var host = process.env.HOST || '0.0.0.0';
/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
console.log('---------------------------------------------')
// console.log('ENV:', config.environment);
console.log('VERSION: 1.0');
console.debug('Service: ' + host + ':' + port);
server.listen(port, host);
