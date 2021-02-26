import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/Header';

const App = () => {
  
  return (
    
    <>
      <Header />
      <Switch>

          <Route exact path="/" component={Home}></Route>

          <Route exact path="/register" component={Register}></Route>

          <Route exact path="/login" component={Login}></Route>

      </Switch>

      <ToastContainer />
    </>
  );

}

export default App;
