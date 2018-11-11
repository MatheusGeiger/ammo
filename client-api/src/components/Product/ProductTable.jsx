import React from 'react';
import PropTypes from 'prop-types';

const ProductTable = (props) => {
    const products = props.products;
    
    const productRow = products.map(product => {

        let classes = `small ${!product.isNew ? 'table-success' : ''}`;
        
        return (
            <tr key={product._id.toString()} className={classes}>
                <td className="align-middle" style={{width: '80px'}}>
                    <div className="d-flex flex-row">
                        <a data-toggle="tooltip" data-placement="top" title="Edit Product" className="p-2" onClick={() => props.onOpenEditProductModal(product._id)}>
                            <i className="fa fa-pencil fa-lg text-primary"></i>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Delete Product" className="p-2" onClick={() => props.onDeleteProduct(product._id)}>
                            <i className="fa fa-trash fa-lg text-danger"></i>
                        </a>
                    </div>                
                </td>
                <td className="align-middle">{product.title}</td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
                        R$ {product.price}
                    </span>                
                </td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
                        {product.percentageDiscount}%
                    </span>                
                </td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
                        {product.category}
                    </span>                
                </td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
                        {JSON.stringify(product.photos)}
                    </span>                
                </td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th className="align-middle text-center">Title</th>
                        <th className="align-middle text-center">Price</th>
                        <th className="align-middle text-center">Percentage Discount</th>
                        <th className="align-middle text-center">Category</th>
                        <th className="align-middle text-center">Photos</th>
                    </tr>
                </thead>
                <tbody>
                    {productRow}
                </tbody>
            </table>
        </div>
    );
};

ProductTable.propTypes = {
    products: PropTypes.array,
    onDeleteProduct: PropTypes.func,
    onOpenEditProductModal: PropTypes.func
};

export default ProductTable;