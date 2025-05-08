document.visitForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const elementos = document.visitForm.elements;
  const primeiraVez = elementos["primeiraVez"].value;

  if (primeiraVez === "sim") {
    alert("Volte sempre à página");
  } else if (primeiraVez === "nao") {
    alert("Que bom que você voltou a visitar esta página!");
  } else {
    alert("Por favor, selecione se é a primeira vez.");
  }

  document.visitForm.reset();
});
