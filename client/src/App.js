import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Header from './components/nav/Header';

const App = () => {
  
  return (
    
    <>
      <Header />
      <Switch>

          <Route exact path="/" component={Home}></Route>

          <Route exact path="/login" component={Login}></Route>

          <Route exact path="/register" component={Register}></Route>

          <Route exact path="/register/complete" component={RegisterComplete}></Route>

      </Switch>

      <ToastContainer />
    </>
  );

}

export default App;
