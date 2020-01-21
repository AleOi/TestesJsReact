const ftp = require("basic-ftp");
const fs = require("fs");

/* const pathLocal = "AtualizacaoMedusa/"
 dowloadDir = [
  {
    localFileName: pathLocal + "MeDuSa_CATTALINI_data.txt",
    remoteFileName: "MeDuSa_CATTALINI/data_atualizacao.txt"
  },
  {
    localFileName: pathLocal + "MeDuSa_CELSE_data.txt",
    remoteFileName: "MeDuSa_CELSE/data_atualizacao.txt"
  },
  {
    localFileName: pathLocal + "ReDRAFT_BTS_data.txt",
    remoteFileName: "ReDRAFT_BTS/data_atualizacao.txt"
  },
  {
    localFileName: pathLocal + "ReDRAFT_PORTOCEL_data.txt",
    remoteFileName: "ReDRAFT_PORTOCEL/data_atualizacao.txt"
  },
  {
    localFileName: pathLocal + "MeDuSa_CELSE_data.txt",
    remoteFileName: "MeDuSa_CELSE/data_atualizacao.txt"
  }
]

inputHost = {
  host: "18.188.99.243",
  user: "user02",
  password: "argoftp12@"
} */

const pathLocal = "AtualizacaoRedraft/"

dowloadDir = [
  {
    localFileName: pathLocal + "MeDuSa_CATTALINI_data.txt",
    remoteFileName: "ReDRAFT_BG/data_atualizacao.txt", 
  },
  {
    localFileName: pathLocal + "MeDuSa_CELSE_data.txt",
    remoteFileName: "ReDRAFT_ITAGUAI/data_atualizacao.txt",
  },
  {
    localFileName: pathLocal + "ReDRAFT_BTS_data.txt",
    remoteFileName: "ReDRAFT_SUAPE/data_atualizacao.txt",
  },
]

inputHost = {
  host: "3.14.244.193",
  user: "user02",
  password: "argoftp12@"
} 


// Criando Diretorios AtualizacaoRedraft e AtualizacaoMedusa caso não exista
if(!fs.existsSync("AtualizacaoRedraft") || !fs.existsSync("AtualizacaoMedusa")){
  fs.mkdirSync("AtualizacaoRedraft", 0766, function(err){
    if(err){
      console.log(err);
      response.send("ERROR! Can't make the AtualizacaoRedraft! \n");
    }
  });
  fs.mkdirSync("AtualizacaoMedusa", 0766, function(err){
    if(err){
      console.log(err);
      response.send("ERROR! Can't make the AtualizacaoMedusa! \n");
    }
  });    
} 
// Dowload dos dados
/* 
entrada:dowloadDir{localFileName, remoteFileName}: 
pathLocal => caminho entre __dirname e a pasta AtualizacaoRedraft/AtualizacaoMedusa
remoteFileName => Diretorio remoto
localFileName => Seu Diretorio 
inputHost{host, user,password}: necessario para o ftp
saída:
*/

// Chame dataDowload
async function ftpDowload(input, dowload) {
  const client = new ftp.Client(0);
  client.ftp.verbose = true;
  try {
    /*client.trackProgress(info => {
      console.log("File", info.name)
      console.log("Type", info.type)
      console.log("Transferred", info.bytes)
      console.log("Transferred Overall", info.bytesOverall) 
    })*/
    var text = await dataDowload(input, dowload, client);
    client.close();
    return text;
  }
  catch(err) {
    console.log(err);
  }
} 

// Faz o dowload e chama ReadingLocal
async function dataDowload(input, dowload, client){
  await client.access(input)
  var text = []
  for await ( const [index, list] of dowload.entries()){
    //console.log(list.localFileName)
    //console.log(list.remoteFileName)
    await client.downloadTo("./" + list.localFileName,
      "./" + list.remoteFileName)
    await readingLocal(list.localFileName, text, index);
  }
  //console.log(text)
  return text
}

// cria o vetor de texto na variavel text
async function readingLocal(localFileName, text, index) {
  fs.access(__dirname + "/" + localFileName, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
    }
    //console.log({[localFileName]: index});
    var stream;
    stream = fs.createReadStream(__dirname + "/" + localFileName);
    stream.on("data", (data) => {
      var chunk  = data.toString();
      var tmp = localFileName.split("/");
      text.push({[tmp[tmp.length - 1]]: chunk});
    });
  })
  return text
}

// Visualiza os resultados
async function seeAsync(text){
  setTimeout(function(){console.log(text)}, 5000);
  
}

text = ftpDowload(inputHost, dowloadDir)
seeAsync(text);

