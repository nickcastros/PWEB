const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Conta {
  getBanco() {
    return this.banco;
  }
  setBanco(banco) {
    this.banco = banco;
  }

  getNome() {
    return this.nome;
  }

  setNome(nome) {
    this.nome = nome;
  }

  getNumero() {
    return this.numero;
  }

  setNumero(numero) {
    this.numero = numero;
  }

  getSaldo() {
    return this.saldo;
  }

  setSaldo(saldo) {
    this.saldo = saldo;
  }
}

class ContaCorrente extends Conta {
  getSaldoEspecial() {
    return this.saldoEspecial;
  }
  setSaldoEspecial(saldoEspecial) {
    this.saldoEspecial = saldoEspecial;
  }
}

class ContaPoupanca extends Conta {
  getTaxaJuros() {
    return this.taxaJuros;
  }
  setTaxaJuros(taxaJuros) {
    this.taxaJuros = taxaJuros;
  }
  getDataVenciomento() {
    return this.dataVenciomento;
  }
  setDataVenciomento(dataVenciomento) {
    this.dataVenciomento = dataVenciomento;
  }
}

var contaCorrente = new ContaCorrente();

rl.question("Digite o banco da conta Corrente: ", (banco) => {
  contaCorrente.setBanco(banco);
  rl.question("Digite o numero da conta Corrente: ", (numero) => {
    contaCorrente.setNumero(numero);
    rl.question("Digite o nome do correntista: ", (nome) => {
      contaCorrente.setNome(nome);
      rl.question("Digite o saldo do correntista: ", (saldo) => {
        contaCorrente.setSaldo(saldo);
        rl.question(
          "Digite o saldo especial do correntista: ",
          (saldoEspecial) => {
            contaCorrente.setSaldoEspecial(saldoEspecial);
            console.log("Conta Corrente:");
            console.log("Banco: " + contaCorrente.getBanco());
            console.log("Nome: " + contaCorrente.getNome());
            console.log("Número: " + contaCorrente.getNumero());
            console.log("Saldo: " + contaCorrente.getSaldo());
            console.log("Saldo Especial: " + contaCorrente.getSaldoEspecial());

            var contaPoupanca = new ContaPoupanca();

            rl.question("Digite o banco da conta Poupança: ", (banco) => {
              contaPoupanca.setBanco(banco);
              rl.question("Digite o numero da conta Poupança: ", (numero) => {
                contaPoupanca.setNumero(numero);
                rl.question("Digite o nome do cliente: ", (nome) => {
                  contaPoupanca.setNome(nome);
                  rl.question("Digite o saldo do cliente: ", (saldo) => {
                    contaPoupanca.setSaldo(saldo);
                    rl.question("Digite a taxa de juros: ", (taxaJuros) => {
                      contaPoupanca.setTaxaJuros(taxaJuros);
                      rl.question(
                        "Digite a data de vencimento: ",
                        (dataVenciomento) => {
                          contaPoupanca.setDataVenciomento(dataVenciomento);
                          console.log("Conta Poupança:");
                          console.log("Banco: " + contaPoupanca.getBanco());
                          console.log("Nome: " + contaPoupanca.getNome());
                          console.log("Número: " + contaPoupanca.getNumero());
                          console.log("Saldo: " + contaPoupanca.getSaldo());
                          console.log(
                            "Taxa de Juros: " + contaPoupanca.getTaxaJuros()
                          );
                          console.log(
                            "Data de Vencimento: " +
                              contaPoupanca.getDataVenciomento()
                          );
                          rl.close();
                        }
                      );
                    });
                  });
                });
              });
            });
          }
        );
      });
    });
  });
});
