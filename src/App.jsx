import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/app.css"
import "./styles/mediaQueries.css"
import {ThemeProvider} from "./contexts/ThemeContext";
import {AuthProvider} from "./contexts/AuthContext"


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
