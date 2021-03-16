import React, { useState, useEffect } from 'react';
import { Button, Select } from 'antd';
import { getCategories } from '../../functions/category';

const { Option } = Select;

const SubCategoryForm = ({
    handleSubmit,
    name,
    setName,
    setCategory,
    loading,
    parent,
}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };

    return (
        <form>
            <div className='form-group'>
                <label htmlFor='category'>Category: </label>
                <Select
                    defaultValue={parent._id}
                    className='form-control'
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Select category'
                    optionFilterProp='children'
                    onChange={(key, value, children) => {
                        setCategory(value);
                    }}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }>
                    {categories.length > 0 &&
                        categories.map((category) => (
                            <Option key={category._id} value={category._id}>
                                {category.name}
                            </Option>
                        ))}
                </Select>
            </div>
            <div className='form-group'>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter name sub category'
                    autoFocus
                    required
                />
            </div>
            <div className='form-group'>
                <Button
                    type='primary'
                    loading={loading}
                    onClick={handleSubmit}
                    disabled={!name || name.length < 3}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default SubCategoryForm;
