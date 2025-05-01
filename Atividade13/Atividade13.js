const windowImage = document.getElementById("window-image");
const title = document.querySelector("h1");

// Substitua os nomes das imagens pelos caminhos corretos no seu projeto
const closedWindow = "Closed.PNG";
const openWindow = "Opened.PNG";
const brokenWindow = "Broken.PNG";

windowImage.addEventListener("mouseover", () => {
  windowImage.src = openWindow;
  title.innerHTML = "Janela Aberta";
});

windowImage.addEventListener("mouseout", () => {
  windowImage.src = closedWindow;
  title.innerHTML = "Janela Fechada";
});

windowImage.addEventListener("click", () => {
  windowImage.src = brokenWindow;
  title.innerHTML = "Janela Quebrada";
});
