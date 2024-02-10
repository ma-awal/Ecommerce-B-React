import React, { useEffect, useReducer, useState } from 'react';
import './HomeScreen.css';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Product from '../../component/Product/Product';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Row, Col, Button } from 'react-bootstrap';
import LoadingBox from '../../component/LoadingBox/LoadingBox';
import MessageBox from '../../MessageBox/MessageBox';
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAILED':
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
}
const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: result.data,
          loading: false,
        });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAILED',
          payload: error.message,
          loading: false,
        });
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <Container>
        <h3 className="text-center py-3 my-3 fw-semibold">Feature Products</h3>
        <Row>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            products.map((product) => {
              return (
                <Col key={product.slug} sm={12} md={4} lg={3} className="mb-3 ">
                  <Product product={product} />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
