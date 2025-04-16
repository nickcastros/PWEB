function Pessoa() {
  let peso = 0;
  let altura = 0;

  this.getPeso = function () {
    return peso;
  };

  this.setPeso = function (novoPeso) {
    peso = novoPeso;
  };

  this.getAltura = function () {
    return altura;
  };

  this.setAltura = function (novaAltura) {
    altura = novaAltura;
  };

  this.calcularIMC = function () {
    if (altura > 0) {
      return (peso / (altura * altura)).toFixed(2);
    } else {
      return "Altura inválida!";
    }
  };

  this.getCategoriaIMC = function (imc) {
    if (imc < 18.5) {
      return "Magreza";
    } else if (imc >= 18.5 && imc < 24.9) {
      return "Normal";
    } else if (imc >= 25 && imc < 29.9) {
      return "Sobrepeso";
    } else if (imc >= 30 && imc < 39.9) {
      return "Obesidade";
    } else {
      return "Obesidade Grave";
    }
  };
}
function calcularIMC() {
  const pesoInput = document.getElementById("peso").value;
  const alturaInput = document.getElementById("altura").value;

  const pessoa = new Pessoa();
  pessoa.setPeso(parseFloat(pesoInput));
  pessoa.setAltura(parseFloat(alturaInput));

  const imc = pessoa.calcularIMC();
  const categoria = pessoa.getCategoriaIMC(imc);

  document.getElementById("resultado").innerText = `Seu IMC é: ${imc}`;
  document.getElementById("categoria").innerText = `Categoria: ${categoria}`;
}
