import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import SubCategoryForm from '../../../components/forms/SubCategoryForm';
import { createSubCategory } from '../../../functions/sub_categories';

const SubCategoryCreate = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        createSubCategory(user.token, { name, category: category.key })
            .then((res) => {
                setLoading(false);
                setName('');
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryCreate;
