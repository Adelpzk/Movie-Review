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
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

//Dev mode
const serverURL = "http://ov-research-4.uwaterloo.ca:apazokit"; //enable for dev mode

//Deployment mode instructions
//const serverURL = "http://ov-research-4.uwaterloo.ca:PORT"; //enable for deployed mode; Change PORT to the port number given to you;
//To find your port number:
//ssh to ov-research-4.uwaterloo.ca and run the following command:
//env | grep "PORT"
//copy the number only and paste it in the serverURL in place of PORT, e.g.: const serverURL = "http://ov-research-4.uwaterloo.ca:3000";

const fetch = require("node-fetch");

const opacityValue = 0.9;

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

const styles = (theme) => ({
  root: {
    body: {
      backgroundColor: "#000000",
      opacity: opacityValue,
      overflow: "hidden",
    },
  },
  mainMessage: {
    opacity: opacityValue,
  },

  mainMessageContainer: {
    marginTop: "20vh",
    marginLeft: theme.spacing(20),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(4),
    },
  },
  paper: {
    overflow: "hidden",
  },
  message: {
    opacity: opacityValue,
    maxWidth: 250,
    paddingBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },

  RateSection: {
    margin: theme.spacing(1),
    position: "relative",
    top: "10px",
  },

  TextField: {
    margin: theme.spacing(1),
    minWidth: 200,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

  button: {
    margin: theme.spacing(1),
    fontWeight: "bolder",
    position: "relative",
    top: "20px",
    minWidth: "200",
  },

  title: {
    margin: theme.spacing(1),
    fontWeight: "bolder",
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: 1,
      mode: 0,
    };
  }

  componentDidMount() {
    //this.loadUserSettings();
  }

  loadUserSettings() {
    this.callApiLoadUserSettings().then((res) => {
      //console.log("loadUserSettings returned: ", res)
      var parsed = JSON.parse(res.express);
      console.log("loadUserSettings parsed: ", parsed[0].mode);
      this.setState({ mode: parsed[0].mode });
    });
  }

  callApiLoadUserSettings = async () => {
    const url = serverURL + "/api/loadUserSettings";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        userID: this.state.userID,
      }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log("User settings: ", body);
    return body;
  };

  render() {
    const { classes } = this.props;

    const mainMessage = (
      <Grid
        container
        spacing={0}
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        style={{ minHeight: "100vh" }}
        className={classes.mainMessageContainer}
      >
        <Grid item>
          <Typography
            variant={"h3"}
            className={classes.mainMessage}
            align="flex-start"
          >
            {this.state.mode === 0 ? (
              <React.Fragment>Welcome to MSci245!</React.Fragment>
            ) : (
              <React.Fragment>Welcome back!</React.Fragment>
            )}
          </Typography>
        </Grid>
      </Grid>
    );

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
        </div>

        <Review />
      </MuiThemeProvider>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

const Review = (props) => {
  // function split(str, index) {
  //   const result = [str.slice(0, index), str.slice(index)];
  
  //   return result;
  // }
  // const [first, second] = split(reviewValue.name, 20)
  const notify = () => toast.error("🎥Please enter your review title");
  const notify2 = () => toast.error("🎥Please enter your review");
  const notify3 = () => toast.error("🎥Please enter your rating");
  const notify4 = () => toast.error("🎥Please enter your movie title");
  const notifyAll = () =>
    toast.success(
      <p>
        🎉your data was received successfully
        <br />
        <br />
        🎥selected movie: {selectedMovie}
        <br />
        <br />
        🎥review title: {reviewTitleValue.slice(0,30) + "..."}
        <br />
        <br />
        🎥review body: {reviewValue.name.slice(0, 40) + "..."}
        <br />
        <br />
        ⭐️review rating: {ratingValue}
      </p>,
      {
        autoClose: 5000,
      }
    );
  // var error = false
  const [reviewTitleValue, setReviewTitleValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [reviewValue, setReviewValue] = React.useState({
    name: "",
  });
  const [errorReview, setErrorReview] = React.useState(false);
  const [ratingValue, setRatingValue] = React.useState("");
  const [errorRating, setErrorRating] = React.useState(false);
  const [selectedMovie, setSelectedMovie] = React.useState("");
  const [errorSelected, setErrorSelected] = React.useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(selectedMovie);
    if (
      reviewTitleValue.length > 0 &&
      reviewValue.name.length > 0 &&
      ratingValue.length > 0 &&
      selectedMovie !== "" &&
      ratingValue > 0
    ) {
      notifyAll();
      setReviewTitleValue("");
      setReviewValue({ name: "" });
      setRatingValue("");
      setSelectedMovie(null);
    }
    if (reviewTitleValue === "") {
      setError(true);
      notify();
    }

    if (selectedMovie === "" || selectedMovie == null) {
      setErrorSelected(true);
      notify4();
    }

    if (reviewValue.name === "") {
      setErrorReview(true);
      notify2();
    }

    if (ratingValue === "") {
      setErrorRating(true);
      notify3();
    }

    if (ratingValue.length !== 0) {
      setErrorRating(false);
    }

    if (selectedMovie !== "") {
      setErrorSelected(false);
    }

    if (reviewTitleValue.length !== 0) {
      setError(false);
    }

    if (reviewValue.name.length !== 0) {
      setErrorReview(false);
    }
  };

  return (
    <div>
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
          }}
          variant="h3"
          gutterBottom={true}
        >
          Movie Review Website
        </Typography>
      </Grid>
      <MovieSelection
        onChange={setSelectedMovie}
        value={selectedMovie || null}
        error={errorSelected}
      />
      <ReviewTitle
        onChange={setReviewTitleValue}
        error={error}
        value={reviewTitleValue}
      />
      <ReviewBody
        onChange={setReviewValue}
        error={errorReview}
        value={reviewValue}
      />
      <ReviewRating
        onChange={setRatingValue}
        value={ratingValue}
        error={errorRating}
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
        Submit
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
    </div>
  );
};

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
          <MenuItem value={"There Will Be Blood"}>There Will Be Blood</MenuItem>
          <MenuItem value={"Inception"}>Inception</MenuItem>
          <MenuItem value={"Soul"}>Soul</MenuItem>
          <MenuItem value={"Batman"}>Batman</MenuItem>
          <MenuItem value={"LaLa Land"}>LaLa Land</MenuItem>
        </Select>
        <FormHelperText>Select a Movie</FormHelperText>
      </FormControl>
    </Grid>
  );
};

