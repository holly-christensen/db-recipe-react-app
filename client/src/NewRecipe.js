import React, { Component } from "react";
import Constants from "./constants";


import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import 'react-widgets/dist/css/react-widgets.css';
import { Multiselect } from 'react-widgets'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';





class NewRecipe extends Component {

  constructor(props) {
  super(props);

    this.state = {
      ingredientList: [],
      applianceList: [],
      tagList: [],
      selectedIngredients: [],
      selectedAppliances: [],
      selectedTags: [],
      minutes: "",
      servings: "",
      title: "",
      description: "",
      instructions: "",
      photo: "",
      newRecipeId: ""
    };

    // this.handleIngredients() = this.handleIngredients.bind(this);
  }

  handleSubmit = () => {
    const selected = this.st
    console.log("selected : "+selected);
    if(this.state.title === "") {
      console.log("TITLE REQUIRED")
    }
    else if(this.state.minutes === 0) {
      console.log("MINUTES > 0  REQUIRED")
    }
    else if(this.state.SERVINGS === 0) {
      console.log("SERVINGS > 0  REQUIRED")
    }
    else if(this.state.selectedIngredients.length === 0) {
      console.log("INGREDIENTS > 0  REQUIRED")
    }
    else if(this.state.selectedAppliances.length === 0) {
      console.log("APPLIANCES > 0  REQUIRED")
    } else {

      this.createRecipe();
    }
  };



  updateIngredients () {
    async function fetchIngredientList() {
      const response = await fetch('/api/ingredients');
      const ingredientList = await response.json();
      return ingredientList;
    }
    fetchIngredientList().then(res => {
      this.setState({ ingredientList: res });
    });
  }

  handleTitleChange = (e) => {
      this.setState({
          title: e.target.value
      });
  }

  handleDescriptionChange = (e) => {
      this.setState({
          description: e.target.value
      });
  }

  handleInstructionsChange = (e) => {
      this.setState({
          instructions: e.target.value
      });
  }

  handleServingsChange = (e) => {
      this.setState({
          servings: e.target.value
      });
  }

  handleMinutesChange = (e) => {
      this.setState({
          minutes: e.target.value
      });
  }

  resetState () {
    this.setState({ title: "" });
    this.setState({ description: "" });
    this.setState({ instructions: "" });
    this.setState({ minutes: "" });
    this.setState({ servings: "" });
    this.setState({ selectedIngredients: [] });
    this.setState({ selectedAppliances: [] });
    this.setState({ selectedTags: [] });
    this.setState({ newRecipeId: "" });
  }

  updateAppliances () {
    async function fetchApplianceList() {
      const response = await fetch('/api/appliances');
      const applianceList = await response.json();
      return applianceList;
    }
    fetchApplianceList().then(res => {
      this.setState({ applianceList: res });
    });
  }

  updateTags () {
    async function fetchTagList() {
      const response = await fetch('/api/tags');
      const tagList = await response.json();
      return tagList;
    }
    fetchTagList().then(res => {
      this.setState({ tagList: res });
    });
  }

