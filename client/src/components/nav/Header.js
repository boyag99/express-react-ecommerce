import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, UserOutlined, LoginOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');

    let dispatch = useDispatch();
    let { user } = useSelector((state) => ({...state}));

    let history = useHistory();

    const handleClick = e => {
        setCurrent(e.key);
    }

    const logout = async () => {
      await firebase.auth().signOut();

      dispatch({ 
        type: 'LOGOUT',
        payload: null
      })

      toast.success('Logout successfully');

      history.push('/login');
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
          <Item key="home" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Item>

          {!user && (
            <Item key="register" icon={<UserAddOutlined />} className="float-right">
              <Link to="/register">Register</Link>
            </Item>
          )}

          {!user && (
            <Item key="login" icon={<LoginOutlined />} className="float-right">
              <Link to="/login">Login</Link>
            </Item>
          )}

          {user && (
            <SubMenu icon={<UserOutlined />} title={user && user.name} className="float-right">
              
              {user && user.role === 'subscriber' && (
                <Item key="user_history" icon={<AppstoreOutlined />}>
                  <Link to="/user/history">Dashboard</Link>
                </Item>
              )}

              {user && user.role === 'admin' && (
                <Item key="admin_dashboard" icon={<AppstoreOutlined />}>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Item>
              )}

              <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
            </SubMenu>
          )}
        </Menu>
      );

}

export default Header;
