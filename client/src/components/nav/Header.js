import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, UserOutlined, LoginOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'

const { SubMenu, Item } = Menu;

const Header = () => {
    const [current, setCurrent] = useState('home');

    let dispatch = useDispatch();
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

          <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
          </Item>

          <Item key="login" icon={<LoginOutlined />} className="float-right">
          <Link to="/login">Login</Link>
          </Item>

          <SubMenu icon={<UserOutlined />} title="Username" className="float-right">
              <Item key="setting:1" icon={<AppstoreOutlined />}>Dashboard</Item>
              <Item icon={<LogoutOutlined />} onClick={logout}>Logout</Item>
          </SubMenu>
        </Menu>
      );

}

export default Header;
