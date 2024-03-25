
(function () { // Using wrapper function to not mess the global scpope with strict
    'use strict'

    const express = require('express'),
        fs = require('fs'),
        path = require('path'),
        bodyParser = require('body-parser'),
        helmet = require('helmet'),
        mongoose = require('mongoose'),
        config = require('./config'),
        dbConfig = require('.'),
        app = express(),
        cors = require('cors')

    const mongoConfig = dbConfig[config.environment] || dbConfig.development
    // CORS 
    app.use(cors())
    require('./utils/middleware/cors')(app)

     mongoose.connect(mongoConfig.MONGODB, mongoConfig.MONGODB_OPTIONS)
     .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log(err);
      });

    function parseRoute(dir) {
        let names = dir.split(path.sep)
        names.pop()
        if (names[0] === 'api') names[0] = ''
        // console.log('names.join >>> ', names.join('/'))
        return names.join('/')
    }

    function recursiveRoutes(folderName) {
        fs.readdirSync(folderName).forEach((file) => {
            const fullName = path.join('.', folderName, file)
            const stat = fs.lstatSync(fullName)
            if (stat.isDirectory()) {
                recursiveRoutes(fullName)
            } else if (file === 'routes.js') {
                const route = parseRoute(fullName)
                console.log(route, "route")
                app.use(`${route}`, require(path.join(__dirname, fullName)))
            }
        })
    }
    app.use(bodyParser.json({
        limit: '10mb'
    }));

   

    //Security middleware
    app.use(helmet.frameguard());
    app.use(helmet.noSniff());
    app.use(helmet.xssFilter());
    app.use(helmet.hidePoweredBy());

    //     // API routes
    recursiveRoutes('api');

    module.exports = app;

}())