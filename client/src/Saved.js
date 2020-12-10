import React, { Component } from "react";
import Constants from "./constants";

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Link } from "react-router-dom";



class Saved extends Component {

  constructor(props) {
  super(props);

    this.state = {
      recipeList: []
    };

  }

  updateRecipes () {
    async function fetchRecipes() {
      const response = await fetch('/api/users/'+Constants.user_id+'/saved');
      const recipeList = await response.json();
      console.log(recipeList);
      return recipeList;
    }
    fetchRecipes().then(res => {
      this.setState({ recipeList: res });
    });

  }

  handleRemoveFromSaved = (itemToRemove) => {
    console.log("called!"+itemToRemove);
    fetch('/api/users/'+Constants.user_id+'/saved', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Constants.user_id, recipe_id: itemToRemove })
    }).then(this.updateRecipes());
  };


  componentDidMount() {
    this.updateRecipes();
  }

  render() {


    return(

      <Container maxWidth="md" >
      <Box m={5}>
        <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
          Saved Recipes
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {this.state.recipeList.map((recipe) => (
          <Grid item key={recipe.recipe_id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {recipe.title}
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
                <Button variant="text" color="secondary" onClick={() =>    this.handleRemoveFromSaved(recipe.recipe_id)}>Unsave
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      </Container>
    )

  }

}

//Sourced partially from Material-UI Demos & starter templates

export default Saved;
