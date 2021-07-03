import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from './components/pages/Home';
import Quote from './components/pages/Quote';
import Dashboard from './components/Dashboard/Dashboard';
import Signup from './components/Dashboard/Signup';
import SignIn from './components/Dashboard/SignIn';
import Auth from "./helper/Auth";
import { Spin } from 'antd';
import PasswordReset from './components/pages/Forms/PasswordReset';
import ChangePassword from './components/pages/Forms/ChangePassword';
import AdminAccount from './components/Dashboard/AdminAccount';

const styles = {
  ntf: {
    textAlign: "center",
    marginTop: 300,
    fontSize: 32,
    fontWeight: "bold"
  }
}

class App extends Component{
  state = {
    loading: true
  }

  componentDidMount = async () => {
    this.loaderTimeOut().then(() => {
      this.setState({
        loading: false
      })
    })
  }

  loaderTimeOut = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2500)
    })
  }

  render() {
    const { loading } = this.state;
    if(loading) {
      return (
        <div className="page-loader">
          <div className="spin-loader">
            <Spin size="large" />
          </div>
        </div>
      );
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route path="/request" render={(props) => <Quote {...props} />} />
          <Route path="/accounts" render={(props) => <Signup {...props} />} />
          <Route path="/accountl" render={(props) => <SignIn {...props} />} />
          <Route path="/admin_account" render={(props) => <AdminAccount {...props} />} />
          <Route path="/reset_password" render={(props) => <PasswordReset {...props} />} />
          <Route path="/change_password/:token" render={(props) => <ChangePassword {...props} />} />
          {Auth.isUserAuthenticated() ? (
            <>
              <Route path="/dashboard" render={(props) => <Dashboard {...props} />} />
              
            </>
          ) : <Redirect to="/accountl" />}
          <Route path="/*" render={() => <div style={styles.ntf}>404 Page Not Found!!</div>} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
