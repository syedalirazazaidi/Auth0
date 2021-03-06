import React, { Component } from "react";
import Home from "./Home";
import Profile from "./Profile";
import { Route, Redirect} from "react-router-dom";
import Auth from "./Auth/Auth";
import Nav from "./Nav";
import Callback from "./Callback";
import Public from './Public'
import Private from './Private'
class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <>
      
        <Nav auth={this.auth} />
        <div className="body">
          <Route
            path="/"
            exact
            render={(props) => <Home auth={this.auth} {...props} />}
          />
          <Route
            path="/callback"
            exact
            render={(props) => <Callback auth={this.auth} {...props} />}
          />
          <Route path="/profile"  render={props => this.auth.isAuthenticated() ?(<Profile auth={this.auth} {...props} />):(<Redirect to="/" />)} />
          <Route path ='/public' component={Public}/>
          <Route
            path="/private"
          
            render={props =>this.auth.isAuthenticated()? <Private auth={this.auth} {...props} />:this.auth.login()}
          />
         
        </div>
      </>
    );
  }
}

export default App;
