const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serverConfig = require('./configs/server.config');
const port = serverConfig.port;
require('./services/services')();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ type: 'application/json', limit: '50mb', extended: true }));
serverConfig.addRoutes(app);

app.listen(port, () => {
    console.log('');
    consoleLog('listening to port ' + port);
});