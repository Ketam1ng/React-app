import Home from "./pages/Home";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import { Routes, Route, Link } from "react-router-dom";

function App() {
 
  return (
    <div className="App">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
      <main>
        <div className="container">
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/category" Component={Category}/>
            <Route path="/cart" Component={Cart}/>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
