import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductForm from '../../../components/forms/ProductForm';
//import CategoryList from '../../../pages/admin/category/CategoryList';

const initialState = {
    title: '',
    description: '',
    price: 0,
    category: '',
    categories: [],
    subCategories: [],
    shipping: '',
    quantity: 0,
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
    color: '',
    brand: '',
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createProduct(user.token, values)
            .then((res) => {
                window.alert(
                    `Created product with name ${values.title} successfully`
                );
                window.location.reload();
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    toast.error(err.response.data);
                }
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className='container-fluid p-5'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <div className='col-md-10'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <h4>Product Create</h4>
                            <hr />
                            <ProductForm
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}
                                values={values}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
