import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    createCategory,
    getCategories,
    removeCategory,
} from '../../../functions/category';
import { Button } from 'antd';

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
                console.log(res);
                setLoading(false);
                setName('');
                toast.success(
                    `Create category with name "${res.data.name}" successfully`
                );
            })
            .catch((err) => {
                setLoading(false);
                if (err.response.status === 400) {
                    toast.error(err.response.data);
                }
            });
    };

    const createCategoryForm = () => {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name category"
                        autoFocus
                        required
                    />
                </div>
                <div className="form-group">
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={handleSubmit}
                        disabled={!name || name.length < 6}>
                        Submit
                    </Button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <h4>Category Create</h4>
                            {createCategoryForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
