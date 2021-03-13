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
            cover={
                <img
                    alt='example'
                    src={images && images.length ? images[0].url : ''}
                    style={{ objectFit: 'cover', height: 240 }}
                    className='p-1'
                />
            }>
            <Meta title={title} description={description} />
        </Card>
    );
};

export default AdminProductCart;
