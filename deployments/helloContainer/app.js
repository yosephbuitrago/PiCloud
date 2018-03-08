const http = require('http');
const os = require('os');
let fs = require('fs');
let util = require('util');
let val;

console.log("Starting nodeinfo");

var handler = function(request, response) {
  console.log("Received request from " + request.connection.remoteAddress);
  response.writeHead(200);
  fs.readFile("/etc/hostname", "utf8", (err, data) => {
        val  = "You've hit \n";
        val += "Hostname: " + data ;
        val += "Platform: " + os.platform()+"\n";
        val += "Arch: " + os.arch() + "\n";
        val += "CPU count: " + os.cpus().length+ "\n";
        val += "Uptime: " + os.uptime()+ "\n";
        console.log(val);
        });
  response.end(val);
}

var www = http.createServer(handler);
www.listen(8080);

