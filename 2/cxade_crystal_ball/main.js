function generatePrediction() {
  const pred = Math.floor(Math.random() * 10);
  switch (pred) {
    case 0:
      return "Бог рандома не на твоей стороне";
    case 1:
      return "Ты серьезно? Конечно нет!";
    case 2:
      return "Вполне вероятно";
    case 3:
      return "Стоит рискнуть";
    case 4:
      return "Не стоит рисковать";
    case 5:
      return `Даю ${Math.floor(Math.random() * 100)}% на успех`;
    case 6:
      return `Даю ${Math.floor(Math.random() * 100)}% на неудачу`;
    case 7:
      return "Ну, тут даже я бессилен";
    case 8:
      return "Ты получишь власть, которая и не снилась твоему отцу!";
    case 9:
      return "Чёрт, давно пора!";
  }
}

function prediction(action) {
  if (typeof action === "string") {
    console.log("Твой вопрос: " + action);
    console.log("На него найдется ответ, дай шару поразмыслить");
    setTimeout(() => {
      console.log(generatePrediction());
    }, 2000);
  } else {
    throw new TypeError("Шар отвечает только на текстовый запрос");
  }
}

module.exports = { prediction };
