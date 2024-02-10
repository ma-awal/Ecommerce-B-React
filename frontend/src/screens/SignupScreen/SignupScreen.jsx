import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Form, Col, Row, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Store } from '../../Store/Store.js';
import { getErr } from '../../utils.js';
const SignupScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password Not Match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'SIGN_IN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (error) {
      toast.error(getErr(error));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return (
    <Container className="  py-5 ">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Row className="justify-content-center align-items-center ">
        <Col md={5}>
          <Form className=" p-3 shadow" onSubmit={handleSubmit}>
            <h2 className="my-3 text-center">Sign Up</h2>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={(event) => setName(event.target.value)}
                type="name"
                placeholder=" "
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder=" "
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type=" password"
                placeholder="ConfirmPassword"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Form.Group>
            <div className="my-3">
              <Button type="submit">Sign IN</Button>
            </div>
            <div className="my-3">
              Already have an accoutn
              <Link to={`/signin?redirect=${redirect}`}>Signin</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupScreen;