const ReviewTitle = (props) => {
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
        style={{ margin: theme.spacing(1), minWidth: 200 }}
        id="standard-secondary"
        label="Review Title"
        helperText="Write the Title of the Review"
        color="primary"
        error={props.error}
        onChange={ReviewTitleHandler}
        value={props.value}
      />
    </Grid>
  );
};

const ReviewBody = (props) => {
  const ReviewHandler = (name) => (event) => {
    if (props.value.name === "") {
      props.onChange({ ...props.value, [name]: event.target.value.trim() });
    } else {
      props.onChange({ ...props.value, [name]: event.target.value });
    }
  };
  const CHARACTER_LIMIT = 200;

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
        id="standard-textarea"
        label="Review"
        helperText={`Write Your Review ${props.value.name.length}/${CHARACTER_LIMIT}`}
        onChange={ReviewHandler("name")}
        value={props.value.name}
        error={props.error}
        multiline
        minRows={5}
        inputProps={{
          maxLength: CHARACTER_LIMIT,
        }}
      />
    </Grid>
  );
};

const ReviewRating = (props) => {
  const ReviewRatingHandler = (event) => {
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
      <FormControl
        style={{ margin: theme.spacing(1), position: "relative", top: "20px" }}
        error={props.error}
      >
        <FormLabel component="legend">Rate The Movie</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="Rating"
          component="fieldset"
          onChange={ReviewRatingHandler}
          value={props.value}
          style={{ position: "relative", top: "10px", marginBottom: "10px" }}
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="1"
            labelPlacement="bottom"
            style={{ position: "relative", left: "-10px" }}
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="2"
            labelPlacement="bottom"
            style={{ position: "relative", left: "-30px" }}
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="3"
            labelPlacement="bottom"
            style={{ position: "relative", left: "-50px" }}
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="4"
            labelPlacement="bottom"
            style={{ position: "relative", left: "-70px" }}
          />
          <FormControlLabel
            value="5"
            control={<Radio color="primary" />}
            label="5"
            labelPlacement="bottom"
            style={{ position: "relative", left: "-90px" }}
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};
