var config = {};

config.port = 10004;

config.addRoutes = (app) => {
    apiRoutes.forEach((file) => {
        require('../routes/' + file)(app);
    });
}

module.exports = config;