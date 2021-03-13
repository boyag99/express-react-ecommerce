import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const AdminProductCart = ({ product, key, loading }) => {
    const { title, description, images } = product;
    return (
        <Card
            loading={loading}
            key={key}
            hoverable
            style={{ width: 240 }}
            cover={
                <img
                    alt='example'
                    src={images && images.length ? images[0].url : ''}
                    style={{ width: '150px', objectFit: 'cover' }}
                    className='m-2'
                />
            }>
            <Meta title={title} description={description} />
        </Card>
    );
};

export default AdminProductCart;
