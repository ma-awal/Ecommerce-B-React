import React, { useEffect } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { Store } from '../../Store/Store.js';
import { Button, Container, Form, Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { useContext } from 'react';
import CheckoutSteps from '../../component/CheckoutSteps/CheckoutSteps.jsx';

const ShippingScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  // Initialize state with default values or values from shippingAddress
  const [fullName, setFullName] = useState(shippingAddress?.fullName || '');
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress?.country || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    navigate('/payment');
  };

  return (
    <Container>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Row className="justify-content-center">
        <Col md={6}>
          <div>
            Shipping
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="mb-3">
                <Button variant="primary" type="submit">
                  Continue
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
