import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Header from './components/nav/Header';
import ForgotPassword from './pages/auth/ForgotPassword';
import History from './pages/user/History';
import UserRoute from './components/routes/UserRoute';
import Wishlist from './pages/user/Wishlist';
import Password from './pages/user/Password';

import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CategoryCreate from './pages/admin/category/CategoryCreate';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import SubCategoryCreate from './pages/admin/sub_category/SubCategoryCreate';
import SubCategoryUpdate from './pages/admin/sub_category/SubCategoryUpdate';
import ProductCreate from './pages/admin/product/ProductCreate';
import AllProducts from './pages/admin/product/AllProducts';
import ProductUpdate from './pages/admin/product/ProductUpdate';

import { auth } from './firebase';
import { currentUser } from './functions/auth';

const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth state
    useEffect(() => {
        const unSubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                currentUser(idTokenResult.token).then((res) => {
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                            cart: res.data.cart,
                        },
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
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route
                    exact
                    path='/register/complete'
                    component={RegisterComplete}
                />
                <Route
                    exact
                    path='/forgot/password'
                    component={ForgotPassword}
                />
                <UserRoute exact path='/user/history' component={History} />
                <UserRoute exact path='/user/password' component={Password} />
                <UserRoute exact path='/user/wishlist' component={Wishlist} />
                <AdminRoute
                    exact
                    path='/admin/dashboard'
                    component={AdminDashboard}
                />
                <AdminRoute
                    exact
                    path='/admin/category'
                    component={CategoryCreate}
                />
                <AdminRoute
                    exact
                    path='/admin/category/edit/:slug'
                    component={CategoryUpdate}
                />
                <AdminRoute
                    exact
                    path='/admin/sub-category'
                    component={SubCategoryCreate}
                />
                <AdminRoute
                    exact
                    path='/admin/sub-category/edit/:slug'
                    component={SubCategoryUpdate}
                />
                <AdminRoute
                    exact
                    path='/admin/product'
                    component={ProductCreate}
                />
                <AdminRoute
                    exact
                    path='/admin/products'
                    component={AllProducts}
                />
                <AdminRoute
                    exact
                    path='/admin/product/edit/:slug'
                    component={ProductUpdate}
                />
            </Switch>

            <ToastContainer />
        </>
    );
};

export default App;
