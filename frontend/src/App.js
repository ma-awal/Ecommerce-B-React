import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import ProductScreen from './screens/ProductScreen/ProductScreen';
import CartScreen from './screens/CartScreen/CartScreen';
import SigninScreen from './screens/SigninScreen/SigninScreen';
import ShippingScreen from './screens/ShippingScreen/ShippingScreen';
import SignupScreen from './screens/SignupScreen/SignupScreen';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
