import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct } from '../../../functions/product';
import { getCategories, getSubCategories } from '../../../functions/category';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
//import CategoryList from '../../../pages/admin/category/CategoryList';
import FileUpload from '../../../components/forms/FileUpload';

const initialState = {
    title: '',
    description: '',
    price: 0,
    category: '',
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
    const [loading, setLoading] = useState(false);
    const [categoriesOption, setCategoriesOption] = useState([]);
    const [subCategoriesOption, setSubCategoriesOption] = useState([]);
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

    const handleSubmit = () => {};

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = () => {};

    const handleSubCategoryChange = () => {};

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
                            {JSON.stringify(values)}
                            <form onSubmit={(e) => e.preventDefault()}>
                                <ProductUpdateForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    handleCategoryChange={handleCategoryChange}
                                    handleSubCategoryChange={
                                        handleSubCategoryChange
                                    }
                                    values={values}
                                    loading={loading}
                                    categoriesOption={categoriesOption}
                                    subCategoriesOption={subCategoriesOption}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
