module.exports = (app) => {
    var info = (req, res) => {
        console.log('');
        var apis = [];
        app._router.stack.forEach((r) => {
            if (r.route && r.route.path){
                var methods = [];

                for(var method in r.route.methods) {
                    methods.push(method);
                }

                apis.push({
                    route: r.route.path,
                    method: methods
                });
            }
        })
        res.send({
            serviceName: 'svc-file-manager',
            description: 'This service save file in base-64 to indicate path.',
            apis: apis
        });
    }

    app.route('/svcFileManager/').get(info).post(info);
}