import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import { toast } from 'react-toastify';
import AdminProductCart from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

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

    const handleDelete = async (slug) => {
        setLoading(true);
        let confirm = window.confirm(
            'Are you sure you want to remove this category?'
        );

        if (confirm) {
            const res = await removeProduct(user.token, slug);

            if (res) {
                loadAllProducts();
                toast.success(
                    `Delete product with name ${res.data.title} successfully`
                );
            } else {
                toast.error(res.response.data.error.message);
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

                <div className='col'>
                    <h1>All Products</h1>
                    <hr />
                    <div className='row'>
                        {products.map((product) => (
                            <div key={product._id} className='col-md-3 pb-3'>
                                <AdminProductCart
                                    product={product}
                                    key={product._id}
                                    loading={loading}
                                    handleDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
