import './App.css';
import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Pantry from "./Pantry";
import Saved from "./Saved";
import Browse from "./Browse";
import Recipe from "./Recipe";
import NewRecipe from "./NewRecipe";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Recipe App</h1>
          <ul className="header">
            <li><NavLink to="/">Pantry</NavLink></li>
            <li><NavLink to="/saved">Saved</NavLink></li>
            <li><NavLink to="/browse">Browse</NavLink></li>
            <li><NavLink to="/create">New Recipe</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Pantry}/>
            <Route path="/saved" component={Saved}/>
            <Route path="/browse" component={Browse}/>
            <Route path="/recipes/:recipe_id" component={Recipe}/>
            <Route path="/create" component={NewRecipe}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
