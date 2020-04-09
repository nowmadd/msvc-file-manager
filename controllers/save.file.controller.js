const fs = require('fs');
const path = require('path');
const fileType = require('file-type');

exports.saveFile = (requestBody, callback) => {
    var filePath, filename;

    mkDirIfNotExists(requestBody.path).then((_path) => {
        consoleLog('found the path where to upload files');
        return getBuffer(requestBody.data);
    }).then((_buffer) => {
        var fT = fileType(_buffer);
        filename = requestBody.filename + '.' + fT.ext;
        return saveFile(requestBody.path, filename, _buffer);
    }).then((result) => {
        logMessage('file saved successfully');
        requestBody.filename = filename;
        successModel.result = requestBody;
        callback(true);
    }).catch((err) => {
        console.log(err);
        logMessage('failed in saving the file', 'red');
        callback(false);
    });
}

exports.getFileAndSaveTo = (requestBody, callback) => {
    try {

        if (!fs.existsSync(requestBody.path.to)){
            fs.mkdirSync(requestBody.path.to);
        }
        fs.createReadStream(path.join(requestBody.path.from, requestBody.filename)).pipe(fs.createWriteStream(path.join(requestBody.path.to, requestBody.output)));
        logMessage('file copied successful');
        successModel.result = requestBody;
        callback(true);
    }
    catch(err) {
        logMessage('failed in copying the file', 'red');
        callback(false);
    }
}