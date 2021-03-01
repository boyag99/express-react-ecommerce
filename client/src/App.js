import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase';
import { useDispatch } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Header from './components/nav/Header';
import ForgotPassword from './pages/auth/ForgotPassword';
import { currentUser } from './functions/auth';

const App = () => {

  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    
    const unSubscribe = auth.onAuthStateChanged(async (user) => {

      if (user) {
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                  name: res.data.name,
                  email: res.data.email,
                  token: idTokenResult.token,
                  role: res.data.role,
                  _id: res.data._id,
                  cart: res.data.cart
              }
            });
          });
      }
    });

    return () => unSubscribe();
  }, [dispatch]);
  
  return (
    
    <>
      <Header />
      <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/register/complete" component={RegisterComplete}></Route>
          <Route exact path="/forgot/password" component={ForgotPassword}></Route>

      </Switch>

      <ToastContainer />
    </>
  );

}

export default App;
