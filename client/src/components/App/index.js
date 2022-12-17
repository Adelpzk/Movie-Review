import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import Landing from '../Landing';



const App = () => {
 
    return (
	  <Router>
	    <div>
        <PrivateRoute exact path="/Landing" component={Landing}/>
	    </div>
	  </Router>
    );
  }

export default App;