import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge, Spin } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const FileUpload = ({ values, setValues }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const fileUploadAndResize = (e) => {
        let files = e.target.files;
        let allUploadedFiles = values.images;

        if (files) {
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        setLoading(true);
                        axios
                            .post(
                                `${process.env.REACT_APP_API}/images/upload`,
                                { image: uri },
                                { headers: { token: user ? user.token : '' } }
                            )
                            .then((res) => {
                                allUploadedFiles.push(res.data);
                                setValues({
                                    ...values,
                                    images: allUploadedFiles,
                                });
                                setLoading(false);
                            })
                            .catch((err) => {
                                toast.error(err);
                                setLoading(false);
                            });
                    },
                    'base64'
                );
            }
        }
    };

    const handleImageRemove = (public_id) => {
        setLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_API}/images/remove`,
                { public_id },
                { headers: { token: user ? user.token : '' } }
            )
            .then((res) => {
                const { images } = values;

                let filteredImage = images.filter((image) => {
                    return image.public_id !== public_id;
                });

                setValues({ ...values, images: filteredImage });
                setLoading(false);
                toast.success(`Delete image with id ${public_id} successfully`);
            })
            .catch((err) => {
                toast.error(err);
                setLoading(false);
            });
    };
    return (
        <>
            <div className='form-group'>
                {values.images &&
                    values.images.map((image) => (
                        <Badge
                            count='X'
                            key={image.public_id}
                            onClick={() => handleImageRemove(image.public_id)}
                            style={{ cursor: 'pointer' }}>
                            <Avatar
                                key={image.public_id}
                                src={image.url}
                                size={60}
                                shape='square'
                                className='ml-3'
                            />
                        </Badge>
                    ))}
            </div>
            <div className='form-group'>
                <label className='btn btn-primary btn-raised'>
                    <Spin
                        className='mr-2'
                        spinning={loading}
                        indicator={
                            <LoadingOutlined style={{ color: 'white' }} spin />
                        }
                    />
                    Choose File
                    <input
                        type='file'
                        multiple
                        hidden
                        accept='image/*'
                        onChange={fileUploadAndResize}
                    />
                </label>
            </div>
        </>
    );
};

export default FileUpload;
