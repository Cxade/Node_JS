const express = require('express');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'users.json');

const schema = Joi.object({
  firstName: Joi.string().min(2).required(),
  secondName: Joi.string().min(2).required(),
  city: Joi.string().min(2),
  age: Joi.number().min(0).required(),
});

const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
  fs.readFile(pathToFile, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      res.send({ users });
    }
  });
});

app.post('/users', (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({ error: result.error.details });
  }
  fs.readFile(pathToFile, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      const userId = users[users.length - 1].id + 1;
      users.push({ id: userId, ...req.body });
      fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send({ id: userId });
        }
      });
    }
  });
});

app.put('/users/:id', (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({ error: result.error.details });
  }
  fs.readFile(pathToFile, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      const id = +req.params.id;
      const user = users.find((user) => user.id === id);
      if (user) {
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.city = req.body.city;
        user.age = req.body.age;
        fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ user });
          }
        });
      } else {
        res.status(404);
        res.send({ user });
      }
    }
  });
});

app.get('/users/:id', (req, res) => {
  fs.readFile(pathToFile, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      const id = +req.params.id;
      const user = users.find((user) => user.id === id);
      if (user) {
        res.send({ user });
      } else {
        res.status(404);
        res.send({ user: null });
      }
    }
  });
});

app.delete('/users/:id', (req, res) => {
  fs.readFile(pathToFile, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const users = JSON.parse(data);
      const id = +req.params.id;
      const user = users.find((user) => user.id === id);
      if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFile(pathToFile, JSON.stringify(users, null, 2), (err) => {
          if (err) {
            console.log(err);
          } else {
            res.send({ user });
          }
        });
      } else {
        res.status(404);
        res.send({ user: null });
      }
    }
  });
});

app.listen(3000);
