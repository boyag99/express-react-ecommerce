import React from 'react';
import AdminNav from '../../components/nav/AdminNav';

const AdminDashboard = () => {
    return (
        <div className='container-fluid p-5'>
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav />
                </div>

                <div className='col'>
                    <h1>Admin Dashboard</h1>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
