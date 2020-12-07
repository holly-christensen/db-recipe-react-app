import React, { Component } from "react";
import Constants from "./constants";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import 'react-widgets/dist/css/react-widgets.css';


import { Multiselect } from 'react-widgets'
import { DropdownList } from 'react-widgets'




class NewRecipe extends Component {

  constructor(props) {
  super(props);

    this.state = {
      ingredientList: [],
      applianceList: [],
      selectedIngredients: [],
      selectedAppliances: [],
      minutes: 0,
      servings: 0,
      title: "",
      description: "",
      instructions: ""
    };
  }

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


  componentDidMount() {
    this.updateIngredients();
    this.updateAppliances();
  }


  render() {

    return (
      <React.Fragment>
      <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
        New Recipe
      </Typography>

      {/* MULTI-SELECT INGREDIENTS */}
      <div>
      <h4> select recipe ingredients </h4>
        <Multiselect
          data={this.state.ingredientList}
          value={this.state.selectedIngredients}
          valueField='ingredient_id'
          textField='ingredient_name'
          onSelect={value => this.setState({ selectedIngredients: value })}
          placeholder = "Select an option..."
          onChange={value => this.setState({ selectedIngredients: value })}
        />
      </div>


      <div>
      <h4> select recipe appliances </h4>
        <Multiselect
          data={this.state.applianceList}
          value={this.state.selectedAppliances}
          valueField='appliance_id'
          textField='appliance_name'
          onSelect={value => this.setState({ selectedAppliances: value })}
          placeholder = "Select an option..."
          onChange={value => this.setState({ selectedAppliances: value })}
        />
      </div>


      </React.Fragment>
    );
  }
}

export default NewRecipe;
