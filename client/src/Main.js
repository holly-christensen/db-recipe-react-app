import './App.css';
import React from "react";
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
import Home from "./Home";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const activeStyle = {
  fontWeight: "bold",
  color: "white",
  textDecoration: 'none',
  borderBottom: "2px solid white"
}

const navStyle = {
  fontWeight: "bold",
  color: "white",
  textDecoration: 'none',
  marginRight: "40px"

}

const buttonNavStyle = {
  fontWeight: "bold",
  color: "#1976d2",
  textDecoration: 'none',
  marginLeft: "auto"
}


const titleStyle = {
  fontWeight: "bold",
  color: "white",
  textDecoration: 'none',
  paddingRight: "50px"
}

const Main = () => {
  const classes = useStyles();


    return (
      <React.Fragment>
        <HashRouter>
              <nav className={classes.root}>
              <AppBar position="static" color="primary">
                <Toolbar style={{ alignItems: "center", justifyContent: "center" }}>
                  <Grid justify={"center"} alignItems={"center"} container>
                    <Grid style={{ justifySelf: "flex-start" }} item>
                      <div><Typography variant="h6"><NavLink to="/" style={titleStyle}>Recipe App</NavLink></Typography></div>
                    </Grid>
                    <Grid item>
                      <Grid container justify={"center"}>
                        <Button variant="text" color="primary" >  <NavLink to="/pantry" activeStyle={activeStyle} style={navStyle}>Pantry</NavLink> </Button>
                        <Button variant="text" color="primary" >  <NavLink to="/browse" activeStyle={activeStyle} style={navStyle}>Browse</NavLink> </Button>
                        <Button variant="text" color="primary" >  <NavLink to="/saved" activeStyle={activeStyle} style={navStyle}>Saved Recipes</NavLink> </Button>
                        <Button variant="contained" color="default" >  <NavLink to="/create"style={buttonNavStyle}>+ Create Recipe</NavLink> </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
            </nav>
            <div className="content">
                  <Route exact path="/" component={Home}/>
                  <Route path="/pantry" component={Pantry}/>
                  <Route path="/saved" component={Saved}/>
                  <Route path="/browse" component={Browse}/>
                  <Route path="/recipes/:recipe_id" component={Recipe}/>
                  <Route path="/create" component={NewRecipe}/>
                </div>
        </HashRouter>
        </React.Fragment>
    );
  }


export default Main;

//Sources
//https://codesandbox.io/embed/delicate-feather-mmf3k
