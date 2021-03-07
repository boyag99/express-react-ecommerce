import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import SubCategoryForm from '../../../components/forms/SubCategoryForm';
import {
    updateSubCategory,
    getSubCategories,
    getSubCategory,
} from '../../../functions/sub_categories';

const SubCategoryUpdate = ({ history, match }) => {
    const [name, setName] = useState('');
    const [oldName, setOldName] = useState('');
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [parent, setParent] = useState('');
    const [subCategories, setSubCategories] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const { params } = match;

    useEffect(() => {
        loadSubCategories();
        loadSubCategory();
    }, []);

    const loadSubCategories = () => {
        getSubCategories().then((res) => setSubCategories(res.data));
    };

    const loadSubCategory = () => {
        getSubCategory(user.token, params.slug).then((res) => {
            setName(res.data.name);
            setParent(res.data.parent);
            setOldName(res.data.name);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        updateSubCategory(user.token, params.slug, {
            name,
            category: category.key,
        })
            .then((res) => {
                setLoading(false);
                setName('');
                toast.success(
                    `Update sub category with name ${oldName} to ${name} successfully`
                );
                history.push('/admin/sub-category');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(
                    `An error occurred while updating sub category with name ${name}`
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
                            <h4>Sub Category Update</h4>
                            {
                                <SubCategoryForm
                                    handleSubmit={handleSubmit}
                                    name={name}
                                    setName={setName}
                                    setCategory={setCategory}
                                    loading={loading}
                                    parent={parent}
                                />
                            }
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCategoryUpdate;
