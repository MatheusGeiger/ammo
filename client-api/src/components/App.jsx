import React, { Component } from 'react';
import Header from './Header';
import ProductManager from './Product/ProductManager';

export default class App extends Component {

    constructor(){
        super();

        this.state = {
            title: 'Cliente API - REACT',
            description: 'Cliente API - REACT'
        };
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container mt-5">
                    <ProductManager />
                </div>
            </div>
        );
    }
}