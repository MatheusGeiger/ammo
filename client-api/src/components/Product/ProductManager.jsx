import React, { Component } from 'react';
import Modal from 'react-modal';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import ProductTable from './ProductTable';
import ControlPanel from './ControlPanel';
const ProductService = require('../../services/product-service');

class ProductManager extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            products: [],
            selectedProduct: null,
            isAddProductModalOpen: false,
            isEditProductModalOpen: false
        };

        
        this.handleOnAddProduct = this.handleOnAddProduct.bind(this);
        this.handleOnEditProduct = this.handleOnEditProduct.bind(this);
        this.handleOnDeleteProduct = this.handleOnDeleteProduct.bind(this);
        this.handleOnFindProducts = this.handleOnFindProducts.bind(this);
        
        this.handleOpenAddProductModal = this.handleOpenAddProductModal.bind(this);
        this.handleOnCloseAddProductModal = this.handleOnCloseAddProductModal.bind(this);

        this.handleOpenEditProductModal = this.handleOpenEditProductModal.bind(this);
        this.handleOnCloseEditProductModal = this.handleOnCloseEditProductModal.bind(this);
    }


    componentDidMount() {
        this.listProducts();
    }


    listProducts() {
        ProductService
            .listProducts()
            .then(products => {
                this.setState({products});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnDeleteProduct(productId) {

        if (productId < 1) {
            throw Error('Cannot remove product. Invalid product id specified');
        }

        ProductService
            .removeProduct(productId)
            .then(() => {
                ProductService
                    .listProducts()
                    .then(products => {
                        this.setState({products});
                        return;
                    })
                    .catch(error => {
                        console.log(error);
                        return;
                    });
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnFindProducts(title) {
        
        if (!title || title === '') {
            this.listProducts();
            return;
        }
        
        ProductService
            .findProductsByTitle(title)
            .then(products => {
                if (!products) {
                    products = [];
                }
                this.setState({products});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnAddProduct(product) {

        this.setState({ isAddProductModalOpen: false });

        const { title, price, percentageDiscount, category, photos} = product;
        
        ProductService
            .addProduct(title, price, percentageDiscount, category, photos)
            .then(newProduct => {             
                ProductService
                    .listProducts()
                    .then(products => {
                        products.forEach(n => n._id === newProduct._id ? n.isNew = 'true' : n.isNew = undefined);                
                        this.setState({products});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleOnCloseAddProductModal() {
        this.setState({isAddProductModalOpen: false});
    }


    handleOpenAddProductModal() {
        this.setState({isAddProductModalOpen: true});
    }


    handleOnCloseEditProductModal() {
        this.setState({isEditProductModalOpen: false});
    }


    handleOpenEditProductModal(productId) {

        if (!productId || productId < 1) {
            throw Error('Cannot edit product. Invalid product id specified.');
        }

        ProductService
            .findProduct(productId)
            .then(product => {
                this.setState({selectedProduct: product});
                this.setState({isEditProductModalOpen: true});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnEditProduct(product) {
        this.setState({ isEditProductModalOpen: false });

        ProductService
            .updateProduct(product)
            .then(() => {                
                ProductService
                    .listProducts()
                    .then(products => {
                        products.forEach(n => n._id === product._id ? n.isNew = 'true' : n.isNew = undefined);                
                        this.setState({products});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>                                
                <Modal isOpen={this.state.isAddProductModalOpen} onRequestClose={this.handleOnCloseAddProductModal}>
                    <AddProductForm onSaveProduct={this.handleOnAddProduct} onCloseModal={this.handleOnCloseAddProductModal} />
                </Modal>
                <Modal isOpen={this.state.isEditProductModalOpen} onRequestClose={this.handleOnCloseEditProductModal}>
                    <EditProductForm onSaveProduct={this.handleOnEditProduct} onCloseModal={this.handleOnCloseEditProductModal} product={this.state.selectedProduct} />
                </Modal>
                <div className="mb-3">
                    <ControlPanel openAddProductModal={this.handleOpenAddProductModal} onFindProducts={this.handleOnFindProducts} />
                </div>
                <ProductTable products={this.state.products} onDeleteProduct={this.handleOnDeleteProduct} onOpenEditProductModal={this.handleOpenEditProductModal} />
            </div>
        );
    }
}

export default ProductManager;