'use strict';
import * as axios from 'axios';
const baseApiUrl = process.env.API_URL || 'http://localhost:3001/api';

// find Product

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

// exports


module.exports = {
    'findProductsByTitle': findProductsByTitle,
    'listProducts': listProducts
};