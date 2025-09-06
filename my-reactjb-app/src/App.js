import Home from "./pages/Home";
import Category from "./pages/Category";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Forecast from "./pages/Forecast";
import { Routes, Route, Link } from "react-router-dom";
import NavComponent from "./components/NavComponent";

function App() {

  return (
    <div className="App">
      <NavComponent />
      <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/category/:slug" element={<Category />}/>
            <Route path="/product/:id" element={<Product />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/forecast" element={<Forecast />}/>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
