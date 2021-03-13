import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct } from '../../../functions/product';
import { getCategories, getSubCategories } from '../../../functions/category';
import ProductForm from '../../../components/forms/ProductForm';
//import CategoryList from '../../../pages/admin/category/CategoryList';
import FileUpload from '../../../components/forms/FileUpload';

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

const ProductUpdate = ({ match }) => {
    const [values, setValues] = useState(initialState);
    const { user } = useSelector((state) => ({ ...state }));
    const { params } = match;

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = () => {
        getProduct(user.token, params.slug)
            .then((res) => {
                setValues({ ...values, ...res.data });
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
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
                            <h4>Product Update</h4>
                            <hr />
                            <form></form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
