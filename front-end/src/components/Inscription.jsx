import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./styles/Connexion.css";
import { state } from "../Context";

export default function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  let { stateNavBar, setStateNavBar } = useContext(state);
  console.log(stateNavBar);

  const history = useHistory();

  const inscription = (event) => {
    event.preventDefault(); //éviter le comportement par défault des formulaires (s'actualiser à chaque click boutton)
    let user = { nom, prenom, email, password };
    fetch("/user/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((resultat) => {
        localStorage.setItem("token", resultat.token);
        setStateNavBar(resultat.token);
        history.push("/");
        console.log(resultat);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="container">
      <form id="form" onSubmit={inscription}>
        <h1>Inscription</h1>
        <label className="labels">Nom</label>
        <input
          id="nom"
          type="text"
          placeholder="Entrez votre nom"
          value={nom}
          onChange={(event) => setNom(event.target.value)}
        />
        <label className="labels">Prenom</label>
        <input
          id="prenom"
          type="text"
          placeholder="Entrez votre prénom"
          value={prenom}
          onChange={(event) => setPrenom(event.target.value)}
        />
        <label className="labels">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="labels">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label className="labels">Image</label>
        <input
          id="image"
          type="image"
          placeholder="Importez votre photo"
          alt=""
          value={photo}
          onChange={(event) => setPhoto(event.target.value)}
        />
        <input type="file" id="file" />
        <input id="submit" type="submit" value="Inscription" />
      </form>
    </div>
  );
}
