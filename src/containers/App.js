import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { isUserAuthenticated, forwardToken, logOut } from "../services/api";

import HomePage from "../components/Homepage";
import LoginPage from "../containers/LoginPage";
import SignUpPage from "../containers/SignUpPage";
import StockListPage from "../containers/StockListPage";
import AddItemPage from "../containers/AddItemPage";
import EditItemPage from "./EditItemPage";

const RegularRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest} />} />
);

const RouteIfLoggedOut = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => <Component {...props} {...rest} />} />
);

const RouteIfLoggedIn = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const RouteIfAdmin = ({ component: Component, isAdmin, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAdmin ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  state = {
    currentUser: {
      username: null,
      isAdmin: false
    },
    authenticated: false
  };

  toggleAuthenticate = user => {
    if (isUserAuthenticated()) {
      forwardToken();
      this.setState({
        authenticated: true,
        currentUser: {
          username: localStorage.username,
          isAdmin: localStorage.isAdmin === "true"
        }
      });
    }
  };

  setCurrentUser = user => {
    this.toggleAuthenticate(user);
  };

  toggleLogOut = () => {
    logOut();
    this.setState({
      authenticated: false,
      currentUser: {
        username: null,
        isAdmin: false
      }
    });
  };

  componentDidMount() {
    this.toggleAuthenticate();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
            <div className="top-bar">
              <div className="top-bar-left" />
              <Link to="/">Home</Link>

              {isUserAuthenticated() ? (
                <span>
                  Welcome {this.state.currentUser.username}
                  <Link to="/stocklist">See List</Link>
                  <Link to="/additem"> Add Stock Item</Link>
                  {this.state.currentUser.isAdmin ? (
                    <Link to="/registeruser"> Register User </Link>
                  ) : (
                    <span />
                  )}
                  <a onClick={this.toggleLogOut}> Logout </a>
                </span>
              ) : (
                <Link to="/login"> Login </Link>
              )}
            </div>

            <RegularRoute exact path="/" component={HomePage} />
            <RouteIfLoggedOut
              path="/login"
              component={LoginPage}
              setCurrentUser={this.setCurrentUser}
            />
            <RouteIfLoggedIn path="/stocklist" component={StockListPage} />
            <RouteIfLoggedIn path="/additem" component={AddItemPage} />
            <RouteIfLoggedIn
              path="/edititem"
              isAdmin={this.state.currentUser.isAdmin}
              component={EditItemPage}
            />
            <RouteIfAdmin
              path="/registeruser"
              isAdmin={this.state.currentUser.isAdmin}
              component={SignUpPage}
            />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
