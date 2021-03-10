import React from 'react';

const FileUpload = () => {
    const fileUploadAndResize = (e) => {
        console.log(e.target.files);
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
