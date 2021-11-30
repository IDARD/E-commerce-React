const express = require("express");

const router = express.Router();

const apiUsers = require("./apiUsers");

const User = require("../models/User");

const Produit = require("../models/Produit");

router.post("/", apiUsers.loggedIn, async (req, res) => {
  try {
    let data = await Produit.create(req.body);
    let user = await User.findById(req.payload.id);
    user.annonces.push(data); //ajouter l'annonce qu'on a créé à l'utilisateur connecté
    await user.save(); //il ne faut pas oublié de mettre à jour les données de l'utilisateur
    res.status(201).json({
      message: "Donnée est bien insérée !",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'insertion de la donnée !" + err,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let data = await Produit.find().limit(10);
    res.status(200).json({
      message: "Données récupérées avec succès !",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des données !" + err,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Produit.findById(id);
    res.status(200).json({
      message: "Donnée récupérée avec succès !",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération de la donnée !" + err,
    });
  }
});

router.put("/:id", apiUsers.loggedIn, (req, res) => {
  let { id } = req.params;
  Produit.findByIdAndUpdate(id, { $set: req.body })
    .then((data) => {
      res.status(200).json({
        message: "Donnée mise à jour",
        data: data,
      });
    })
    .catch((err) =>
      res.status(404).json({ message: "L'id n'existe pas" + err })
    );
});

router.delete("/:id", apiUsers.loggedIn, async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Produit.findByIdAndDelete(id);
    let user = await User.findById(req.payload.id);
    //id == 28
    // user.annonces -> [1, 16, 28, 34]
    user.annonces = user.annonces.filter((idProduit) => idProduit != id);
    await user.save();
    res.status(200).json({
      message: "Donnée supprimée avec succès !",
      data: data,
    });
  } catch (err) {
    res
      .status(404)
      .json({ message: `L'élément avec l'id ${id} n'existe pas !` + err });
  }
});

module.exports = router;
