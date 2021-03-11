import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';

const FileUpload = ({ values, setValues }) => {
    const { user } = useSelector((state) => ({ ...state }));
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
                        axios
                            .post(
                                `${process.env.REACT_APP_API}/images/upload`,
                                { image: uri },
                                { headers: { token: user ? user.token : '' } }
                            )
                            .then((res) => {
                                console.log('IMAGE UPLOAD SUCCESS: ', res);
                                allUploadedFiles.push(res.data);
                                setValues({
                                    ...values,
                                    images: allUploadedFiles,
                                });
                            })
                            .catch((err) => {
                                console.log('IMAGE UPLOAD ERROR: ', err);
                            });
                    },
                    'base64'
                );
            }
        }
    };
    return (
        <>
            <div className='form-group'>
                {values.images &&
                    values.images.map((image) => (
                        <Avatar
                            key={image.public_id}
                            src={image.url}
                            size={60}
                            className='m-3'
                        />
                    ))}
            </div>
            <div className='form-group'>
                <label className='btn btn-primary btn-raised'>
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
