let surveyData = [];
const maxInputs = 5;

function handleSurveySubmit(event) {
  event.preventDefault();

  const age = parseInt(document.getElementById("age").value);
  const sex = document.getElementById("sex").value;
  const evaluation = event.submitter.value;

  surveyData.push({ age, sex, evaluation });

  alert("Obrigado pela sua opnião");

  document.getElementById("age").value = "";
  document.getElementById("sex").value = "";

  if (surveyData.length === maxInputs) {
    showSurveyResults();
    surveyData = [];
  }
}

function showSurveyResults() {
  const ages = surveyData.map((entry) => entry.age);
  const maxAge = Math.max(...ages);
  const minAge = Math.min(...ages);
  const avgAge = (
    ages.reduce((sum, age) => sum + age, 0) / ages.length
  ).toFixed(2);

  const evaluations = surveyData.map((entry) => entry.evaluation);
  const pessimoCount = evaluations.filter((eval) => eval === "péssimo").length;

  const sexCounts = surveyData.reduce(
    (counts, entry) => {
      counts[entry.sex] = (counts[entry.sex] || 0) + 1;
      return counts;
    },
    { male: 0, female: 0, other: 0 }
  );

  alert(
    `Resultados da Pesquisa:\n` +
      `- Maior Idade: ${maxAge}\n` +
      `- Menor Idade: ${minAge}\n` +
      `- Média de Idades: ${avgAge}\n` +
      `- "Péssimo": ${pessimoCount}\n` +
      `- Masculino: ${sexCounts.male}\n` +
      `- Feminino: ${sexCounts.female}\n` +
      `- Outros: ${sexCounts.other}`
  );
}
