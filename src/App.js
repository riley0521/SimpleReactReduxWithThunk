import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React from "react";
import { UserList } from "./features/users/UserList";
import { AddUser } from "./features/users/AddUser";
import { EditUser } from "./features/users/EditUser";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserList} />
        <Route exact path="/add-user" component={AddUser} />
        <Route path="/edit-user/:id" component={EditUser} />
      </Switch>
    </Router>
  );
}