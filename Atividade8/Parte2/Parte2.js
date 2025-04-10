function findBiggest() {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const num3 = parseFloat(document.getElementById("num3").value);

  if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
    alert("Por favor, insira numeros válidos!");
    return;
  }

  const biggest = Math.max(num1, num2, num3);
  alert(`O maior número é: ${biggest}`);
}

// Function 2: Sort numbers
function sortNumbers() {
  const num1 = parseFloat(document.getElementById("sortNum1").value);
  const num2 = parseFloat(document.getElementById("sortNum2").value);
  const num3 = parseFloat(document.getElementById("sortNum3").value);

  if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
    alert("Por favor, insira numeros válidos!");
    return;
  }

  const sorted = [num1, num2, num3].sort((a, b) => a - b);
  alert(`Numeros ordenados: ${sorted.join(", ")}`);
}

// Function 3: Check if a string is a palindrome
function checkPalindrome() {
  const input = document.getElementById("palindromeInput").value.trim();
  if (!input) {
    alert("Por favor, insira um texto válido");
    return;
  }

  const reversed = input.split("").reverse().join("");
  if (input === reversed) {
    alert(`"${input}" é um palindromo`);
  } else {
    alert(`"${input}" não é um palindromo`);
  }
}

function checkRightTriangle() {
  const side1 = parseFloat(document.getElementById("side1").value);
  const side2 = parseFloat(document.getElementById("side2").value);
  const side3 = parseFloat(document.getElementById("side3").value);

  if (isNaN(side1) || isNaN(side2) || isNaN(side3)) {
    alert("Por favor, insira numeros válidos!");
    return;
  }

  const sides = [side1, side2, side3].sort((a, b) => a - b);
  const [a, b, c] = sides;

  if (a ** 2 + b ** 2 === c ** 2) {
    alert("Os números podem formar um trinagulo retangulo.");
  } else {
    alert("Os números não formam um trinagulo retangulo.");
  }
}
