class Funcionario {
  constructor(matricula) {
    this.matricula = matricula;
  }
  setFuncao(funcao) {
    this.funcao = funcao;
  }
}

var Funcionario1 = new Funcionario(123456);
Funcionario1.nome = "João da Silva";
Funcionario1.setFuncao("Gerente");
console.log(Funcionario1);

var Funcionario2 = {};
Funcionario2.matricula = 654321;
Funcionario2.nome = "Maria da Silva";
Funcionario2.funcao = "Analista";
console.log(Funcionario2);

var Funcionario3 = {
  matricula: 789012,
  nome: "Carlos da Silva",
  funcao: "Desenvolvedor",
};
console.log(Funcionario3);