  createRecipe () {
    const user_id = Constants.user_id;
    const title = this.state.title;
    const description = this.state.description;
    const photo = this.state.photo;
    const minutes = this.state.minutes;
    const servings = this.state.servings;
    const instructions = this.state.instructions;
    async function fetchPostRecipe() {
      const response = await fetch('/api/recipes', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id: user_id,
              title: title,
              description: description,
              photo: null,
              minutes: minutes,
              servings: servings,
              instructions: instructions
            })
          });
      const result = await response.json();
      return result;
    }
      fetchPostRecipe().then((data) => this.addIngredients(data.insertId));
  }


  addIngredients(id) {
    const recipe_id  = id;
    const selected = this.state.selectedIngredients;
    if(selected.length > 0){
      for(var i = 0; i < selected.length; i++) {
          var ingredient = selected[i];
          fetch('/api/recipes/'+recipe_id+'/ingredients', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              recipe_id: recipe_id,
              ingredient_id: ingredient.ingredient_id,
              amount: 100,
              unit: "grams",
              optional: 0
            })
          });
      }
    }
    this.addAppliances(id);
  };


  addAppliances(id) {
    const recipe_id  = id;
    const selected = this.state.selectedAppliances;
    if(selected.length > 0){
      for(var i = 0; i < selected.length; i++) {
          var appliance = selected[i];
          fetch('/api/recipes/'+recipe_id+'/appliances', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              recipe_id: recipe_id,
              appliance_id: appliance.appliance_id
            })
          });
      }
    }
    this.addTags(id);
  };


  addTags(id) {
    const recipe_id  = id;
    const selected = this.state.selectedTags;
    if(selected.length > 0){
      for(var i = 0; i < selected.length; i++) {
          var tag = selected[i];
          fetch('/api/recipes/'+recipe_id+'/appliances', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              recipe_id: recipe_id,
              appliance_id: tag.tag_id
            })
          });
      }
    }
  };





  componentDidMount() {
    this.updateIngredients();
    this.updateAppliances();
    this.updateTags();
  }


  render() {

    return (
      <React.Fragment>
      <Box m={5}>
        <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
          Create a Recipe
        </Typography>
      </Box>

      <Container maxWidth='sm'>
      <form
      noValidate
      autoComplete="off"
      onSubmit={this.handleSubmit}>
        {/* TITLE */}
        <div>
          <h4>Title</h4>
          <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          size="small"
          placeholder="Enter recipe title"
          value={this.state.title}
          onChange={this.handleTitleChange} />
        </div>

        <br/>

        {/* DESCRIPTION */}
        <div>
          <h4>Description</h4>
          <TextField
          id="outlined-basic"
          label="Recipe Description"
          variant="outlined"
          size="small"
          placeholder="Total time (min)"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          required
          fullWidth/>
        </div>

        <br/>

        {/* SERVINGS */}
        <div>
          <h4>Servings</h4>
          <TextField
          id="outlined-basic"
          label="Servings"
          variant="outlined"
          size="small"
          placeholder="Number of servings"
          value={this.state.servings}
          onChange={this.handleServingsChange} />
        </div>

        <br/>

        {/* MINUTES */}
        <div>
          <h4>Minutes</h4>
          <TextField
          id="outlined-basic"
          label="Total time (min)"
          variant="outlined"
          size="small"
          placeholder="Enter recipe title"
          value={this.state.minutes}
          onChange={this.handleMinutesChange} />
        </div>

        <br/>

        {/* INGREDIENTS */}
        <div>
        <h4>Ingredients</h4>
          <Multiselect
            data={this.state.ingredientList}
            value={this.state.selectedIngredients}
            valueField='ingredient_id'
            textField='ingredient_name'
            onSelect={value => this.setState({ selectedIngredients: value })}
            placeholder = "Select ingredients..."
            onChange={value => this.setState({ selectedIngredients: value })}
          />
        </div>

        <br/>

        {/* APPLIANCES */}
        <div>
        <h4>Appliances</h4>
          <Multiselect
            data={this.state.applianceList}
            value={this.state.selectedAppliances}
            valueField='appliance_id'
            textField='appliance_name'
            onSelect={value => this.setState({ selectedAppliances: value })}
            placeholder = "Select appliances..."
            onChange={value => this.setState({ selectedAppliances: value })}
          />
        </div>

        <br/>

        {/* TAGS */}
        <div>
        <h4>Tags</h4>
          <Multiselect
            data={this.state.tagList}
            value={this.state.selectedTags}
            valueField='tag_id'
            textField='tag_name'
            onSelect={value => this.setState({ selectedTags: value })}
            placeholder = "Select tags..."
            onChange={value => this.setState({ selectedTags: value })}
          />
        </div>

        <br/>

        {/* INSTRUCTIONS */}
        <div>
        <h4>Instructions</h4>
        <TextareaAutosize
        aria-label="Instructions"
        rowsMin={4}
        placeholder="Enter recipe instructions"
        variant="outlined"
        size="medium"
        value={this.state.instructions}
        onChange={this.handleInstructionsChange}/>
        </div>

        <br/>


        <Button color="primary" variant="contained" size="large" onClick={this.handleSubmit}>Submit</Button>

      </form>

      </Container>
      <br/>
      <br/>
    </React.Fragment>


    );
  }
}

export default NewRecipe;
