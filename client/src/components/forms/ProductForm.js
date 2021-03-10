import React from 'react';
import { Button, Input, InputNumber, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

const ProductForm = ({
    handleSubmit,
    handleChange,
    handleCategoryChange,
    handleSubCategoryChange,
    values,
    loading,
    subCategoriesOption,
}) => {
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
        <>
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
                    name='shipping'
                    style={{ width: 200 }}
                    value={shipping}
                    onChange={handleChange}>
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
                    style={{ width: 200 }}
                    value={color}
                    onChange={handleChange}>
                    <option>Select a color</option>
                    {colors.length > 0 &&
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
                    style={{ width: 200 }}
                    value={brand}
                    onChange={handleChange}>
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
                <label htmlFor='category'>Category:</label>
                <select
                    id='category'
                    name='category'
                    style={{ width: 200 }}
                    value={category}
                    onChange={handleCategoryChange}>
                    <option value='default'>Select a brand</option>
                    {categories.length > 0 &&
                        categories.map((category, index) => (
                            <option
                                key={category._id + '_' + index}
                                value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
            </div>
            {subCategoriesOption.length > 0 && (
                <div className='form-group'>
                    <label htmlFor='subCategories'>Sub Categories:</label>
                    <Select
                        mode='multiple'
                        allowClear
                        style={{ width: '100%' }}
                        placeholder='Please select sub categories'
                        id='subCategories'
                        style={{ width: 200 }}
                        value={subCategories}
                        onChange={handleSubCategoryChange}>
                        {subCategoriesOption.map((subCategory, index) => (
                            <Option
                                key={subCategory._id + '_' + index}
                                value={subCategory._id}>
                                {subCategory.name}
                            </Option>
                        ))}
                    </Select>
                </div>
            )}

            <div className='form-group'>
                <Button
                    type='primary'
                    loading={loading}
                    onClick={handleSubmit}
                    disabled={!values.title || values.title.length < 3}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default ProductForm;
