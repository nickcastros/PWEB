document.getElementById("texto").addEventListener("input", function () {
  atualizarTexto();
});

document.getElementById("maiusculo").addEventListener("change", function () {
  atualizarTexto();
});

document.getElementById("minusculo").addEventListener("change", function () {
  atualizarTexto();
});

function atualizarTexto() {
  const input = document.getElementById("texto");
  const maiusculo = document.getElementById("maiusculo").checked;

  if (maiusculo) {
    input.value = input.value.toUpperCase();
  } else {
    input.value = input.value.toLowerCase();
  }
}
