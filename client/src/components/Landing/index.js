import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MovieIcon from "@material-ui/icons/Movie";

import "./index.css"

const theme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "White",
    },
    primary: {
      main: "#FF8C00",
    },
    secondary: {
      main: "#000000",
    },
  },
});

function Landing(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <div >
          <CssBaseline />
        </div>
      <div className="body"
      // style={{
      //   backgroundImage: `url(${Background})`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   height: "93vh",
      //   opacity: "0.7",
      //   filter: "blur(2px)",
      // }}>
      >
     
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Typography
          style={{
            margin: theme.spacing(1),
            fontWeight: "bolder",
            fontSize: "40spx",
            color: "white",
          }}
          variant="h3"
          gutterBottom={true}
        >
          Welcome to my movie review website🎥! 
          <MovieIcon style={{
            color: "white",
            filter: "blur(10px)"
          }}/>
        </Typography>
        <Typography
          style={{
            margin: theme.spacing(1),
            fontWeight: "bolder",
            fontSize: "40spx",
            color: "white",
          }}
          variant="h5"
          gutterBottom={true}
        >
          To submit a review navigate to the review page⭐️!
        </Typography>
        <Typography
          style={{
            margin: theme.spacing(1),
            fontWeight: "bolder",
            fontSize: "40spx",
            color: "white",
          }}
          variant="h5"
          gutterBottom={true}
        >
          To search for movies in the IMDB database navigate to the search page🔎!
        </Typography>
        <Typography
          style={{
            margin: theme.spacing(1),
            fontWeight: "bolder",
            fontSize: "40spx",
            color: "white",
          }}
          variant="h5"
          gutterBottom={true}
        >
          If you're up to play a little fun game navigate to MyPage🎮! 
        </Typography>
        <Typography
          style={{
            margin: theme.spacing(1),
            fontWeight: "bolder",
            fontSize: "40spx",
            color: "white",
          }}
          variant="h5"
          gutterBottom={true}
        >
          Thanks for visiting my movie review website, humbly designed by Adel Pazoki🙋🏻‍♂️! 
        </Typography>
      </Grid>
      </div>
      </MuiThemeProvider>
    );
  }


export default Landing;
