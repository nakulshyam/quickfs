var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/MyProjects/quickfs/fs' + files.filetoupload.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
 });
  } else {
    fs.readFile("index.html", function (error, html) {
      if (error) {
          res.writeHead(404);
          res.write('Contents you are looking are Not Found');
      } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.write(html);
      }
      return res.end();
  });
  }
}).listen(8080);