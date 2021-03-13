import React, { useState, useEffect } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount } from '../../functions/product';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);

        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
                setLoading(false);
            });
    };

    return (
        <div className='container-fluid p-5'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <div className='col'>
                    <p>admin dashboard page</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
