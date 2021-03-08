import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import { getCategories, getSubCategories } from '../../../functions/category';
import ProductForm from '../../../components/forms/ProductForm';
//import CategoryList from '../../../pages/admin/category/CategoryList';

const initialState = {
    title: '',
    description: '',
    price: 0,
    category: '',
    categories: [],
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
    const [subCategories, setSubCategories] = useState([]);
    const [subCategory, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then((res) =>
            setValues({ ...values, categories: res.data })
        );
    };

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
                setLoading(false);
                toast.error(err.response.data.error);
            });
    };

    const handleChange = (e) => {
        if (e.target.name === 'subCategory') {
            setCategory(e.target.value);
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const handleCategoryChange = (e) => {
        setSubCategories([]);
        setValues({ ...values, [e.target.name]: e.target.value });
        if (e.target.value === 'default') {
            return;
        }

        getSubCategories(user.token, e.target.value).then((res) =>
            setSubCategories(res.data)
        );
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
                                handleCategoryChange={handleCategoryChange}
                                values={values}
                                loading={loading}
                                subCategories={subCategories}
                                subCategory={subCategory}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
