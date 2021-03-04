import React from 'react';
import { Button } from 'antd';

const CategoryForm = ({ handleSubmit, name, setName, loading }) => {
    return (
        <form>
            <div className='form-group'>
                <label htmlFor='name'>Name:</label>
                <input
                    type='text'
                    className='form-control'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Enter name category'
                    autoFocus
                    required
                />
            </div>
            <div className='form-group'>
                <Button
                    type='primary'
                    loading={loading}
                    onClick={handleSubmit}
                    disabled={!name || name.length < 3}>
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;
