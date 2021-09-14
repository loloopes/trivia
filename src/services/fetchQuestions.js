const fetchQuestions = async (category,
  difficulty,
  type,
  token) => {
  let resultsArray = [];
  if (category && difficulty && type) {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}&encode=url3986`);
    const { results } = await response.json();
    resultsArray = results;
  } else {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}&encode=url3986`);
    const { results } = await response.json();
    resultsArray = results;
  }
  const decodedResults = resultsArray.map((result) => ({
    ...result,
    category: decodeURIComponent(result.category),
    question: decodeURIComponent(result.question),
    correct_answer: decodeURIComponent(result.correct_answer),
    sorted_answers: [
      ...result.incorrect_answers.map((answer) => decodeURIComponent(answer)),
      decodeURIComponent(result.correct_answer),
    ].sort(),
  }));
  return decodedResults;
};
// Criar função separada na pasta "services"  OK
// Tratar embaralhamento e decodificação nesse arquivo /\.
// Como sempre saber qual é a certa: ao invés de fazer array de strings, fazer array de objetos com o marcador de "certa" ou "errada".
// Utilizar map no array results, montando objeto com respostas embaralhadas para cada pergunta.
// Opções para decodificação: atob (depreciada), decodeURIComponent();

export default fetchQuestions;
