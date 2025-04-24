const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Retangulo {
  constructor(base, altura) {
    this.base = base;
    this.altura = altura;
  }

  calcularArea() {
    return this.base * this.altura;
  }
}

rl.question("Digite a largura do retangulo: ", (largura) => {
  rl.question("Digite a altura do retangulo: ", (altura) => {
    var rect = new Retangulo(largura, altura);
    console.log("Área do retângulo: " + rect.calcularArea());
  });
});
