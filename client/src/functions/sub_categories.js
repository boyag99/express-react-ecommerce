import axios from 'axios';

export const createSubCategory = async (token, name) => {
    return await axios.post(
        `${process.env.REACT_APP_API}`,
        { name },
        {
            headers: {
                token,
            },
        }
    );
};

export const getSubCategory = async (token, slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/${slug}`, {
        headers: {
            token,
        },
    });
};

export const updateSubCategory = async (token, name, slug) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/${slug}`,
        { name },
        {
            headers: {
                token,
            },
        }
    );
};

export const removeSubCategory = async (token, slug) => {
    return await axios.delete(`${process.env.REACT_APP_API}/${slug}`, {
        headers: {
            token,
        },
    });
};

export const getSubCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}`);
};
