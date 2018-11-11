import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = (props) => {
  const { title, price, percentageDiscount, category, photos } = props.product || {};

  const photosRow = photos.map(photo => {
    return (<img width="80" height="80" id={photo.id} src={photo.url} />)
  });

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 product-card">
        <div className="images-product">
          <div className="container-product-images">
            {photosRow}
          </div>
        </div>
        <div className="content-card-description">
          <div className="product-name">{title}</div>
          <div className="product-category">{category}</div>
        </div>
        <div className="content-card-price">
          {
            percentageDiscount > 1 ? <div className="product-percentageDiscount">R$ {price} </div> : <div className="product-price">R$ {price} </div>
          }
          {
            percentageDiscount > 1 ? <div className="product-price"> &nbsp; por R$ {Math.round(price - price * percentageDiscount / 100, 2)}</div> : ''
          }
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    percentageDiscount: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired
  }).isRequired
};

export default ProductCard;
