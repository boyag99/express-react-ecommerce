import axios from 'axios';

export const createOrUpdateUser = async (token) => {
    return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, { 
        headers: { 
            token
        }
    });
}