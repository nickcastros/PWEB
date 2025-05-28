const prompt = require("prompt-sync")();
function saudacao(nome) {
  return `Olá, ${nome}!`;
}

function entradaNome() {
  const nome = prompt("Qual é o seu nome?");
  callback(nome);
}

function callback(nome) {
  const mensagem = saudacao(nome);
  console.log(mensagem);
}

entradaNome();
