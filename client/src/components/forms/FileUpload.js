import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';

const FileUpload = () => {
    const fileUploadAndResize = (e) => {
        let files = e.target.files;

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
                        console.log(uri);
                    },
                    'base64'
                );
            }
        }
    };
    return (
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
    );
};

export default FileUpload;
