function jogar(escolhaUsuario) {
    const opcoes = ["pedra", "papel", "tesoura"];
    escolhaUsuario = escolhaUsuario.toLowerCase();

    const escolhaComputador = opcoes[Math.floor(Math.random() * opcoes.length)];
    let resultado;

    if (escolhaUsuario === escolhaComputador) {
        resultado = "Empate!";
    } else if (
        (escolhaUsuario === "pedra" && escolhaComputador === "tesoura") ||
        (escolhaUsuario === "papel" && escolhaComputador === "pedra") ||
        (escolhaUsuario === "tesoura" && escolhaComputador === "papel")
    ) {
        resultado = "Você venceu!";
    } else {
        resultado = "Você perdeu!";
    }

    return {
        resultado,
        escolhaJogador: escolhaUsuario,
        escolhaComputador
    };
}

function atualizarResultado(escolhaUsuario) {
    const jogo = jogar(escolhaUsuario);

    const escolhaComputadorElement = document.getElementById("escolha-computador");
    if (escolhaComputadorElement) {
        escolhaComputadorElement.textContent = jogo.escolhaComputador;
    }

    const resultadoElement = document.getElementById("resultado");
    if (resultadoElement) {
        resultadoElement.textContent = jogo.resultado;
    }
}
