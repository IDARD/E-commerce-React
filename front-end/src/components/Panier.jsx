import React, { useEffect, useContext, useState } from "react";
import { state } from "../Context";
import "./styles/Details.css";

export default function Panier() {
  let { stateNavBar } = useContext(state);
  const [listProduit, setListProduit] = useState([]);
  const [listID, setListID] = useState([]);

  useEffect(() => {
    fetch("panier", {
      headers: { Authorization: `Bearer ${stateNavBar}` },
    })
      .then((data) => data.json())
      .then((resultat) => setListID(resultat.data))
      .catch((erreur) => console.log(erreur));
  }, [stateNavBar]);

  useEffect(() => {
    listID.forEach((id) => {
      fetch(`/panier/${id}`)
        .then((data) => data.json())
        .then((produit) => setListProduit((prev) => [produit.data, ...prev]))
        .catch((err) => console.log(err));
    });
  }, [listID]);

  return (
    <div>
      <h1>Page Panier</h1>
      {listProduit === [] ? (
        <h1>Votre panier est vide</h1>
      ) : (
        listProduit.map((produit) => (
          <div className="containerDeProduit" key={produit._id}>
            <img src={produit.photo} alt="produit" className="imgDeProduit" />
            <div>
              <h1 className="nomDetail">{produit.nom}</h1>
              <b>Prix: {produit.prix} $</b>
              <p>Quantity: {produit.quantity}</p>
              <p>{produit.description}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
