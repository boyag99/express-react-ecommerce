import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    createCategory,
    getCategories,
    removeCategory,
} from '../../../functions/category';
import { Button, Table, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const CategoryCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        createCategory(user.token, name)
            .then((res) => {
                loadCategories();
                setLoading(false);
                setName('');
                toast.success(
                    `Create category with name "${res.data.name}" successfully`
                );
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) {
                    toast.error(err.response.data);
                }
            });
    };

    const createCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name category"
                        autoFocus
                        required
                    />
                </div>
                <div className="form-group">
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={handleSubmit}
                        disabled={!name || name.length < 3}>
                        Submit
                    </Button>
                </div>
            </form>
        );
    };

    const handleRemove = async (slug) => {
        setLoading(true);
        let confirm = window.confirm(
            'Are you sure you want to remove this category?'
        );

        if (confirm) {
            const res = await removeCategory(user.token, slug);

            if (res) {
                loadCategories();
                toast.success(
                    `Delete category with name ${res.data.name} successfully`
                );
            } else {
                toast.error(
                    `Delete category with name ${res.data.name} failed`
                );
            }
        }

        setLoading(false);
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link>
                        <EditOutlined />
                    </Link>
                    <Link onClick={() => handleRemove(record.slug)}>
                        <DeleteOutlined />
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h4>Category Create</h4>
                            {createCategoryForm()}

                            <hr />
                            <Table
                                loading={loading}
                                rowKey={(record) => record._id}
                                columns={columns}
                                dataSource={categories}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
