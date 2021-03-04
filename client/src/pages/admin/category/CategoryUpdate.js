import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { updateCategory, getCategory } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [oldName, setOldName] = useState('');
    const { user } = useSelector((state) => ({ ...state }));
    const { params } = match;

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = () => {
        return getCategory(user.token, params.slug).then((res) => {
            setName(res.data.name);
            setOldName(res.data.name);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        updateCategory(user.token, name, params.slug)
            .then((res) => {
                setLoading(false);
                setName('');
                toast.success(
                    `Update category with ${oldName} to ${name} successfully`
                );
                history.push('/admin/category');
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.data.message);
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
                            <h4>Category Update</h4>
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                loading={loading}
                            />

                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;
