import React from 'react';
import UserNav from '../../components/nav/UserNav';

const History = () => (
    <div className="container-fluid p-5">
        <div className="row">
            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col-md-10">
                <p className="p-10">user page</p>
            </div>
        </div>
    </div>
);

export default History;