import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  CardBody,
  Card,
  Badge,
  Button,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import Rating from '../../component/Rating/Rating';
import LoadingBox from '../../component/LoadingBox/LoadingBox';
import MessageBox from '../../MessageBox/MessageBox';
import { Store } from '../../Store/Store.js';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
const ProductScreen = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [{ product, loading, error }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: false,
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST', loading: true });
      try {
        const result = await axios.get(`/api/products/slug/${slug}`);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data,
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAILED',

          payload: error.message,
        });
      }
    };
    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCart = async () => {
    const exitItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = exitItem ? exitItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Product is out of Stock');
    }
    ctxDispatch({ type: 'ADD', payload: { ...product, quantity } });
    navigate('/cart');
  };
  return (
    <Container className=" ">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <Row>
          <Col md={6}>
            <img src={product.image} className="img-fluid" alt={product.name} />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <Helmet>
                  <title>Product Screen</title>
                </Helmet>
                <h1 className="text-capitalize  ">{product.name}</h1>
              </ListGroupItem>
              <ListGroupItem>
                <Rating rating={product.rating} reviews={product.numReviews} />
              </ListGroupItem>
              <ListGroupItem>
                <p>${product.price}</p>
              </ListGroupItem>
              <ListGroupItem>
                <p className="text-capitalize">{product.description}</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <CardBody>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>Price:</Col>
                      <Col> ${product.price}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Out of Stock</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  {product.countInStock > 0 && (
                    <ListGroupItem>
                      <Button
                        bg="success"
                        onClick={addToCart}
                        className="w-100"
                      >
                        Add To Cart
                      </Button>
                    </ListGroupItem>
                  )}
                </ListGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;
