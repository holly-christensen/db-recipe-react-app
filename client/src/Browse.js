import React, { Component } from "react";
import Constants from "./constants";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';

import { Link } from "react-router-dom";



class Browse extends Component {

  constructor(props) {
  super(props);

    this.state = {
      recipeList: []
    };

  }

  updateRecipes () {
    async function fetchRecipes() {
      const response = await fetch('/api/recipes');
      const recipeList = await response.json();
      console.log(recipeList);
      return recipeList;
    }
    fetchRecipes().then(res => {
      this.setState({ recipeList: res });
    });

  }

  handleAddToSaved = (itemToAdd) => {
    console.log("called!"+itemToAdd);
    fetch('/api/users/'+Constants.user_id+'/saved', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Constants.user_id, recipe_id: itemToAdd })
    });
    this.updateRecipes();
  };

  handleRemoveFromSaved = (itemToRemove) => {
    console.log("called!"+itemToRemove);
    fetch('/api/users/'+Constants.user_id+'/saved', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Constants.user_id, recipe_id: itemToRemove })
    });
    this.updateRecipes();
  };


  componentDidMount() {
    this.updateRecipes();
  }

  render() {


    return(
      <Grid container spacing={4}>
        {this.state.recipeList.map((recipe) => (
          <Grid item key={recipe.recipe_id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {recipe.title}
                </Typography>
                <Typography gutterBottom variant="h5" component="h4">
                  {recipe.recipe_id}
                </Typography>
                <Typography>
                  {recipe.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={'/recipes/'+recipe.recipe_id}>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </Link>
                <Button variant="text" color="secondary" onClick={() =>    this.handleAddToSaved(recipe.recipe_id)}>Save
                </Button>
                <Button variant="text" color="secondary" onClick={() =>    this.handleRemoveFromSaved(recipe.recipe_id)}>Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )

  }

}



export default Browse;
