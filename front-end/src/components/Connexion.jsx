import React, { useState, useContext } from "react";
import "./styles/Connexion.css";
import { state } from "../Context";
import { useHistory } from "react-router-dom";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setStateNavBar } = useContext(state);

  const history = useHistory();

  const connexion = (event) => {
    event.preventDefault();
    let user = { email, password };
    fetch("/user/login", {
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
      <form id="form" onSubmit={connexion}>
        <h1 className="connexion">Connexion</h1>
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
        <input id="submit" type="submit" value="Connexion" />
      </form>
    </div>
  );
}
