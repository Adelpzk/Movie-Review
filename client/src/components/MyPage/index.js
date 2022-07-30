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
import { load } from "dotenv";

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



//const serverURL = "http://ec2-18-216-101-119.us-east-2.compute.amazonaws.com:3100";

const serverURL = " ";

function MyPage(props) {
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [selectedGenre, setSelectedGenre] = React.useState("");
  const [errorGenre, setErrorGenre] = React.useState(false);
  const [errorSelected, setErrorSelected] = React.useState(false);

  const [reviewTitleValue, setReviewTitleValue] = React.useState("");
  const [error, setError] = React.useState(false);

  const [moviesList, setMoviesList] = React.useState([]);
  const [genreList, setGenreList] = React.useState([]);
  const [selectedMovieGenre, setselectedMovieGenre] = React.useState([]);

  React.useEffect(() => {
    loadMoviesList();
  }, []);

  const loadMoviesList = () => {
    callApiLoadMoviesList().then((res) => {
      console.log("LoadMoviesList Returned: " + res);
      var parsed = JSON.parse(res.express);
      setMoviesList(parsed);
    });
  };

  const callApiLoadMoviesList = async () => {
    const url = serverURL + "/api/getMovies";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  const callApiGetGenre = async () => {
    const url = serverURL + "/api/getGenre";
    console.log(url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId: moviesList[indexMovieId].id,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  React.useEffect(() => {
    loadAllGenre();
  }, []);

  const loadAllGenre = () => {
    callApiGetAllGenre().then((res) => {
      console.log("LoadAllGenre Returned: " + res);
      var parsed = JSON.parse(res.express);
      setGenreList(parsed);
    });
  };

  const callApiGetAllGenre = async () => {
    const url = serverURL + "/api/getAllGenre";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
      },
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  var names = [];
  names = moviesList.map((obj) => obj.name);
  var indexMovieId = 0;
  for (var i = 0; i <= names.length; i += 1) {
    if (names[i] == selectedMovie) {
      indexMovieId = i;
    }
  }

  const notify = () =>
    toast.error(
      <p>
        Wrong guess❌!
        <br />
        <br />
        Try again, you can do it👍🏻!
      </p>
    );
  const notify2 = () => toast.error("🎥Please enter your movie title");
  const notify3 = () => toast.error("🎥please pick a year");
  const notify4 = () => toast.error("🎥please pick a Genre");
  const notifyAll = () =>
    toast.success(
      <p>
        🎉your guess was right
        <br />
        <br />
        🎥selected movie: {selectedMovie}
        <br />
        <br />
        🎥Genre: {selectedGenre}
        <br />
        <br />
        🎥Year made: {reviewTitleValue}
      </p>,
      {
        autoClose: 5000,
      }
    );

  var genreIsRight = false;

  var genresOfTheMovie = [];

  genresOfTheMovie = selectedMovieGenre.map((obj) => obj.genre);

  genresOfTheMovie.filter((element) => {
    if (element.includes(selectedGenre)) {
      genreIsRight = true;
    }
  });

  const submitHandler = (event) => {
    callApiGetGenre().then((res) => {
      console.log("callApiGetSearch returned: ", res);
      var parsed = JSON.parse(res.express);
      console.log("callApiGetSearch parsed: ", parsed);
      setselectedMovieGenre(parsed);
    });
  
    if (
      reviewTitleValue.length !== "" &&
      selectedMovie !== "" &&
      selectedGenre !== "" &&
      reviewTitleValue == moviesList[indexMovieId].year &&
      genreIsRight == true
    ) {
      notifyAll();
    } else if (
      reviewTitleValue !== "" &&
      selectedMovie !== "" &&
      selectedGenre !== "" &&
      (reviewTitleValue !== moviesList[indexMovieId].year ||
      genreIsRight == false)
    ) {
      notify();
    }

    if (reviewTitleValue === "") {
      setError(true);
      notify3();
    }

    if (selectedMovie === "" || selectedMovie === null) {
      setErrorSelected(true);
      notify2();
    }

    if (selectedGenre === "") {
      setErrorGenre(true);
      notify4();
    }

    if (selectedMovie !== "") {
      setErrorSelected(false);
    }

    if (selectedGenre !== "") {
      setErrorGenre(false);
    }

    if (reviewTitleValue.length !== 0) {
      setError(false);
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
          Welcome to my small game of guess and check🎮!
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
          Simple instructions: Pick a movie and guess the genre and the year it
          was made🤓!
        </Typography>

        <Typography
          style={{
            margin: theme.spacing(1),
            fontWeight: "bolder",
            fontSize: "40spx",
            color: "Black",
          }}
          variant="h6"
          gutterBottom={true}
        >
          ** A movie could have multiple genres!
        </Typography>

        <MovieSelection
          onChange={setSelectedMovie}
          moviesList={moviesList}
          value={selectedMovie || null}
          error={errorSelected}
        />

        <GenreSelection
          onChange={setSelectedGenre}
          moviesList={genreList}
          value={selectedGenre || null}
          error={errorGenre}
        />

        <GuessYear
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

const MovieSelection = (props) => {
  const SelectedMovieHandler = (event) => {
    props.onChange(event.target.value || null);
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <FormControl style={{ margin: theme.spacing(1), minWidth: 200 }}>
        <InputLabel>Movie Title</InputLabel>
        <Select
          onChange={SelectedMovieHandler}
          value={props.value || null}
          error={props.error}
        >
          {props.moviesList.map((option, index) => (
            <MenuItem value={option.name}>{option.name}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Select a Movie</FormHelperText>
      </FormControl>
    </Grid>
  );
};

const GenreSelection = (props) => {
  const SelectedMovieHandler = (event) => {
    props.onChange(event.target.value || null);
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
    >
      <FormControl style={{ margin: theme.spacing(1), minWidth: 200 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          onChange={SelectedMovieHandler}
          value={props.value || null}
          error={props.error}
        >
          {props.moviesList.map((option, index) => (
            <MenuItem value={option.genre}>{option.genre}</MenuItem>
          ))}
        </Select>
        <FormHelperText>Select your guess of genre</FormHelperText>
      </FormControl>
    </Grid>
  );
};
const GuessYear = (props) => {
  const ReviewTitleHandler = (event) => {
    // if (/^\s/.test(v)) event.rc = false;
    if (props.value === "") {
      props.onChange(event.target.value.trim());
    } else {
      props.onChange(event.target.value);
    }
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
        type="number"
        style={{ margin: theme.spacing(1), minWidth: 200 }}
        id="standard-secondary"
        label="year"
        helperText="Guess the year of the movie"
        color="primary"
        error={props.error}
        onChange={ReviewTitleHandler}
        value={props.value}
      />
    </Grid>
  );
};

export default MyPage;
