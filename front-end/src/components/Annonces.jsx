import React, { useState, useContext } from "react";
import "./styles/Connexion.css";
import { useHistory } from "react-router-dom";
import { state } from "../Context";

export default function Annonces() {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [categorie, setCategorie] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  let { stateNavBar } = useContext(state);

  const history = useHistory();

  const enregistrement = (event) => {
    event.preventDefault(); //éviter le comportement par défault des formulaires (s'actualiser à chaque click boutton)
    let produit = { nom, prix, categorie, quantity, description, photo };
    fetch("/annonce/", {
      method: "POST",
      body: JSON.stringify(produit),

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stateNavBar}`,
      },
    })
      .then((data) => data.json())
      .then((resultat) => {
        console.log(resultat);
        history.push("/");
        console.log(resultat);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div id="container">
      <form id="form" onSubmit={enregistrement}>
        <h1 className="ajout">Ajouter un produit</h1>
        <label className="labels">Nom</label>
        <input
          id="nom"
          type="text"
          placeholder="Entrez le nom du produit"
          value={nom}
          onChange={(event) => setNom(event.target.value)}
        />
        <label className="labels">Prix</label>
        <input
          id="prix"
          type="text"
          placeholder="Entrez le prix du produit"
          value={prix}
          onChange={(event) => setPrix(event.target.value)}
        />
        <label className="labels">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Entrez la description du produit"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <label className="labels">Categorie</label>
        <select
          id="select"
          value={categorie}
          onChange={(event) => setCategorie(event.target.value)}
        >
          <option value="">--Sélectionnez votre catégorie--</option>
          <option value="Accesoires">Accessoires</option>
          <option value="Technologies">Technologies</option>
          <option value="Vêtements">Vêtements</option>
          <option value="Electroménager">Electroménager</option>
        </select>

        <label className="labels">Quantité</label>
        <input
          id="quantity"
          type="number"
          placeholder="Entrez la quantité du produit"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />
        <label className="labels">Image</label>
        <input
          id="image"
          type="text"
          placeholder="Importez l'image du produit"
          alt=""
          value={photo}
          onChange={(event) => setPhoto(event.target.value)}
        />
        <input id="submit" type="submit" value="Créer l'annonce" />
      </form>
    </div>
  );
}
