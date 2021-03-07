import axios from 'axios';

const SUB_CATEGORY_PARAM = 'sub-category';

export const createSubCategory = async (token, subCategory) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/${SUB_CATEGORY_PARAM}`,
        subCategory,
        {
            headers: {
                token,
            },
        }
    );
};

export const getSubCategory = async (token, slug) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/${SUB_CATEGORY_PARAM}/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};

export const updateSubCategory = async (token, name, slug) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/${SUB_CATEGORY_PARAM}/${slug}`,
        { name },
        {
            headers: {
                token,
            },
        }
    );
};

export const removeSubCategory = async (token, slug) => {
    return await axios.delete(
        `${process.env.REACT_APP_API}/${SUB_CATEGORY_PARAM}/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};

export const getSubCategories = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/sub-categories`);
};
