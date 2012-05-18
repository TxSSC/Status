var app,
    http = require('http'),
    StaticServer = require('node-static').Server,
    files = new StaticServer('./');


app = http.createServer(function(req, res) {
  req.addListener('end', function() {
    files.serve(req, res);
  });
});

app.listen(3000 || process.env.STATUS_PORT);