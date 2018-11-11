import React, { Component } from 'react';
import ProductCard from './ProductCard';
import Pagination from "./Pagination";

const ProductService = require('../../services/product-service');

class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allProducts: [],
            currentProducts: [],
            itemsPerPage: 8,
            titleSearch: '',
            titlePage: 'Lista de Produtos',
            searchLength: 0
        };

        this.handleOnFindProducts = this.handleOnFindProducts.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.onChangeItemsPerPage = this.onChangeItemsPerPage.bind(this);
        this.onCleanFindProducts = this.onCleanFindProducts.bind(this);
        this.onSearchTitleChanged = this.onSearchTitleChanged.bind(this);
    }

    componentDidMount() {
        this.listProducts();
    }

    listProducts() {
        ProductService
            .listProducts()
            .then(allProducts => {
                this.setState({ allProducts });
                this.setState({ searchLength: allProducts.length });
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }

    onChangeItemsPerPage(event) {
        this.state.itemsPerPage = parseInt(event.target.value);
        this.handleOnFindProducts();
    }

    onChangePage(currentProducts) {
        this.setState({ currentProducts });
    }

    onSearchTitleChanged(event) {
        const titleSearch = event.target.value;
        this.setState({ titleSearch });
    }

    onCleanFindProducts(event) {
        event.target.value = '';
        this.setState({ titleSearch: '' });
        this.setState({ titlePage: 'Lista de Produtos' });
        this.listProducts();
    }

    handleOnFindProducts() {
        let title = this.state.titleSearch

        if (!title || title === '') {
            this.setState({ titleSearch: '' });
            this.setState({ titlePage: 'Lista de Produtos' });
            this.listProducts();
            return;
        } else {
            ProductService
                .findProductsByTitle(title)
                .then(allProducts => {
                    if (allProducts.length == 0) {
                        this.setState({ currentProducts: this.state.allProducts });
                        this.setState({ searchLength: 0 });
                    } else {
                        this.setState({ allProducts });
                        this.setState({ searchLength: allProducts.length });
                    }
                    this.setState({ titlePage: title });
                    return;
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 header">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className="logo"></div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-12 input-group input-group-sm search-products">
                            <span className="input-group-btn">
                                <button className="btn btn-light" type="button" onClick={this.handleOnFindProducts}>
                                    <i className="glyphicon glyphicon-search"></i>
                                </button>
                            </span>
                            <input type="text" className="form-control input-search" placeholder="Procurar produto pelo título ..."
                                value={this.state.titleSearch} onChange={this.onSearchTitleChanged} />
                            <span className="input-group-btn">
                                <button className="btn btn-light" type="button" onClick={this.onCleanFindProducts}>
                                    <i className="glyphicon glyphicon-remove"></i>
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 title-search-page">
                        <span>
                            {this.state.titlePage}
                        </span>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="title-products-finded">
                                {
                                    (this.state.searchLength == 0) ? '0 PRODUTOS ENCONTRADOS' : this.state.allProducts.length + ' PRODUTOS ENCONTRADOS'
                                }
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {
                            (this.state.searchLength == 0) ? <div className="col-lg-12 col-md-12 col-sm-12 product-search-not-found">OPS ! Nenhum Produto Encontrado =( </div> : this.state.currentProducts.map(product => <ProductCard key={product._id} product={product} />)
                        }
                    </div>
                    <br />
                    <hr />
                    <div className="row">
                        {
                            (this.state.searchLength == 0) ? '' :
                                <div className="text-center float-left col-lg-4">
                                    <select className="form-control form-control-sm select-items-page" onChange={this.onChangeItemsPerPage} defaultValue="8">
                                        <option value="2">2 Produtos por página</option>
                                        <option value="4">4 Produtos por página</option>
                                        <option value="6">6 Produtos por página</option>
                                        <option value="8">8 Produtos por página</option>
                                        <option value="12">12 Produtos por página</option>
                                        <option value="16">16 Produtos por página</option>
                                    </select>
                                </div>
                        }
                        {
                            (this.state.searchLength == 0) ? '' :
                                <div className="text-center">
                                    <Pagination products={this.state.allProducts} onChangePage={this.onChangePage} pageSize={this.state.itemsPerPage} />
                                </div>
                        }
                    </div>
                    <div className="end-page">

                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;