import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    createCategory,
    getCategories,
    removeCategory,
} from '../../../functions/category';
import { Button, Table, Space, Input } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

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

    const getColumnSearchProps = (dataIndex) => {
        return {
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => {
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            );
                        }}
                        onPressEnter={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        style={{
                            width: 188,
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                    <Space>
                        <Button
                            type='primary'
                            onClick={() =>
                                handleSearch(selectedKeys, confirm, dataIndex)
                            }
                            icon={<SearchOutlined />}
                            size='small'
                            style={{ width: 90 }}>
                            Search
                        </Button>
                        <Button
                            onClick={() => handleReset(clearFilters)}
                            size='small'
                            style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => (
                <SearchOutlined
                    style={{ color: filtered ? '#1890ff' : undefined }}
                />
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex]
                          .toString()
                          .toLowerCase()
                          .includes(value.toLowerCase())
                    : '',
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{
                            backgroundColor: '#ffc069',
                            padding: 0,
                        }}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
        };
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
            ...getColumnSearchProps('slug'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size='middle'>
                    <Link to={'/admin/category/edit/' + record.slug}>
                        <EditOutlined />
                    </Link>
                    <Link to='/#' onClick={() => handleRemove(record.slug)}>
                        <DeleteOutlined />
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <div className='container-fluid p-5'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <div className='col-md-10'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <h4>Category Create</h4>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                loading={loading}
                            />

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
