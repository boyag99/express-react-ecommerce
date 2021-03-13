import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import { getCategories, getSubCategories } from '../../../functions/category';
import ProductForm from '../../../components/forms/ProductForm';
//import CategoryList from '../../../pages/admin/category/CategoryList';
import FileUpload from '../../../components/forms/FileUpload';

const ProductUpdate = ({ match }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const { params } = match;

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
                            {params.slug}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;