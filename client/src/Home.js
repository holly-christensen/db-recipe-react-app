import React, { Component } from "react";
import Constants from "./constants";
import './App.css';


import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { Link } from "react-router-dom";


const Home = () => {

    return(
      <React.Fragment >
      <Container maxWidth="md" >

      <div style={{ width: '100%' }}>
          <Box pt={10}><Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom >
            Welcome to the recipe sharing app for college students
          </Typography></Box>
            <Box
              display="flex"
              justifyContent="center"
              flexWrap="nowrap"
              p={2}
              m={1}
              align-items="center"
            >
              <Box p={1} align-items="center" align-content="center">
                <Typography > Add to your pantry to make it easy to find recipes  you can make with ingredients on-hand </Typography>
              </Box>
              <Box p={1} >
                Follow other students from your University to see what's popular in your community
              </Box>
              <Box p={1} >
                Share your favorite recipes with people in your college community
              </Box>
              <Box p={1} >
                Search and filter recipes by cost, appliances, ingredients, andt tags.
              </Box>
            </Box>

          </div>
          </Container>

      </React.Fragment>
    )

  }


export default Home;
