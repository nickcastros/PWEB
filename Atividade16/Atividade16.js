function abrirCurso() {
  const select = document.getElementById("cursos");
  const curso = select.value;

  if (curso === "") return;
  const confirmacao = confirm("Deseja abrir informações sobre este curso?");
  if (!confirmacao) {
    select.value = "";
    return;
  }

  let conteudo = "";
  switch (curso) {
    case "ads":
      conteudo =
        "<h2>Análise e Desenvolvimento de Sistemas</h2><p>Curso voltado ao desenvolvimento de softwares, aplicações web e mobile, banco de dados, e arquitetura de sistemas.</p>";
      break;
    case "fm":
      conteudo =
        "<h2>Fabricação Mecânica</h2><p>Curso focado em processos de fabricação, projetos mecânicos, usinagem, e controle de qualidade.</p>";
      break;
    case "log":
      conteudo =
        "<h2>Logística</h2><p>Curso que aborda cadeias de suprimentos, transporte, armazenagem e distribuição.</p>";
      break;
    case "gestp":
      conteudo =
        "<h2>Gestão da Produção Industrial</h2><p>Voltado para o planejamento, controle e otimização da produção industrial.</p>";
      break;
    case "polim":
      conteudo =
        "<h2>Polímeros</h2><p>Curso que trata da transformação e desenvolvimento de materiais plásticos e compósitos.</p>";
      break;
  }

  const novaJanela = window.open("", "curso", "width=600,height=300");
  novaJanela.document.write(`
      <html>
        <head>
          <title>Informações do Curso</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #333; }
            p { font-size: 16px; }
          </style>
        </head>
        <body>
          ${conteudo}
        </body>
      </html>
    `);

  select.value = "";
}
