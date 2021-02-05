import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/app.css"
import "./styles/mediaQueries.css"
import {ThemeProvider} from "./contexts/ThemeContext";
import {AuthProvider} from "./contexts/AuthContext"
import Dashboard from "./components/Dashboard"
import TheForm from "./components/TheForm"
import Mainplatform from "./components/Mainplatform";
import NewInfo from "./components/NewInfo";
import NewFoodSearch from "./components/NewFoodSearch"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/info" component={NewInfo} />
              <Route exact path="/form" component={TheForm} />
              <Route exact path="/dashboard" component={Mainplatform} />
              <Route exact path="/foodSearch" component={NewFoodSearch} />
            </Switch>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
