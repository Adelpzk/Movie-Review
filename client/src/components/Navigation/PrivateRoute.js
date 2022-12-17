import React, { useEffect } from "react";
import { Router, Switch, Route, useHistory } from "react-router-dom";

import history from './history';
import Navbar from "../Navbar";
import Reviews from "../Reviews"
import Landing from "../Landing"
import MyPage from "../MyPage";
import Search from "../Search"

export default function PrivateRoute(){
  const history = useHistory();
 

  useEffect(() => {
    history.push('/Landing');
  }, [])
  return (

    <Router history={history}>
      <Navbar/>
      <Switch>
      <Route path="/Reviews" exact component={Reviews} />
      <Route path="/Landing" exact component={Landing} />
      <Route path="/MyPage" exact component={MyPage} />
      <Route path="/Search" exact component={Search} />
      </Switch>
    </Router>
  );
}