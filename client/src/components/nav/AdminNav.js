import React, { useState } from 'react';
import { Menu } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminNav = () => {

    const [current, setCurrent] = useState('admin_dashboard');

    const handleClick = e => {
        setCurrent(e.key);
    }

    return (
        <Menu mode="inline" style={{ width: 256 }} selectedKeys={[current]} onClick={handleClick}>
            <Menu.Item key="admin_dashboard" icon={<RightOutlined />}>
                <Link to="/admin/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="admin_category" icon={<RightOutlined />}>
                <Link to="/admin/category">Category</Link>
            </Menu.Item>
            <Menu.Item key="admin_sub-category" icon={<RightOutlined />}>
                <Link to="/admin/sub-category">Sub Category</Link>
            </Menu.Item>
            <Menu.Item key="admin_product" icon={<RightOutlined />}>
                <Link to="/admin/product">Product</Link>
            </Menu.Item>
            <Menu.Item key="admin_coupon" icon={<RightOutlined />}>
                <Link to="/admin/coupon">Coupon</Link>
            </Menu.Item>
            <Menu.Item key="user_password" icon={<RightOutlined />}>
                <Link to="/user/password">Password</Link>
            </Menu.Item>
        </Menu>
    );

}

export default AdminNav;