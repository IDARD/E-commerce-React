const express = require("express");

const router = express.Router();

const Produit = require("../models/Produit");
const User = require("../models/User");

const apiUsers = require("./apiUsers");

router.post("/", apiUsers.loggedIn, async (req, res) => {
  try {
    let { id } = req.body;
    let user = await User.findById(req.payload.id);
    //id représente l'id du produit (l'annonce) qu'on veut acheter
    user.panier.push(id);
    await user.save();
    res.json({ message: "Annonce ajouté au panier !", id });
  } catch (err) {
    res.json({ message: "Erreur lors de l'ajout au panier !" + err });
  }
});

router.get("/", apiUsers.loggedIn, async (req, res) => {
  try {
    let user = await User.findById(req.payload.id);
    let data = user.panier;
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

router.delete("/:id", apiUsers.loggedIn, async (req, res) => {
  try {
    let { id } = req.params;
    let user = await User.findById(req.payload.id);
    user.panier = user.panier.filter((idProduit) => idProduit != id);
    await user.save();
    res.json({ message: "Annonce supprimée du panier !" });
  } catch (err) {
    res
      .status(404)
      .json({ message: `L'élément avec l'id ${id} n'existe pas !` + err });
  }
});

module.exports = router;
