import React from 'react';
import { Button, Input, InputNumber, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const ProductForm = ({ handleSubmit, values, loading }) => {
    const {
        title,
        description,
        price,
        category,
        categories,
        subCategories,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
    } = values;

    const handleChange = () => {
        //
    };

    return (
        <form>
            <div className='form-group'>
                <label htmlFor='title'>Title:</label>
                <Input
                    className='form-control'
                    id='title'
                    value={title}
                    onChange={handleChange}
                    placeholder='Enter name'
                    required
                    autoFocus
                />
            </div>
            <div className='form-group'>
                <label htmlFor='description'>Description:</label>
                <TextArea
                    className='form-control'
                    id='description'
                    value={description}
                    onChange={handleChange}
                    placeholder='Enter description'
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='price'>Price:</label>
                <InputNumber
                    defaultValue={0}
                    className='form-control'
                    id='price'
                    value={price}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='shipping'>Shipping:</label>
                <Select
                    id='shipping'
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp='children'
                    value={shipping}
                    onChange={handleChange}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder='Select a shipping'>
                    <Option value='No'>No</Option>
                    <Option value='Yes'>Yes</Option>
                </Select>
            </div>
            <div className='form-group'>
                <label htmlFor='quantity'>Quantity:</label>
                <InputNumber
                    defaultValue={0}
                    className='form-control'
                    id='quantity'
                    value={quantity}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='color'>Color:</label>
                <Select
                    id='color'
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Select a color'
                    optionFilterProp='children'
                    onChange={handleChange}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    value={color}>
                    {colors &&
                        colors.map((color, index) => (
                            <Option key={color + '_' + index} value={color}>
                                {color}
                            </Option>
                        ))}
                </Select>
            </div>
            <div className='form-group'>
                <label htmlFor='brand'>Brand:</label>
                <Select
                    id='brand'
                    showSearch
                    style={{ width: 200 }}
                    placeholder='Select a brand'
                    optionFilterProp='children'
                    onChange={handleChange}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    value={brand}>
                    {brands &&
                        brands.map((brand, index) => (
                            <Option key={brand + '_' + index} value={brand}>
                                {brand}
                            </Option>
                        ))}
                </Select>
            </div>
            <div className='form-group'>
                <Button
                    type='primary'
                    loading={loading}
                    onClick={handleSubmit}
                    disabled={!values.title || values.title.length < 3}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;
