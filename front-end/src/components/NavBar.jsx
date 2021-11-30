import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./styles/NavBar.css";
import { state } from "../Context";

export default function NavBar() {
  let { stateNavBar, setStateNavBar } = useContext(state);

  function deconnexion() {
    localStorage.setItem("token", "");
    setStateNavBar("");
  }

  if (stateNavBar === "") {
    return (
      <nav>
        <Link id="titre" to="/">
          Ilham Shop
        </Link>
        <ul>
          <Link to="/Connexion" className="links">
            <button className="boutons" type="button">
              Connexion
            </button>
          </Link>
          <Link to="Inscription" className="links">
            <button className="boutons" type="button">
              Inscription
            </button>
          </Link>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav>
        <Link id="titre" to="/">
          Ilham Shop
        </Link>
        <ul>
          <Link to="/panier">
            <button className="boutons" type="button">
              Panier
            </button>
            {/* <img src={panier} alt="" id="panier" /> */}
          </Link>
          <Link to="/annonces">
            <button className="boutons" type="button">
              Annonces
            </button>
            {/* <img src={annonces} alt="" id="annonces" /> */}
          </Link>
          <Link to="/">
            <button className="boutons" type="button" onClick={deconnexion}>
              Déconnexion
            </button>
            {/* <img src={deconx} alt="" id="deconx" /> */}
          </Link>
        </ul>
      </nav>
    );
  }
}
