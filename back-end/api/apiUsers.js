const express = require("express");

const router = express.Router();

require("dotenv").config();

const User = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    let data = await User.create(req.body);
    let token = jwt.sign({ id: data._id }, process.env.PRIVATE_KEY);
    res.status(201).json({
      message: "L'utilisateur est bien créé !",
      data,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'inscription !" + err,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne().where("email").equals(email);
    if (user) {
      let isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        let token = jwt.sign({ id: user._id }, process.env.PRIVATE_KEY);
        //on a donné user._id comme payload, donc on peut passer n'importe quelle info qu'on veut récupérer après du payload
        res.json({
          message: "Connexion établie !",
          token,
        });
      } else {
        res.json({ message: "Mot de passe invalide !" });
      }
    } else {
      res.status(404).json({ message: "L'utilisateur n'existe pas !" });
    }
  } catch {
    res.status(500).json({ message: "Erreur lors de la connexion !" });
  }
});

function loggedIn(req, res, next) {
  let token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.PRIVATE_KEY, function (err, payload) {
    if (err) {
      res.status(401).json({
        message: "Veuillez vous connecter !",
      });
    } else {
      req.payload = payload;
      next();
    }
  });
}

router.get(":/id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await User.findById(id);
    res.json({ data });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/secret", loggedIn, async (req, res) => {
  res.json({
    message: "Utilisateur authentifié",
  });
});

module.exports = { router, loggedIn };

//Page inscription ==> route: /inscription
//Page connexion ==> route: /connexion
//Page d'accueil ==> route: /
//Page panier ==> route: /panier
//Page annonces ==> route: /annonces
//Page Profil ==> route: /profil
//Page Detail ===> route: /annonce/id

//NavBar
