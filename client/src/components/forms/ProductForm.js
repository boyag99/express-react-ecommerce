import React from 'react';
import { Button, Input, InputNumber, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const ProductForm = ({ handleSubmit, handleChange, values, loading }) => {
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

    return (
        <form>
            <div className='form-group'>
                <label htmlFor='title'>Title:</label>
                <Input
                    className='form-control'
                    id='title'
                    name='title'
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
                    name='description'
                    value={description}
                    onChange={handleChange}
                    placeholder='Enter description'
                    required
                />
            </div>
            <div className='form-group'>
                <label htmlFor='price'>Price:</label>
                <Input
                    type='number'
                    defaultValue={0}
                    className='form-control'
                    id='price'
                    name='price'
                    value={price}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='shipping'>Shipping:</label>
                <select
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
                    }>
                    <option>Select a shipping</option>
                    <option key='No' value='No'>
                        No
                    </option>
                    <option key='Yes' value='Yes'>
                        Yes
                    </option>
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='quantity'>Quantity:</label>
                <Input
                    type='number'
                    defaultValue={0}
                    className='form-control'
                    id='quantity'
                    name='quantity'
                    value={quantity}
                    onChange={handleChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='color'>Color:</label>
                <select
                    id='color'
                    name='color'
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp='children'
                    value={color}
                    onChange={handleChange}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }>
                    <option>Select a color</option>
                    {colors &&
                        colors.map((color, index) => (
                            <option key={color + '_' + index} value={color}>
                                {color}
                            </option>
                        ))}
                </select>
            </div>
            <div className='form-group'>
                <label htmlFor='brand'>Brand:</label>
                <select
                    id='brand'
                    name='brand'
                    showSearch
                    style={{ width: 200 }}
                    value={brand}
                    optionFilterProp='children'
                    onChange={handleChange}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }>
                    <option>Select a brand</option>
                    {brands &&
                        brands.map((brand, index) => (
                            <option key={brand + '_' + index} value={brand}>
                                {brand}
                            </option>
                        ))}
                </select>
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
