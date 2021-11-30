import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./styles/Details.css";

export default function Details() {
  const { id } = useParams();
  const [produit, setProduit] = useState("");

  const history = useHistory();

  useEffect(() => {
    fetch(`/annonce/${id}`)
      .then((data) => data.json())
      .then((resultat) => {
        setProduit(resultat.data);
        console.log(resultat);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="parent">
      <button className="buttonReset" onClick={() => history.goBack()}>
        Retour
      </button>
      <div className="containerDeProduit">
        <img src={produit.photo} alt="produit" className="imgDeProduit" />
        <div key={id} className="deProduit">
          <p id="id">ID: {id} $</p>
          <h2 id="nom">{produit.nom}</h2>
          <p>Prix: {produit.prix} $</p>
          <p>Catégorie: {produit.categorie}</p>
          <p>Quantity: {produit.quantity}</p>
          <p>{produit.description}</p>
        </div>
      </div>
    </div>
  );
}
