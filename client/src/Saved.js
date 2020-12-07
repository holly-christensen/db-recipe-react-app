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


  //
  // export default function Saved() {
  //   const classes = useStyles();
  //
  //   return (
  //     <React.Fragment>
  //       <CssBaseline />
  //       <main>
  //         {/* Hero unit */}
  //         <div className={classes.heroContent}>
  //           <Container maxWidth="sm">
  //             <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
  //               Saved Recipes
  //             </Typography>
  //             <Typography variant="p" align="center" color="textSecondary" paragraph>
  //               Something short and leading about the collection below—its contents, the creator, etc.
  //               Make it short and sweet, but not too short so folks don&apos;t simply skip over it
  //               entirely.
  //             </Typography>
  //             <div className={classes.heroButtons}>
  //               <Grid container spacing={2} justify="center">
  //                 <Grid item>
  //                   <Button variant="contained" color="primary">
  //                     Main call to action
  //                   </Button>
  //                 </Grid>
  //                 <Grid item>
  //                   <Button variant="outlined" color="primary">
  //                     Secondary action
  //                   </Button>
  //                 </Grid>
  //               </Grid>
  //             </div>
  //           </Container>
  //         </div>
  //         <Container className={classes.cardGrid} maxWidth="md">
  //           {/* End hero unit */}
  //           <Grid container spacing={4}>
  //             {cards.map((card) => (
  //               <Grid item key={card} xs={12} sm={6} md={4}>
  //                 <Card className={classes.card}>
  //                   <CardMedia
  //                     className={classes.cardMedia}
  //                     image="https://source.unsplash.com/random"
  //                     title="Image title"
  //                   />
  //                   <CardContent className={classes.cardContent}>
  //                     <Typography gutterBottom variant="h5" component="h2">
  //                       Heading
  //                     </Typography>
  //                     <Typography>
  //                       This is a media card. You can use this section to describe the content.
  //                     </Typography>
  //                   </CardContent>
  //                   <CardActions>
  //                     <Button size="small" color="primary">
  //                       View
  //                     </Button>
  //                     <Button size="small" color="primary">
  //                       Edit
  //                     </Button>
  //                   </CardActions>
  //                 </Card>
  //               </Grid>
  //             ))}
  //           </Grid>
  //         </Container>
  //       </main>
  //       {/* Footer */}
  //       <footer className={classes.footer}>
  //         <Typography variant="h6" align="center" gutterBottom>
  //           Footer
  //         </Typography>
  //         <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
  //           Something here to give the footer a purpose!
  //         </Typography>
  //       </footer>
  //       {/* End footer */}
  //     </React.Fragment>
  //   );
  // }


export default Saved;
