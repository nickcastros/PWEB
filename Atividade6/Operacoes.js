let num1 = parseFloat(prompt("Digite o primeiro número:"));
let num2 = parseFloat(prompt("Digite o segundo número:"));

let soma = num1 + num2;
let subtracao = num1 - num2;
let produto = num1 * num2;
let divisao = num1 / num2;
let resto = num1 % num2;

alert(`
    Operações entre ${num1} e ${num2}:
    Soma: ${soma}
    Subtração: ${subtracao}
    Produto: ${produto}
    Divisão: ${divisao.toFixed(2)}
    Resto da divisão: ${resto}
`);