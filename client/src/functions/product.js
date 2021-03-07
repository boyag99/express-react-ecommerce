import axios from 'axios';

const PRODUCT_API_ENDPOINT = 'product';

export const createProduct = async (token, product) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/${PRODUCT_API_ENDPOINT}`,
        product,
        {
            headers: {
                token,
            },
        }
    );
};

export const getProduct = async (token, slug) => {
    return await axios.get(
        `${process.env.REACT_APP_API}/${PRODUCT_API_ENDPOINT}/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};

export const updateProduct = async (token, slug, product) => {
    return await axios.put(
        `${process.env.REACT_APP_API}/${PRODUCT_API_ENDPOINT}/${slug}`,
        product,
        {
            headers: {
                token,
            },
        }
    );
};

export const removeProduct = async (token, slug) => {
    return await axios.delete(
        `${process.env.REACT_APP_API}/${PRODUCT_API_ENDPOINT}/${slug}`,
        {
            headers: {
                token,
            },
        }
    );
};

export const getProducts = async () => {
    return await axios.get(
        `${process.env.REACT_APP_API}/${PRODUCT_API_ENDPOINT}/products`
    );
};
