import React, { useContext } from 'react';
import './Product.css';
import Rating from '../Rating/Rating';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../../Store/Store.js';
import axios from 'axios';

const Product = (props) => {
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { product } = props;

  const {
    cart: { cartItems },
  } = state;

  const addToCart = async (item) => {
    const exitItem = cartItems.find((x) => x._id === product._id);
    const quantity = exitItem ? exitItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Product is out of Stock');
    }
    ctxDispatch({ type: 'ADD', payload: { ...item, quantity } });
  };
  return (
    <div>
      <Card>
        <Link to={`/products/${product.slug}`}>
          <img src={product.image} className="img-fluid" alt="" />
        </Link>

        <Card.Body>
          <Card.Title>
            <Link to={`/products/${product.slug}`}>
              <p>{product.name}</p>
            </Link>
          </Card.Title>
          <Rating rating={product.rating} reviews={product.numReviews} />
          <Card.Text>
            <p>${product.price}</p>
          </Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled>
              Out of Stock
            </Button>
          ) : (
            <Button variant="warning" onClick={() => addToCart(product)}>
              Add To cart
            </Button>
          )}
        </Card.Body>
      </Card>{' '}
    </div>
  );
};

export default Product;
