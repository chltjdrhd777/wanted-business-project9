import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "routes/Home/Home";
import Product from "routes/Product/Product";
import ProductImg from "routes/Product/ProductImg";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product/:searchType" element={<Product />} />
        <Route path="product/keyword/img" element={<ProductImg />} />
      </Routes>
    </Router>
  );
}

export default App;
