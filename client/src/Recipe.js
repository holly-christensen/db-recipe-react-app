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
import Link from '@material-ui/core/Link';



class Recipe extends Component {

  constructor(props) {
  super(props);

    this.state = {
      recipe_id: "",
      title: "",
      description: "",
      saved: false
    };

  }

  updateRecipe () {
    const id = this.state.recipe_id;
    async function fetchRecipe() {
      const response = await fetch('/api/recipes/'+id);
      const recipe = await response.json();
      console.log(recipe);
      return recipe;
    }
    fetchRecipe().then(res => {
      this.setState({
        recipe_id: res[0].recipe_id,
        title: res[0].title,
        description: res[0].description
      });
    });
    //CHECK IF THE RECIPE IS SAVED
    // async function fetchSaved() {
      // const response = await fetch('/api/users/'+Constants.user_id+'/saved'+this.state.recipe_id); //RETURNS TRUE OR FALSE (UPDATE THE API WITH SAVED/:RECIPE_ID TO RETURN TRUE/FALSE IF IT'S SAVED)
    //   const result = await response.json();
    //   console.log(result);
    //   return result;
    // }
    // fetchSaved().then(res => {
    //   this.setState({ saved: res[0] });
    //   console.log(this.state.saved);
    // });
  }

  handleAddToSaved = (itemToAdd) => {
    console.log("item to add:"+itemToAdd);
    fetch('/api/users/'+Constants.user_id+'/saved', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Constants.user_id, recipe_id: itemToAdd })
    });
    this.updateRecipe();
  };

  handleRemoveFromSaved = (itemToRemove) => {
    console.log("item to remove:"+itemToRemove);
    fetch('/api/users/'+Constants.user_id+'/saved', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Constants.user_id, recipe_id: itemToRemove })
    });
    this.updateRecipe();
  };


  componentDidMount() {
    const path = this.props.match.url;

    async function fetchRecipe() {
      const response = await fetch('/api/'+path);
      const recipe = await response.json();
      console.log(recipe);
      return recipe;
    }
    fetchRecipe().then(res => {
      this.setState(
        {
        recipe_id: res[0].recipe_id,
        title: res[0].title,
        description: res[0].description
      });
      console.log(this.state.recipe_id);
    });

    // this.updateRecipe();
  }

  render() {
    const {id} = this.state.recipe_id;

    return(
      <React.Fragment>
        <Typography gutterBottom variant="h5" component="h2">
          {this.state.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="h4">
          {this.state.recipe_id}
        </Typography>
        <Typography>
          {this.state.description}
        </Typography>
        <Button variant="text" color="secondary" onClick={() =>    this.handleAddToSaved(this.state.recipe_id)}>Save
        </Button>
        <Button variant="text" color="secondary" onClick={() =>    this.handleRemoveFromSaved(this.state.recipe_id)}>Remove
        </Button>
      </React.Fragment>

    )

  }

}



export default Recipe;
