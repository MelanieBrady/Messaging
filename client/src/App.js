import React from 'react';
import config from './config';
import './App.css';
import LoginPage from './Login/LoginPage';
import HomePage from './Home/Homepage';
import Home from './Home/Home';
import Register from './Register/Register';
import Messaging from './Messaging/Messaging';
import ProfilePage from './Profile/ProfilePage';
import ChangePassword from './ChangePassword/ChangePassword';

import {
  Route,
  BrowserRouter as Router,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <div className='router_stuff'>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/home' component={Home} />
              <Route exact path='/messaging/:username' component={Messaging} />
              <Route exact path='/profile/:username' component={ProfilePage} />
              <Route exact path='/change' component={ChangePassword} />
              <Route exact path='/' component={HomePage} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
};

export default App;