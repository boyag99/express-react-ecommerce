import React, { useState } from 'react';
import { Menu } from 'antd';
import { HistoryOutlined, FormatPainterOutlined, LikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const UserNav = () => {

    const [current, setCurrent] = useState('history');

    const handleClick = e => {
        setCurrent(e.key);
    }


    return (
        <Menu mode="inline" style={{ width: 256 }} selectedKeys={[current]} onClick={handleClick}>
            <Menu.Item key="history" icon={<HistoryOutlined />}>
                <Link to="/user/history">History</Link>
            </Menu.Item>
            <Menu.Item key="password" icon={<FormatPainterOutlined />}>
                <Link to="/user/password">Password</Link>
            </Menu.Item>
            <Menu.Item key="wishlist" icon={<LikeOutlined />}>
                <Link to="/user/wishlist">Wishlist</Link>
            </Menu.Item>
        </Menu>
    );

}

export default UserNav;