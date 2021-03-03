import axios from 'axios';

const CREATE = 'category/create';
const READ = 'category/read';
const UPDATE = 'category/update';
const REMOVE = 'category/remove';
const LIST = 'categories';

export const createCategory = async (token, name) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/${CREATE}`,
        { name },
        {
            headers: {
                token,
            },
        }
    );
};

export const getCategory = async (token, slug) => {
    return await axios.get(`${process.env.REACT_APP_APP}/${READ}/${slug}`, {
        headers: {
            token,
        },
    });
};

export const updateCategory = async (token, name, slug) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/${UPDATE}/${slug}`,
        { name },
        {
            headers: {
                token,
            },
        }
    );
};

export const removeCategory = async (token, slug) => {
    return await axios.delete(
        `${process.env.REACT_APP_API}/${REMOVE}/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};

export const getCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/${LIST}`);
};
