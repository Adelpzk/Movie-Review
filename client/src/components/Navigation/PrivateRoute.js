import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from './history';
import Navbar from "../Navbar";
import Reviews from "../Reviews"
import Landing from "../Landing"
import MyPage from "../MyPage";

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Navbar/>
      <Switch>
      
      <Route path="/Reviews" exact component={Reviews} />
      <Route path="/Landing" exact component={Landing} />
      <Route path="/MyPage" exact component={MyPage} />
      {/* <Route path="/Search" exact component={Search} /> */}
      </Switch>
    </Router>
  );
}