import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import AddListing from "../pages/AddListing/AddListing";
import Login from "../pages/Login/login";
import PrivateRoute from "./PrivateRoute";
import AddBlog from "../pages/AddBlog/AddBlog";
import AddLocationForm from "../pages/AddLocations/AddLocationsForm";
import FeatureCatDataGrid from "../pages/AllCat&Fetures/FeatureCatDataGrid";
import Reviews from "../pages/Reviews/Reviews";
import Customers from "../pages/Customers/Customers";
import Subscribers from "../pages/Subscribers/Subscribers";

const Routes = () => {
  const isAuthenticated = localStorage.getItem("isauthenticated");
  const accesstoken = localStorage.getItem("accessToken");
  console.log("auth", accesstoken);
  return (
    <Switch>
      <Route path="/Login" exact component={Login} />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/"
        exact
        component={Dashboard}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/addblog"
        exact
        component={AddBlog}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/addlisting"
        exact
        component={AddListing}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/addlocation"
        exact
        component={AddLocationForm}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/catandFeatures"
        exact
        component={FeatureCatDataGrid}
      />{" "}
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/reviews"
        exact
        component={Reviews}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/customers"
        exact
        component={Customers}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        path="/subscribers"
        exact
        component={Subscribers}
      />
    </Switch>
  );
};

export default Routes;
