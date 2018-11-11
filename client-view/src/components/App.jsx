import React, { Component } from 'react';
import ProductPage from './Product/ProductPage';

export default class App extends Component {

    constructor() {
        super();

        this.state = {
            title: 'Cliente VIEW - REACT',
            description: 'Cliente VIEW - REACT'
        };
    }

    render() {
        return (
            <div className="container-fluid">
                <ProductPage />
            </div>
        );
    }
}