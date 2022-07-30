import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ReviewsIcon from "@material-ui/icons/RateReview";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MovieIcon from "@material-ui/icons/Movie";
import { ToastContainer, toast, Bounce } from "material-react-toastify";
import "material-react-toastify/dist/ReactToastify.css";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";

const fetch = require("node-fetch");

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

// const useStyles = makeStyles({
//   select: {
//     "&:before": {
//       borderColor: "#FF8C00",
//     },
//     "&:after": {
//       borderColor: "#FF8C00",
//     },
//     "&:not(.Mui-disabled):hover::before": {
//       borderColor: "#FF8C00",
//     },
//   },
//   icon: {
//     fill: "#FF8C00",
//   },
//   root: {
//     color: "#FF8C00",
//   },
// });

//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3100";

const serverURL = " ";

function Search(props) {
  const [reviewTitleValue, setReviewTitleValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [moviesList, setMoviesList] = React.useState([]);
  const [searchMovieName, setSearchMovieName] = React.useState([]);
  const [searchMovieYear, setSearchMovieYear] = React.useState([]);
  const [searchMovieId, setSearchMovieId] = React.useState([]);


  const callApiGetSearch = async () => {
    const url = serverURL + "/api/getSearch";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTitle: reviewTitleValue,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  const notify = () =>
  {if(moviesList.length == 0 && reviewTitleValue !== ""){
    toast.error(
      <p>
        No Results were found for your search❌!
      </p>
    );}}

    const notify1 = () =>
    toast.error(
      <p>
        your search box is empty, cant look for nothing😪!
      </p>
    );
  const notifyAll = () =>
    {if(moviesList.length !== 0 && reviewTitleValue !== ""){toast.success(
      <p>
        🎉your search result was retrieved
        <br />
        <br />
        🎥List of the movies:{" " + moviesList}
        <br />
        <br />
        🎥your search: {reviewTitleValue}
      </p>,
      {
        autoClose: 5000,
      }
    );}}

    React.useEffect(() => {
        notify()
      }, [moviesList]);

      

      React.useEffect(() => {
        notifyAll()
      }, [moviesList]);
  
  const submitHandler = (event) => {
    event.preventDefault();
    if(reviewTitleValue !== ""){
    callApiGetSearch().then((res) => {
        console.log("callApiGetSearch returned: ", res);
        var parsed = JSON.parse(res.express);
        console.log("callApiGetSearch parsed: ", parsed);
        setMoviesList(parsed.map((obj) => " " + obj.name ));
      });
    
    }

    if(reviewTitleValue == ""){
        notify1()
    }

  };

  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <CssBaseline />
      </div>
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
            color: "Black",
          }}
          variant="h3"
          gutterBottom={true}
        >
          Welcome to the search page🔎!
        </Typography>
        <Typography
          style={{
            margin: theme.spacing(1),
            fontWeight: "bolder",
            fontSize: "40spx",
            color: "Black",
          }}
          variant="h5"
          gutterBottom={true}
        >
          What this page does: Returns the movies that start with your search!
        </Typography>

        <SearchField
          onChange={setReviewTitleValue}
          error={error}
          value={reviewTitleValue}
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            margin: theme.spacing(1),
            fontWeight: "bolder",
            position: "relative",
            top: "20px",
            minWidth: 200,
          }}
          endIcon={<MovieIcon />}
          onClick={submitHandler}
        >
          Check!
        </Button>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          transition={Bounce}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Grid>
    </MuiThemeProvider>
  );
}

const SearchField = (props) => {
  const ReviewTitleHandler = (event) => {
    props.onChange(event.target.value);
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <TextField
        style={{ margin: theme.spacing(1), minWidth: 200 }}
        id="standard-secondary"
        label="Search"
        helperText="Enter your search"
        color="primary"
        error={props.error}
        onChange={ReviewTitleHandler}
        value={props.value}
      />
    </Grid>
  );
};

export default Search;
