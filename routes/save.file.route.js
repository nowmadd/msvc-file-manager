const controller = require('../controllers/save.file.controller');

module.exports = (app) => {
    app.route('/svcFileManager/saveFile').post((req, res) => {
        console.log('');
        var result = req.body;
        if(result.hasOwnProperty('result')) {
            result = req.body.result;
        }
        
        controller.saveFile(result, (cb) => {
            if(cb) res.send(successModel)
            else res.send(failModel)
        });
    });

    app.route('/svcFileManager/getFileAndSaveTo').post((req, res) => {
        var result = req.body;
        if(result.hasOwnProperty('result')) {
            result = req.body.result;
        }
        
        controller.getFileAndSaveTo(result, (cb) => {
            if(cb) res.send(successModel)
            else res.send(failModel)
        });
    });
}