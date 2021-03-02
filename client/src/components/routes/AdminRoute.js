import React , { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../functions/auth';

const AdminRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector((state) => ({...state}));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    setOk(true);
                })
                .catch((err) => {
                    setOk(false);
                });
        }
    }, [user]);

    return (
        <Route
          {...rest}
          render={props =>
            ok ? (
              <Component {...props} />
            ) : (
                <LoadingToRedirect />
            )
          }
        />
      );
}

export default AdminRoute;