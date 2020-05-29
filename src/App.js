import React, { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Component/Layout/Navbar.js";
import Users from "./Component/User/Users.js";
import User from "./Component/User/User.js";
import Search from "./Component/User/Search.js";
import Alert from "./Component/Layout/Alert";
import About from "./Component/Pages/About.js";
import PropTypes from "prop-types";
import axios from "axios";
import "./App.css";
import GithubState from "./context/github/GithubState";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);
  /* state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  };*/

  //Get the repos for the given username
  const getUserRepos = async (username) => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 5000);
  };

  //Render for main component
  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <Users />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={(props) => (
                  <User {...props} getUserRepos={getUserRepos} repos={repos} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

App.propTypes = {
  // searchUsers: PropTypes.func.isRequired,
};

export default App;
