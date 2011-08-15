var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello (buggering) World\n');
}).listen(80, "67.207.131.83"); // 67.207.131.83 data.hyperdata.org
console.log('Server running at http://127.0.0.1:8888/');