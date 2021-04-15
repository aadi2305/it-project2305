import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/app.css"
import "./styles/mediaQueries.css"
import {ThemeProvider} from "./contexts/ThemeContext";
import {AuthProvider} from "./contexts/AuthContext"
import Dashboard from "./components/Dashboard"
import FrontPage from "./components/FrontPage"
import BookInfo from "./components/BookInfo"
import Cart from "./components/Cart"
import WishList from "./components/WishList"
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/frontPage" component={FrontPage} />
              <Route exact path="/bookInfo" component={BookInfo} />
              <Route exact path="/wishList" component={WishList} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/bookInfo" component={BookInfo} />
            </Switch>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
