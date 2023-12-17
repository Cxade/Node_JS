"use strict";

const http = require("http");
let count_home = 0;
let count_about = 0;
let count_not_found = 0;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.end(
        `<h1>Главная страница</h1>
        <a href='/about'>About page</a>
        <p>Home count: ${count_home++}</p>`
      );
      break;

    case "/about":
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.end(
        `<h1>Страница about</h1>
        <a href='/'>Home page</a>
        <p>About count: ${count_about++}</p>`
      );
      break;
    default:
      res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
      res.end(
        `<h1>Страница не найдена</h1>
        <a href='/'>Home page</a>
        <p>Not found count: ${count_not_found++}</p>`
      );
      break;
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
