import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import FourOhFour from './components/FourOhFour/FourOhFour';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/cart' element={<Cart />} />          
        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<FourOhFour />} />
      </Routes>
    </Router>
  );
}

export default App;
