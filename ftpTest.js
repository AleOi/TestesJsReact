/* var http = require('http');
http.createServer().listen(8081);
console.log("Servidor esta aberto")
*/
var ftpClient = require('ftp-client'),

config = {
  host: '18.188.99.243',
  port: 21,
  user: 'user02',
  password: 'argoftp12@'
}

options = {
    logging: 'basic'
}

client = new ftpClient(config, options);
 
client.connect(function () {
 
    client.download('/MeDuSa_CATTALINI', './', {
        overwrite: 'all'
    }, function (result) {
        console.log(result);
    });
 
}); 

/* const express = require('express');
const app = express();

app.get("/", function (req, res) {
})

app.listen(8081, function (req, res) {
  console.log("Teste de express")  
}); */

/* const ftp = require("basic-ftp")

example()

async function example() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "18.188.99.243",
            user: "user02",
            password: "argoftp12@",
        })
        console.log(await client.list())
        //await client.uploadFrom("/MeDuSa_CATTALINI/Previsao.txt", "README_FTP.md")
        await client.downloadTo("/Previsao.txt", "/MeDuSa_CATTALINI/Previsao.txt") 
    }
    catch(err) {
        console.log(err)
    }
    client.close()
} */

/* var fs     = require('fs');
var Client = require('ftp');

// SOURCE FTP CONNECTION SETTINGS
var srcFTP = {    

    host: '18.188.99.243',
    port: 21,
    user: 'user02',
    password: 'argoftp12@'

}

// DESTINATION FTP CONNECTION SETTINGS
var destFTP = {

    host: '18.188.99.243',
    port: 21,
    user: 'user02',
    password: 'argoftp12@'

}

var downloadList = [];

var c = new Client();
c.on('ready', function() {

  c.list( '/MeDuSa_CELSE', function(err, list) {

    if (err) throw err;

    list.map(function(entry){
      console.log(entry.name)
      downloadList.push(entry.name);
      if ( entry.name.match(/tar\.gz$/) && entry.name.match(/^filename/) ){
      } 
    });

    downloadList.map(function(file){
      // Download remote files and save it to the local file system:
      console.log(file)
      c.get(file, function(err, stream) {
        if (err) throw err;
        stream.once('close', function() { c.end(); });
        stream.pipe(fs.createWriteStream(file));

      });

    });

    c.end();

  });

});


c.connect(srcFTP); */

/* const jsftp = require("jsftp");

const ftp = new jsftp({
    host: '18.188.99.243',
    user: 'user02',
    password: 'argoftp12@'
});

ftp.ls(".", (err, res) => {
    res.forEach(file => console.log(file.name));
}); */

//import PromiseFtp from 'promise-ftp'
/* const PromiseFtp= require("promise-ftp");

var ftp = new PromiseFtp();
    var host = '3.14.244.193'
    var user = 'user02'
    var password = 'argoftp12@'
    ftp.connect({host: host, user: user, password: password})
    .then(function (serverMessage) {
      console.log('Server message: '+serverMessage);
      return ftp.list('/');
    }).then(function (list) {
      console.log('Directory listing:');
      console.dir(list);
      return ftp.end();}).catch((err)=> {
          console.log("Nao consigo entrar")
      }); */

/* const PromiseFtp = require("promise-ftp");
getData = async (req, res) => {
const ftp = new PromiseFtp();
try {
    await ftp.connect({host: '3.14.244.193',user: 'user02',password: 'argoftp12@'});
    const stream = await ftp.get('/ReDRAFT_BG/Previsao.txt');
    res.type('txt');
    await new Promise((resolve, reject) => {
    console.log("Entrei aqui")
    res.on('finish', resolve);
    stream.once('error', reject);
    stream.pipe(res); 
    });
} catch(e) {
    console.error(e);
} finally {
    await ftp.end();
}
}
console.log(getData) */

/* var PromiseFtp = require('promise-ftp');
var fs = require('fs');

var ftp = new PromiseFtp();
var host = '3.14.244.193'
var user = 'user02'
var password = 'argoftp12@'
ftp.connect({host: host, user: user, password: password})
.then(function (serverMessage) {
    return ftp.get('/ReDRAFT_BG/Previsao.txt');
}).then(function (stream) {
    return new Promise(function (resolve, reject) {
    console.dir(stream)
    stream.once('close', resolve);
    stream.once('error', reject);
    stream.pipe(fs.createWriteStream('Previsao-copy.txt'));
  });
}).then(function () {
  return ftp.end();
}); */

/* var PromiseFtp = require('promise-ftp');
  
var ftp = new PromiseFtp();
var host = '3.14.244.193'
var user = 'user02'
var password = 'argoftp12@'
ftp.connect({host: host, user: user, password: password})
.then(function (serverMessage) {
  console.log('Server message: '+serverMessage);
  return ftp.list('/');
}).then(function (list) {
  console.log('Directory listing:');
  console.dir(list);
  return ftp.end();
}); */