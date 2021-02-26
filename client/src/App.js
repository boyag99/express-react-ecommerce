import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const App = () => {
  
  return (
    <Switch>

        <Route exact path="/" component={Home}></Route>

        <Route exact path="/register" component={Register}></Route>

        <Route exact path="/login" component={Login}></Route>

    </Switch>
  );

}

export default App;
