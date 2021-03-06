var app,
    http = require('http'),
    StaticServer = require('node-static').Server,
    files = new StaticServer(__dirname);


app = http.createServer(function(req, res) {
  req.addListener('end', function() {
    files.serve(req, res);
  });
});

app.listen(process.env.STATUS_PORT || 3000);