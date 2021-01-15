import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/app.css"
import "./styles/mediaQueries.css"
import Dashboard from "./components/Dashboard"

function App() {
  return (
    <div className="App">
        <Router>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                </Switch>
        </Router>
    </div>
  );
}

export default App;
