import React, { useContext, useReducer, useState } from 'react';
import { Store } from '../../Store/Store.js';
import MessageBox from '../../MessageBox/MessageBox.jsx';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  Container,
  ListGroup,
  ListGroupItem,
  Col,
  Row,
} from 'react-bootstrap';

const CartScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'ADD',
      payload: { ...item, quantity },
    });
  };
  function removeHandler(item) {
    ctxDispatch({ type: 'REMOVE', payload: item });
  }
  const checkoutHandle = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div>
      <Container>
        <Row className="align-items-center">
          <Col md={8}>
            {cartItems.length === 0 ? (
              <MessageBox>
                Cart is Empty <Link to={'/'}>Go Shopping</Link>
              </MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => {
                  return (
                    <ListGroupItem key={item._id}>
                      <Row className="align-items-center">
                        <Col md={4}>
                          <img
                            src={item.image}
                            className="img-fluid"
                            style={{ height: '80px' }}
                            alt=""
                          />
                          <Link to={`/products/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          <Button
                            onClick={() =>
                              updateCartHandler(item, item.quantity - 1)
                            }
                            disabled={item.quantity === 1}
                          >
                            <span>
                              <i className="fas fa-minus-circle"></i>
                            </span>
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            onClick={() =>
                              updateCartHandler(item, item.quantity + 1)
                            }
                            disabled={item.quantity === item.countInStock}
                          >
                            <span>
                              <i className="fas fa-plus-circle"></i>
                            </span>
                          </Button>
                        </Col>
                        <Col md={3}>
                          <p>${item.price}</p>
                        </Col>
                        <Col md={2}>
                          <Button onClick={() => removeHandler(item)}>
                            <span>
                              <i className="fas fa-trash"></i>
                            </span>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroupItem>
                    Subtotal:{cartItems.reduce((a, c) => a + c.quantity, 0)}
                    items: $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </ListGroupItem>
                  <ListGroupItem>
                    <div className="text-center">
                      <Button
                        onClick={checkoutHandle}
                        disabled={cartItems.length === 0}
                        className="w-100"
                        bg="warning"
                      >
                        Procced To Checkout
                      </Button>
                    </div>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartScreen;
