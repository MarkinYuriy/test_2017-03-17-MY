var express = require('express');
var router = express.Router();

var child_process = require('child_process');
var exec = child_process.exec;
var options = {
    timeout: 200, //ms
    killSignal: 'SIGKILL'
}

var scripts = {
    'error': {name: 'hello with error', path: __dirname + '/../scripts/error.py'},
    'hello': {name: 'hello w/o error', path: __dirname + '/../scripts/hello.py'}
}


router.get('/script', function (req, res) {
    var resp = [];
    for (var property in scripts) {
        resp.push({name: scripts[property].name, key: property})
    }
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.send(resp);
});

router.get('/script/:key', function (req, res) {
    var resp = {};
    exec('python ' + scripts[req.params.key].path, options, function (err, stdout, stderr) {
        if (err) {
            resp.status = 1;
            resp.output = stdout;
            res.status(200);
            res.send(resp);
        } else {
            resp.status = 0;
            resp.output = stdout;
            res.status(200);
            res.send(resp);

        }
    });

});


module.exports = router;
