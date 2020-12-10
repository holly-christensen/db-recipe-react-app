import React, { Component } from "react";
import Constants from "./constants";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';



class Recipe extends Component {

  constructor(props) {
  super(props);

    this.state = {
      recipe_id: "",
      title: "",
      description: "",
      instructions: "",
      isSaved: null,
      ingredientList: [{ingredient_id: '', ingredient_name: ''}],
      showSave: null,
    };
    // this.setState = this.setState.bind(this);
    this.handleAddRemove = this.handleAddRemove.bind(this)


  }

  updateRecipe () {
    const id = this.state.recipe_id;
    async function fetchRecipe() {
      const response = await fetch('/api/recipes/'+id);
      const recipe = await response.json();
      return recipe;
    }
    fetchRecipe().then(res => {
      this.setState({
        recipe_id: res[0].recipe_id,
        title: res[0].title,
        description: res[0].description,
        instructions: res[0].instructions
      });
    });
  }


  updateSaved () {
    const user_id = Constants.user_id;
    const recipe_id = this.state.recipe_id;
    async function fetchSavedStatus() {
      const response = await fetch(`/api/users/${user_id}/saved/${recipe_id}`);
      const isSaved = await response.json();
      return isSaved;
    }
    fetchSavedStatus().then(res => {
      this.setState({ isSaved: !!res[0].isSaved });
      this.setState({ showSave: !res[0].isSaved });
      return res;
    });
  }

  updateIngredients () {
    const recipe_id = this.state.recipe_id;
    async function fetchIngredientList() {
      const response = await fetch(`/api/recipes/${recipe_id}/ingredients`);
      const ingredientList = await response.json();
      return ingredientList;
    }
    fetchIngredientList().then(res => {
      this.setState({ ingredientList: res });
      if(this.state.ingredientList.length === 0){
        this.setState({ingredientList: [{ingredient_id:0, ingredient_name: "No items in recipe"}]})
      }
    });
  }


  showHideComponent() {
      this.setState({ showHideRemove: !this.state.showHideRemove });
      this.setState({ showHideSave: !this.state.showHideSave });

}

  handleAddRemove(isSaved) {
    this.setState({isSaved});
    if(isSaved){
      this.handleAddToSaved()
    }
    else {this.handleRemoveFromSaved()}

  }

  handleAddToSaved = () => {
    const itemToAdd = this.state.recipe_id;
    fetch('/api/users/'+Constants.user_id+'/saved', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Constants.user_id, recipe_id: itemToAdd })
    });
    this.showHideComponent();
    this.updateSaved();
    this.updateRecipe();
  };

  handleRemoveFromSaved = () => {
    const itemToRemove = this.state.recipe_id;
    fetch('/api/users/'+Constants.user_id+'/saved', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Constants.user_id, recipe_id: itemToRemove })
    });
    this.showHideComponent();
    this.updateSaved();
    this.updateRecipe();
  };


  componentDidMount() {
    const path = this.props.match.url;

    async function fetchRecipe() {
      const response = await fetch('/api/'+path);
      const recipe = await response.json();
      return recipe;
    }
    fetchRecipe().then(res => {
      this.setState(
        {
        recipe_id: res[0].recipe_id,
        title: res[0].title,
        description: res[0].description,
        instructions: res[0].instructions
      });
      this.updateIngredients();
      this.updateSaved();
    });
  }

  render() {
    const {recipe_id} = this.state;


    return(
      <React.Fragment>
      <Container maxWidth="md" >

        <Box m={5}>
          <Typography gutterBottom variant="h4" component="h2">
            {this.state.title}
          </Typography>
          <div>
            {this.state.showSave && <Button variant="text" color="primary" onClick={() => this.handleAddRemove(true)}>Save
            </Button>}
            {!this.state.showSave && <Button variant="text" color="secondary" onClick={() => this.handleAddRemove(false)}>Unsave
            </Button>}
          </div>
          <Typography>
            {this.state.description}
          </Typography>
        </Box>

        <Box m={5}>
        <Typography component="h4" variant="h5">
          Ingredients
        </Typography>
          <ul>
            {this.state.ingredientList.map((ingredient) => (
              <li key={ingredient.ingredient_id}>{ingredient.ingredient_name}</li>
            ))}
          </ul>
        </Box>

        <Box m={5}>
        <Typography component="h4" variant="h5" gutterBottom>
          Instructions
        </Typography>
          <Typography>
            {this.state.instructions}
          </Typography>
        </Box>
        </Container>
      </React.Fragment>

    )

  }

}


export default Recipe;
