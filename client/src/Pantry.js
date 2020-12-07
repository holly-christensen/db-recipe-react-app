import React, { Component } from "react";
import Constants from "./constants";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import 'react-widgets/dist/css/react-widgets.css';


import { Multiselect } from 'react-widgets'


//HOLLY READ THIS
//  have to double click buttons


class Pantry extends Component {

  constructor(props) {
  super(props);

    this.state = {
      pantryList: [{ingredient_id: '', ingredient_name: ''}],
      ingredientList: [{ingredient_id: '', ingredient_name: ''}],
      selectedOption: null,
      validationError: "",
      selectedItemList: []
    };
  }

  updateIngredients () {
    async function fetchIngredientList() {
      const response = await fetch('/api/users/'+Constants.user_id+'/pantry/notin');
      const ingredientList = await response.json();
      return ingredientList;
    }
    fetchIngredientList().then(res => {
      this.setState({ ingredientList: res });
    });

  }

  updatePantry() {
    async function fetchPantryList() {
      const response = await fetch('/api/users/' + Constants.user_id + '/pantry');
      const pantryList = await response.json();
      return pantryList;
    }
    fetchPantryList().then(res => {
      this.setState({ pantryList: res });
      if(this.state.pantryList.length === 0){
        this.setState({pantryList: [{ingredient_id:0, ingredient_name: "No items in pantry"}]})
      }
    });

  }


  handleAddToPantry = () => {
    console.log(this.state.selectedItemList);
    if(this.state.pantryList[0].ingredient_id === 0){
      this.setState({pantryList: []})
    }
    for(var i = 0; i < this.state.selectedItemList.length; i++) {
        var ingredient = this.state.selectedItemList[i];
        fetch('/api/users/'+Constants.username+'/pantry', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: Constants.user_id, ingredient_id: ingredient.ingredient_id })
        });
    }
    this.setState({selectedItemList: []});
    this.updatePantry();
    this.updateIngredients();
  };



  handleRemoveFromPantry = (itemToRemove) => {
    fetch('/api/users/'+Constants.username+'/pantry', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: Constants.user_id, ingredient_id: itemToRemove })
    });
    this.updatePantry();
    this.updateIngredients();
    if(this.state.pantryList.length === 0){
      this.setState({pantryList: [{ingredient_id:0, ingredient_name: "No items in pantry"}]})
    }
  };


  componentDidMount() {
    this.updatePantry();
    this.updateIngredients();
  }


  render() {

    return (
      <React.Fragment>
      <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
        Your Pantry
      </Typography>

      {/* MULTI-SELECT INGREDIENTS */}
      <div>
        <Multiselect
          data={this.state.ingredientList}
          value={this.state.selectedItemList}
          valueField='ingredient_id'
          textField='ingredient_name'
          onSelect={value => this.setState({ selectedItemList: value })}
          placeholder = "Select an option..."
          onChange={value => this.setState({ selectedItemList: value })}
        />
        <Button variant="contained" color="primary" onClick={() => this.handleAddToPantry()}>Add</Button>
      </div>


      <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ingredient_name</TableCell>
              <TableCell>ingredient_id</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.pantryList.map((ingredient) => (
              <TableRow key={ingredient.ingredient_id}>
                <TableCell>{ingredient.ingredient_name}</TableCell>
                <TableCell>{ingredient.ingredient_id}</TableCell>
                <TableCell>
                    <Button variant="contained" color="primary" onClick={() => this.handleRemoveFromPantry(ingredient.ingredient_id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </React.Fragment>
    );
  }
}

export default Pantry;
// <MultiSelect
//   title={"Multi Select"}
//   itemList={this.state.ingredientList}
//   selectedItemList={this.state.selectedIngredients}
//   changeList={this.changeList}
//   isObjectArray={true}
// />

// <Multiselect
//   style={{width: '200px'}}
//   data={this.state.ingredientList}
//   valueField='ingredient_id'
//   textField='ingredient_name'
//   onSelect={this.handleSelectChange}
//   placeholder = "Select an option..."
// />

// <div>
//   <h1>React Simple Multi Select</h1>
//   <MultiSelect
//     title={"Multi Select"}
//     itemList={this.state.ingredientList}
//     selectedItemList={this.state.selectedIngredients}
//     changeList={this.changeList}
//     isObjectArray={true}
//   />
// </div>

// <Select
//   value={selectedOption}
//   onChange={this.handleSelectChange}
//   options={this.state.ingredientList}
// />
// <Select
//   placeholder="select one..."
//   isMulti
//   name="ingredients"
//   options={this.state.ingredientList}
//   className="basic-multi-select"
//   classNamePrefix="select"
// />



//----- single select add to pantryList

// handleAddToPantry = () => {
//   this.selectedOption === "-1" ? this.setState({validationError: "You must select an ingredient team"}) : this.setState({validationError: ""});
//   fetch('/api/users/'+Constants.username+'/pantry', {
//     method: 'post',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ user_id: Constants.user_id, ingredient_id: this.state.selectedOption })
//   });
//   this.updatePantry();
//   this.updateIngredients();
// };

// <div>
//   <select
//   onChange={e => this.handleSelectChange(e.target.value)}>
//     {this.state.ingredientList.map((ingredient) => <option key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
//     {ingredient.ingredient_name}</option>)}
//   </select>
//   <Button variant="contained" color="primary" onClick={() => this.handleAddToPantry()}>Add</Button>
// </div>
//
// <div style={{color: 'red', marginTop: '5px'}}>
//   {this.state.validationError}
// </div>

// handleSelectChange = (selectedOption) => {
//   this.setState({ selectedOption });
//   console.log(`Option selected:`, selectedOption);
// };

//https://www.carlrippon.com/react-drop-down-data-binding/
//https://jquense.github.io/react-widgets/api/Multiselect/#itemComponent
//https://material-ui.com/styles/basics/
//https://ui.dev/react-router-v4-pass-props-to-link/
