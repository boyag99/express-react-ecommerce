import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
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

const ProductUpdate = ({ history, match }) => {
    const [values, setValues] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [categoriesOption, setCategoriesOption] = useState([]);
    const [subCategoriesOption, setSubCategoriesOption] = useState([]);
    const [arrayOfSubCategoriesIds, setArrayOfSubCategoriesIds] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const { user } = useSelector((state) => ({ ...state }));
    const { params } = match;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(user.token, params.slug)
            .then((res) => {
                setValues({ ...values, ...res.data });
                getSubCategories(
                    user.token,
                    res.data.category._id
                ).then((res) => setSubCategoriesOption(res.data));

                let arr = [];
                res.data.subCategories.map((subCategory) =>
                    arr.push(subCategory._id)
                );
                setArrayOfSubCategoriesIds(arr);
            })
            .catch((err) => {
                console.log(err.response.data.message);
            });
    };

    const loadCategories = () => {
        getCategories().then((res) => setCategoriesOption(res.data));
    };

    const handleSubmit = () => {
        setLoading(true);

        values.subCategories = arrayOfSubCategoriesIds;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(user.token, values.slug, values)
            .then((res) => {
                toast.success(
                    `Updated product with name ${values.title} successfully`
                );
                history.push('/admin/products');
            })
            .catch((err) => {
                toast.error(err.response.data.error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        setValues({
            ...values,
            subCategories: [],
        });

        setSelectedCategory(e.target.value);

        getSubCategories(user.token, e.target.value).then((res) =>
            setSubCategoriesOption(res.data)
        );

        if (values.category._id === e.target.value) {
            loadProduct();
        }

        setArrayOfSubCategoriesIds([]);
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
                            <FileUpload values={values} setValues={setValues} />
                            <hr />
                            {JSON.stringify(values)}
                            <form onSubmit={(e) => e.preventDefault()}>
                                <ProductUpdateForm
                                    handleSubmit={handleSubmit}
                                    handleChange={handleChange}
                                    handleCategoryChange={handleCategoryChange}
                                    values={values}
                                    loading={loading}
                                    categoriesOption={categoriesOption}
                                    subCategoriesOption={subCategoriesOption}
                                    arrayOfSubCategoriesIds={
                                        arrayOfSubCategoriesIds
                                    }
                                    setArrayOfSubCategoriesIds={
                                        setArrayOfSubCategoriesIds
                                    }
                                    selectedCategory={selectedCategory}
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
