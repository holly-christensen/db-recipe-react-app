import React, { Component } from "react";
import Constants from "./constants";
import './App.css';


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
import Box from '@material-ui/core/Box';

// import Link from '@material-ui/core/Link';

import { Link } from "react-router-dom";


class Browse extends Component {

  constructor(props) {
  super(props);

    this.state = {
      recipeList: [],
      trendingRecs: [],
      tagRecs: [],
      lowCostRecs: [],
      byFollowRecs: [],
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

  updateTrendingRecs () {
    async function fetchRecipes() {
      const response = await fetch('/api/recommendations/trending');
      const recipeList = await response.json();
      return recipeList;
    }
    fetchRecipes().then(res => {

      this.setState({ trendingRecs: res });
    });

  }


  updateTagRecs () {
    const user_id = Constants.user_id;
    async function fetchRecipes() {
      const response = await fetch('/api/recommendations/similartags/'+user_id);
      const recipeList = await response.json();
      console.log(recipeList);
      return recipeList;
    }
    fetchRecipes().then(res => {
      this.setState({ tagRecs: res });
    });
  }


  updateLowCostRecs () {
    const user_id = Constants.user_id;
    async function fetchRecipes() {
      const response = await fetch('/api/recommendations/lowcost/'+user_id);
      const recipeList = await response.json();
      console.log(recipeList);
      return recipeList;
    }
    fetchRecipes().then(res => {
      this.setState({ lowCostRecs: res });
    });
  }


  updateByFollowRecs () {
    const user_id = Constants.user_id;
    async function fetchRecipes() {
      const response = await fetch('/api/recommendations/byfollow/'+user_id);
      const recipeList = await response.json();
      console.log(recipeList);
      return recipeList;
    }
    fetchRecipes().then(res => {
      this.setState({ byFollowRecs: res });
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

    this.updateTrendingRecs();
    this.updateTagRecs();
    this.updateByFollowRecs();
    this.updateLowCostRecs();
    // this.updateRecipes();
  }

  render() {

    return(
      <React.Fragment>

      <Container maxWidth="md">

      <Box m={5}>
        <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
          Browse Recipes
        </Typography>
      </Box>

        <Box m={10}>
          <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
            Trending Recipes
          </Typography>
          <Typography component="p" variant="p" align="center" color="textPrimary" gutterBottom>
            Based on recipes with high ratings in the past 2 weeks.
          </Typography>
          <Grid container spacing={4}>
            {this.state.trendingRecs.map((recipe) => (
              <Grid item key={recipe.recipe_id} xs={12} sm={6} md={4}>
                <Card >
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
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
      </Box>


      <Box m={10}>
            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
              More of what you like
            </Typography>
            <Typography component="p" variant="p" align="center" color="textPrimary" gutterBottom>
              Based on the tags of recipes you usually like.
            </Typography>
            <br></br>
            <Grid container spacing={4}>
              {this.state.lowCostRecs.map((recipe) => (
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
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>



    <Box m={10}>
          <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
            Low Cost
          </Typography>
          <Typography component="p" variant="p" align="center" color="textPrimary" gutterBottom>
            Based on ingredients you already have in your pantry
          </Typography>
          <br></br>
          <Grid container spacing={4}>
            {this.state.lowCostRecs.map((recipe) => (
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
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box m={10}>
          <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
            You may also like these recipes
          </Typography>
          <Typography component="p" variant="p" align="center" color="textPrimary" gutterBottom>
                People you follow like these recipes.
                </Typography>
          <Grid container spacing={4}>
            {this.state.byFollowRecs.map((recipe) => (
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
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
      </Box>

      </Container>

      </React.Fragment>
    )

  }

}

// <Button variant="text" color="secondary" onClick={() =>    this.handleAddToSaved(recipe.recipe_id)}>Save
// </Button>
// <Button variant="text" color="secondary" onClick={() =>    this.handleRemoveFromSaved(recipe.recipe_id)}>Remove
// </Button>

export default Browse;
