import React from 'react';
import UserNav from '../../components/nav/UserNav';

const Wishlist = () => (
    <div className="container-fluid p-5">
        <div className="row">
            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col">
                <p>user Wishlist page</p>
            </div>
        </div>
    </div>
);

export default Wishlist;