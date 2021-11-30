import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import "./styles/Accueil.css";
import { state } from "../Context";

export default function Accueil() {
  const [listAnnonces, setListAnnonces] = useState([]);
  let { stateNavBar } = useContext(state);

  const history = useHistory();

  useEffect(() => {
    fetch("/annonce")
      .then((data) => data.json())
      .then((resultat) => {
        setListAnnonces(resultat.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const achatProduit = (id) => {
    fetch("/panier", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${stateNavBar}`,
      },
    })
      .then((data) => data.json())
      .then((resultat) => {
        history.push("/panier");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Page d'accueil</h1>
      <div className="containerProduit">
        {listAnnonces.map(
          ({ _id, nom, prix, categorie, quantity, description, photo }) => {
            return (
              <div key={_id} className="produit">
                <img src={photo} alt="produit" className="imgProduit" />
                <h2>{nom}</h2>
                <p>{prix} $</p>
                <p>{description}</p>
                <h3>{categorie}</h3>
                <p>{quantity}</p>
                <button
                  className="buttonAchat"
                  onClick={() => achatProduit(_id)}
                >
                  Achat
                </button>
                <button
                  className="buttonDetails"
                  onClick={() => history.push(`/annonce/${_id}`)}
                >
                  Détails
                </button>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
