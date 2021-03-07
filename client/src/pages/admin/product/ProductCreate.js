import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
//import CategoryForm from '../../../components/forms/CategoryForm';
//import CategoryList from '../../../pages/admin/category/CategoryList';

const ProductCreate = () => {
    return (
        <div className='container-fluid p-5'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>
                <div className='col-md-10'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <h4>Product Create</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
