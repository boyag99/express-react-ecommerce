import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import SubCategoryForm from '../../../components/forms/SubCategoryForm';
import {
    createSubCategory,
    getSubCategories,
    removeSubCategory,
} from '../../../functions/sub_categories';
import SubCategoryList from './SubCategoryList';

const SubCategoryCreate = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadSubCategories();
    }, []);

    const loadSubCategories = () => {
        getSubCategories().then((res) => setSubCategories(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        createSubCategory(user.token, { name, category: category.key })
            .then((res) => {
                setLoading(false);
                setName('');
                loadSubCategories();
                toast.success(
                    `Create sub category with name ${name} of category ${category.children} successfully`
                );
            })
            .catch((error) => {
                setLoading(false);
                toast.error(
                    `An error occurred while creating sub category with name ${name}`
                );
            });
    };

    const handleRemove = async (slug) => {
        setLoading(true);
        let confirm = window.confirm(
            'Are you sure you want to remove this category?'
        );

        if (confirm) {
            const res = await removeSubCategory(user.token, slug);

            if (res) {
                loadSubCategories();
                toast.success(
                    `Delete sub category with name ${res.data.name} successfully`
                );
            } else {
                toast.error(
                    `Delete sub category with name ${res.data.name} failed`
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
                            <h4>Sub Category Create</h4>
                            {
                                <SubCategoryForm
                                    handleSubmit={handleSubmit}
                                    name={name}
                                    setName={setName}
                                    setCategory={setCategory}
                                    loading={loading}
                                />
                            }
                            <hr />
                            <SubCategoryList
                                loading={loading}
                                subCategories={subCategories}
                                handleRemove={handleRemove}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryCreate;
