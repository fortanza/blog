// Librairies
import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";

// Composants
import Layout from "./hoc/Layout/layout";
import Home from "./Containers/Home/Home";
import Contact from "./Components/Contact/Contact";
import Articles from "./Containers/Articles/Articles";
import Article from "./Containers/Articles/Article/Article";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route path={routes.CONTACT} component={Contact} />
          <Route exact path={routes.ARTICLES} component={Articles} />
          <Route exact path={routes.ARTICLES + "/:id"} component={Article} />
          <Route render={() => <h1>Erreur 404 </h1>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
