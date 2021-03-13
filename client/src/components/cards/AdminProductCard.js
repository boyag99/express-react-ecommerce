import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdminProductCart = ({ product, loading, handleDelete }) => {
    const { title, description, images } = product;

    return (
        <Card
            loading={loading}
            hoverable
            cover={
                <img
                    alt='example'
                    src={
                        images && images.length
                            ? images[0].url
                            : '/images/default-image.png'
                    }
                    style={{ objectFit: 'cover', height: 240 }}
                    className='p-1'
                />
            }
            actions={[
                <Link to={`/admin/product/edit/${product.slug}`}>
                    <EditOutlined key='edit' />
                </Link>,
                <DeleteOutlined
                    key='delete'
                    onClick={() => handleDelete(product.slug)}
                />,
            ]}>
            <Meta
                title={title}
                description={`${
                    description && description.substring(0, 35)
                }...`}
            />
        </Card>
    );
};

export default AdminProductCart;
