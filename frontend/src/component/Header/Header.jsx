import React, { useContext } from 'react';
import { Container, Nav, Navbar, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../../Store/Store.js';
import { ToastContainer } from 'react-toastify';
import { NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Header = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOut = () => {
    ctxDispatch({ type: 'SIGN_OUT' });
    localStorage.removeItem('userInfo');
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Link className="text-decoration-none" to="/">
            Amazona
          </Link>
          <Nav className="ms-auto ">
            <Link className="text-decoration-none" to="/cart">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-dropdown-item">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/order">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item>
                  <Link to="#signout" onClick={signOut}>
                    Sign Out
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
