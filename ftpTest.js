/* var http = require('http');
http.createServer().listen(8081);
console.log("Servidor esta aberto")
*/

/* const express = require('express');
const app = express();

app.get("/", function (req, res) {
})

app.listen(8081, function (req, res) {
  console.log("Teste de express")  
}); */

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

var downloadList = [ 'Previsao.txt'];

var c = new Client();
console.log(c.greeting)
c.on('ready', function() {

   console.log(c.pwd())
   c.list( '/MeDuSa_CELSE', function(err, list) {
    
     console.log(list);
     if (err) throw err;
     list.map(function(entry){
       console.log(entry.name)
       downloadList.push(entry.name);
       if ( entry.name.match(/tar\.gz$/) && entry.name.match(/^filename/) ){
      } 
    });  
    downloadList.map(function(file){
      // Download remote files and save it to the local file system:
      //console.log(list)
      //console.log(c.pwd())
      c.get('Previsao.txt', function(err, stream) {
        console.log("Entre3i")
        stream.on("data", function (data) {
          console.log(data.toString());
        })
        if (err) throw err;
        stream.once('close', function() { c.end(); });
        //console.log(stream)
        stream.pipe(fs.createWriteStream( "Previsao.txt"));

      }); 

    });

    c.end();

  });

}); 


c.connect(srcFTP);
*/

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













/* var ftpClient = require('ftp-client'),

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
DowloadDir = [
  {
    dirName: '/MeDuSa_CATTALINI',
    dirResult: 'MedusaResult'
  },
  {
    dirName: '/MeDuSa_CELSE',
    dirResult: 'MedusaResult'
  },
  {
    dirName: '/ReDRAFT_BTS',
    dirResult: 'MedusaResult'
  },
  {
    dirName: '/ReDRAFT_PORTOCEL',
    dirResult: 'MedusaResult'
  },

  ]

client.connect(function () {
  
    client.download('./MeDuSa_CATTALINI', './', {
        overwrite: 'all'
    }, function (result) {
      console.log(result)
    });

 
});  */






/* 
{
  localFileName: "MedusaResult/data_atualizacao2.txt",
  remoteFileName: "MeDuSa_CELSE/data_atualizacao.txt"
},
{
  localFileName: "MedusaResult/data_atualizacao3.txt",
  remoteFileName: "ReDRAFT_BTS/data_atualizacao.txt"
},
{
  localFileName: "MedusaResult/data_atualizacao4.txt",
  remoteFileName: "ReDRAFT_PORTOCEL/data_atualizacao.txt"
}, */


const ftp = require("basic-ftp")
const fs = require("fs")

dowloadDir = [
  {
    localFileName: "AtualizacaoMedusa/MeDuSa_CATTALINI_data.txt",
    remoteFileName: "MeDuSa_CATTALINI/data_atualizacao.txt"
  },
  {
    localFileName: "AtualizacaoMedusa/MeDuSa_CELSE_data.txt",
    remoteFileName: "MeDuSa_CELSE/data_atualizacao.txt"
  },
  {
    localFileName: "AtualizacaoMedusa/ReDRAFT_BTS_data.txt",
    remoteFileName: "ReDRAFT_BTS/data_atualizacao.txt"
  },
  {
    localFileName: "AtualizacaoMedusa/ReDRAFT_PORTOCEL_data.txt",
    remoteFileName: "ReDRAFT_PORTOCEL/data_atualizacao.txt"
  },
  {
    localFileName: "AtualizacaoMedusa/MeDuSa_CELSE_data.txt",
    remoteFileName: "MeDuSa_CELSE/data_atualizacao.txt"
  }
]

InputHost = {
    host: "18.188.99.243",
    user: "user02",
    password: "argoftp12@"
}

/* dowloadDir = [
  {
    localFileName: "AtualizacaoRedraft/MeDuSa_CATTALINI_data.txt",
    remoteFileName: "ReDRAFT_BG/data_atualizacao.txt",
  },
  {
    localFileName: "AtualizacaoRedraft/MeDuSa_CELSE_data.txt",
    remoteFileName: "ReDRAFT_ITAGUAI/data_atualizacao.txt",
  },
  {
    localFileName: "AtualizacaoRedraft/ReDRAFT_BTS_data.txt",
    remoteFileName: "ReDRAFT_SUAPE/data_atualizacao.txt",
  }
]

InputHost = {
  host: "3.14.244.193",
  user: "user02",
  password: "argoftp12@"
} 
 */


if(!fs.existsSync("AtualizacaoRedraft") || !fs.existsSync("AtualizacaoMedusa")){
  fs.mkdirSync("AtualizacaoRedraft", 0766, function(err){
      if(err){
          console.log(err);
          // echo the result back
          response.send("ERROR! Can't make the AtualizacaoRedraft! \n");
      }
  });
  fs.mkdirSync("AtualizacaoMedusa", 0766, function(err){
    if(err){
        console.log(err);
        // echo the result back
        response.send("ERROR! Can't make the AtualizacaoMedusa! \n");
    }
  });    
} 
ftpDowload(InputHost, dowloadDir)

async function ftpDowload(input, dowload) {
  const client = new ftp.Client(0)
  client.ftp.verbose = true
  try {
    client.trackProgress(info => {
      console.log("File", info.name)
      console.log("Type", info.type)
      console.log("Transferred", info.bytes)
      console.log("Transferred Overall", info.bytesOverall)
    })      
    await dataDowload(input, dowload, client);
    client.close()
  }
  catch(err) {
    console.log(err)
  }
} 

async function dataDowload(input, dowload, client){
  await client.access(input)
  for( const [index, list] of dowload.entries()){
    console.log(list.localFileName)
    console.log(list.remoteFileName)
    await client.downloadTo("./" + list.localFileName, 
          "./" + list.remoteFileName) 

  }
};
  
  









