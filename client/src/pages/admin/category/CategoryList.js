import React, { useState, useEffect } from 'react';
import { Table, Input, Space, Button } from 'antd';
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

const CategoryList = ({ loading, categories, handleRemove }) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

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
                    <Link to='#' onClick={() => handleRemove(record.slug)}>
                        <DeleteOutlined />
                    </Link>
                </Space>
            ),
        },
    ];

    return (
        <Table
            loading={loading}
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={categories}
        />
    );
};

export default CategoryList;
