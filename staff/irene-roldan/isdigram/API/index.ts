import express from "express";
import logic from "./logic/index.ts";

const api = express();

const jsonBodyParser = express.json();

//register
api.post("/users", jsonBodyParser, (req, res) => {
  try {
    const { name, birthdate, email, username, password } = req.body;

    logic.registerUser(name, birthdate, email, username, password, (error) => {
      if (error) {
        res
          .status(400)
          .json({ error: error.constructor.name, message: error.message });

        return;
      }

      res.status(201).send();
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

api.get("/", (req, res) => {
  try {
    res.send(`<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API</title>
  </head>
  
  <body>
      <h1>Hello! from API</h1>
  </body>
  
  </html>`);
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

//login

api.post("/login", jsonBodyParser, (req, res) => {
  try {
    const { username, password } = req.body;

    logic.loginUser(username, password, (error) => {
      if (error) {
        res
          .status(400)
          .json({ error: error.constructor.name, message: error.message });

        return;
      }

      res.status(200).send();
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

api.post("/retrieveUser", jsonBodyParser, (req, res) => {
  try {
    const { userId } = req.body;

    logic.registerUser(userId, (error, user) => {
      if (error) {
        res
          .status(400)
          .json({ error: error.constructor.name, message: error.message });

        return;
      }

      res.status(200).send(user);
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

api.post("/logoutUser", jsonBodyParser, (req, res) => {
  try {
    const { userId } = req.body;

    logic.logoutUser(userId);

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: error.constructor.name, message: error.message });
  }
});

api.listen(8080, () => console.log("API listening on port 8080"));

//curl -X POST -H "Content-Type: application/json" -d '{"name":"Pepito Grillo","birthdate":"2000-01-01","email":"pepito@grillo.com","username":"pepitogrillo","password":"123qwe123"}' http://localhost:8080/users -v

//curl -X POST -H "Content-Type: application/json" -d '{"username":"pepitogrillo","password":"123qwe123"}' http://localhost:8080/login -v

//curl -X POST -H "Content-Type: application/json" -d '{"userId":"8x8juiqi52g"}' http://localhost:8080/retrieveUser

//curl -X POST -H "Content-Type: application/json" -d '{"userId":"n2bowh28pio"}' http://localhost:8080/logoutUser
