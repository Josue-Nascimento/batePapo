let usuario = prompt("Qual seu nome");

let body = {
    name: usuario,
};



/*let env = {
  from: usuario,
  to: "",
  text: "",
  type: "",
};
*/
let mensagens = [];

const enviar = document.querySelector(".enviar");

function entrarConversa() {
  let promessa = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",body);
  promessa.then(entramos);
  promessa.catch(deuErro);
}

function entramos(resposta) {
  pegarMensagens();
}

function deuErro(err) {
}
entrarConversa();

function pegarMensagens() {
  let promessa = axios.get(
    "https://mock-api.driven.com.br/api/v6/uol/messages"
  );
  promessa.then(renderizarMensagens);
}

function renderizarMensagens(res) {
  mensagens = res.data;
  const listaMsg = document.querySelector(".entrarsala");

  let tipoMensagem = "";
  for (let i = 0; i < mensagens.length; i++) {

    if (i === 0) {
      listaMsg.innerHTML = ""
  }

    if(mensagens[i].type === "status"){
      tipoMensagem = `
       <li class="logou mensagem${i}">
          (${mensagens[i].time}) <strong>${mensagens[i].from}</strong> - ${mensagens[i].text}
      </li>`
    }
    else{tipoMensagem = `<li class="separa mensagem${i}">
    <strong>(${mensagens[i].time})</strong> <strong>${mensagens[i].from} </strong> - para <strong>${mensagens[i].to}</strong>: ${mensagens[i].text}
  </li>`};
    
    listaMsg.innerHTML += tipoMensagem
    const men = document.querySelector(`.mensagem${i}`)
        men.scrollIntoView()
  }
}

function manter(){
    const promessa = axios.post ("https://mock-api.driven.com.br/api/v6/uol/status", body)
    promessa.then(nada)
}
function nada(res){
  console.log(res)
}
setInterval (manter, 5000)
setInterval (pegarMensagens, 2000)

function botaoEnviar(){
  let msg = {
    from: usuario,
    to: "Todos",
    text: document.querySelector("input").value,
    type: "message" 
  }
  const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", msg)
  promessa.then(() => {
    document.querySelector("input").value = ""
    pegarMensagens
  } )
}


