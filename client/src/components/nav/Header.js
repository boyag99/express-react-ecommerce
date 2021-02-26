import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserAddOutlined, UserOutlined, LoginOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Header = () => {

    const [current, setCurrent] = useState('home');

    const handleClick = e => {
        console.log('click ', e);
        setCurrent(e.key);
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
          <Link to="/login">Register</Link>
          </Item>

          <SubMenu icon={<UserOutlined />} title="Username" className="float-right">
              <Item key="setting:1" icon={<AppstoreOutlined />}>Dashboard</Item>
                <Item key="setting:2" icon={<LogoutOutlined />}>Logout</Item>
          </SubMenu>
        </Menu>
      );

}

export default Header;
