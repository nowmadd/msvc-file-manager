const fs = require('fs');
const path = require('path');
const colors = require('colors/safe');

module.exports = () => {
    var rootFolder = path.dirname(require.main.filename);
    global.apiRoutes = [];
    var routePath = path.join(rootFolder, 'routes');
    if(fs.existsSync(routePath)) {
        global.apiRoutes = fs.readdirSync(routePath);
    }

    global.consoleLog = (msg, clr) => {
        var temp = 'cyan';
        if(!(typeof clr === 'undefined') && clr != null && clr != '') {
            temp = clr;
        }
        console.log(colors.green('[svc-file-manager] ') + colors[temp](msg));
    }

    global.logMessage = (msg, clr) => {
        global.consoleLog(msg, clr);
        global.successModel.message = msg;
        global.failModel.message = msg;
    }

    global.successModel = {
        status : 'success',
        statusCode : 0,
        isSuccess : true,
        message : ''
    }
    
    global.failModel = {
        status : 'fail',
        statusCode : 1,
        isSuccess : false,
        message : 'Error encountered while processing request.'
    }

    global.mkDirIfNotExists = (_path) => {
        return new Promise((resolve, reject) => {
            try {
                if(!fs.existsSync(_path)) {
                    fs.mkdirSync(_path);
                }
    
                resolve(_path);
            }
            catch(err) {
                reject(err);
            }
        });
    }

    global.getBuffer = (_data) => {
        return new Promise((resolve, reject) => {
            var buffer;
    
            if (typeof Buffer.from === "function") {
                buffer = Buffer.from(_data, 'base64'); 
            } else {
                buffer = new Buffer(_data, 'base64');
            }
    
            resolve(buffer);
        });
    }
    
    global.saveFile = (_path, _filename, _buffer) => {
        return new Promise((resolve, reject) => {
            try {
                fs.writeFile(path.join(_path, _filename), _buffer, function(err) {
                    if(err) reject(err);
                    else resolve(true);
                });
            }
            catch(err) {
                reject(err);
            }
        });
    }
}