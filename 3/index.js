/*
Напишите HTTP сервер на express и реализуйте два обработчика “/” и “/about”, где:

— На каждой странице реализован счетчик просмотров
— Значение счетчика необходимо сохранять в файл каждый раз, когда обновляется страница
— Также значение счетчика должно загружаться из файла, когда запускается обработчик страницы
— Таким образом счетчик не должен обнуляться каждый раз, когда перезапускается сервер.
*/

const express = require('express');
const app = express();
const fs = require('fs');

const counterData = fs.readFileSync('counter.json', 'utf8');
const counter = JSON.parse(counterData);

app.get('/', (req, res) => {
  counter.home++;
  fs.writeFileSync('counter.json', JSON.stringify(counter));
  res.send(
    '<h1>Корневая страница</h1>' +
      `<p>просмотров: ${counter.home}</p>` +
      '<a href="/about">Ссылка на страницу /about</a>'
  );
});
app.get('/about', (req, res) => {
  counter.about++;
  fs.writeFileSync('counter.json', JSON.stringify(counter));
  res.send(
    '<h1>Страница about</h1>' +
      `<p>просмотров: ${counter.about}</p>` +
      '<a href="/">Ссылка на страницу /</a>'
  );
});

app.listen(3000);
