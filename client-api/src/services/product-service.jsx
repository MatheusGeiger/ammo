'use strict';
import * as axios from 'axios';
const baseApiUrl = process.env.API_URL || 'http://localhost:3001/api';

// add Product

const addProduct = (title, price, percentageDiscount, category, photos) => {

    return new Promise((resolve, reject) => {
        axios
            .post(`${baseApiUrl}/products`, { 
                'title': title,
                'price': parseFloat(price),
                'percentageDiscount': parseFloat(percentageDiscount),
                'category': category,
                'photos': JSON.parse(photos)})
            .then((result) => {
                resolve(result.data);
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    });

};


// find Product


const findProduct = (id) => {
    
    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/products/${id}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
    
};


const findProductsByTitle = (title) => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/products?title=${title}`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};

const listProducts = () => {

    return new Promise((resolve, reject) => {
        axios
            .get(`${baseApiUrl}/products`)
            .then(response => {
                resolve(response.data);
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// remove Product


const removeProduct = (id) => {

    return new Promise((resolve, reject) => {
        axios
            .delete(`${baseApiUrl}/products/${id}`)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });

};


// update Product


const updateProduct = (product) => {
    
    product.photos = JSON.parse(product.photos);
    product.price = parseFloat(product.price);
    product.percentageDiscount = parseFloat(product.percentageDiscount);

    return new Promise((resolve, reject) => {
        axios
            .put(`${baseApiUrl}/products/${product._id}`, product)
            .then(() => {
                resolve();
                return;
            })
            .catch(error => {
                reject(error.message);
                return;
            });
    });
    
};


// exports


module.exports = {
    'addProduct': addProduct,
    'findProduct': findProduct,
    'findProductsByTitle': findProductsByTitle,
    'listProducts': listProducts,
    'removeProduct': removeProduct,
    'updateProduct': updateProduct
};