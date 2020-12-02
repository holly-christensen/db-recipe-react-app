import './App.css';
import React, { Component } from 'react';

import {
  Container,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  AppBar,
  Button,
  Menu,
  Toolbar,
  Typography,
  Input,
  TextField,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core/';

class App extends Component {
  constructor(props) {
  super(props);

    this.state = {
       username: 'hollyc',
       user_id: '',
       pantryList: [],
       ingredientList: [],
       newPantryItem: '',
       newPantryId: ''
    };
  }

  getUserId = () => {
    fetch('/api/users/ '+ this.state.username)
      .then(res => res.json())
      .then(res => {
        this.setState({ user_id: res.user_id });
    });
  };


  getPantryList = () => {
    fetch('/api/users/' + this.username + '/pantry')
      .then(res => res.json())
      .then(res => {
        var pantryList = res.map(r => r.ingredient_name);
        this.setState({ pantryList });
    });
  };

  getAllIngredients = () => {
    fetch('/api/ingredients')
      .then(res => res.json())
      .then(res => {
        var ingredientList = res.map(r => r.ingredient_name);
        this.setState({ ingredientList });
    });
  };

  handleInputChange = (e) => {
    this.setState({ newPantryItem: e.target.value });
    fetch('/api/ingredients/' + this.state.newPantryItem)
      .then(res => res.json())
      .then(res => {
        this.setState({ newPantryId_id: res.ingredient_id });
    });
  };

  handleAddToPantry = () => {
    fetch('/api/users/'+this.state.username+'/pantry', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: this.state.user_id, ingredient_id: this.state.newPantryId })
    })
    .then(res => res.json())
    .then(res => {
      this.getPantryList();
      this.setState({ newPantryItem: '', newPantryId: '' });
    });
  };

  componentDidMount () {
    this.getUserId();
    this.getPantryList();
    this.getAllIngredients();
  }


  render() {
    return (
      <Container>
              <h3 className="display-4">My Pantry</h3>
              <p className="lead">Your pantry items</p>
              <p className="lead">pantry list: { this.state.pantryList }</p>

              <Select onChange={this.handleInputChange} defaultValue='Select'>
                    { this.state.ingredientList.length === 0 && <option>No ingredients.</option> }
                    { this.state.ingredientList.map((ingredient, i) => <option key={i}>{ingredient}</option>) }
              </Select>

              <Button
                color="primary"
                onClick={this.handleAddToPantry}>
                  Add Ingredient
              </Button>
      </Container>
    );
  }

}




// HOLLY READ THIS
// i need to map {this.state.ingredientList} onto different menu items
// i also want to set the value of each of those menu items to the ingredient_id
// so the ingredientList in the state should be a list of {ingredient_id, ingredient_name}

              // <TextField defaultValue="Enter an ingredient" onChange={this.handleInputChange} value={this.state.newPantryItem} />

// function App() {
//   return (
//     <div>
//     </div>
//   );
// }

export default App;
