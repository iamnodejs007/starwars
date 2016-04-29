const http = require('http');
var url = require('url');
var fs = require('fs');

function start(enrutar, manejador){

  fs.readFile('./html/index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        var ruta = url.parse(request.url).pathname;
        //console.log('Server running at http://127.0.0.1:80/');
		
		var ip = request.headers['x-forwarded-for'] || 
		    request.connection.remoteAddress || 
		    request.socket.remoteAddress ||
		    request.connection.socket.remoteAddress;
		    console.log(ip);

        var contenido = enrutar(manejador, ruta, response);

        var registro = fs.createWriteStream('registro.txt', 
          {'flags':'a'});
        registro.write(ruta + " \n ");

        /*response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  */

    }).listen(80);
  });

}

exports.iniciar = start;
