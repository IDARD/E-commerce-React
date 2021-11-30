import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Accueil from "./components/Accueil";
import Annonces from "./components/Annonces";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import NavBar from "./components/NavBar";
import Panier from "./components/Panier";
import { state } from "./Context";
import { useState } from "react";
import Details from "./components/Details";

function App() {
  const token = localStorage.token ? localStorage.token : "";
  const [stateNavBar, setStateNavBar] = useState(token);
  return (
    <Router>
      <state.Provider value={{ stateNavBar, setStateNavBar }}>
        <NavBar />
        {/* NavBar à l'extérieur de Switch pour qu'il soir présent sur toutes les pages */}
        <Switch>
          <Route path="/" exact render={() => <Accueil />} />
          <Route path="/inscription" exact render={() => <Inscription />} />
          <Route path="/connexion" exact render={() => <Connexion />} />
          <Route path="/panier" exact render={() => <Panier />} />
          <Route path="/annonces" exact render={() => <Annonces />} />
          <Route path="/annonce/:id" exact render={() => <Details />} />
        </Switch>
      </state.Provider>
    </Router>
  );
}

export default App;
