import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    createCategory,
    getCategories,
    removeCategory,
} from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';
import CategoryList from '../../../pages/admin/category/CategoryList';

const CategoryCreate = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        getCategories().then((res) => setCategories(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        createCategory(user.token, name)
            .then((res) => {
                loadCategories();
                setLoading(false);
                setName('');
                toast.success(
                    `Create category with name "${res.data.name}" successfully`
                );
            })
            .catch((err) => {
                setLoading(false);
                if (err.name === 'Error') {
                    toast.error(`Category with name ${name} already exists`);
                }
            });
    };

    const handleRemove = async (slug) => {
        setLoading(true);
        let confirm = window.confirm(
            'Are you sure you want to remove this category?'
        );

        if (confirm) {
            const res = await removeCategory(user.token, slug);

            if (res) {
                loadCategories();
                toast.success(
                    `Delete category with name ${res.data.name} successfully`
                );
            } else {
                toast.error(
                    `Delete category with name ${res.data.name} failed`
                );
            }
        }

        setLoading(false);
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
                            <h4>Category Create</h4>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                loading={loading}
                            />

                            <hr />

                            <CategoryList
                                loading={loading}
                                categories={categories}
                                handleRemove={handleRemove}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
