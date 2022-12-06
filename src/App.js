import React, { useState } from "react";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {

    const [searchedProducts, setSearchedProducts] = useState([])
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()

    return (
      <div className="App">
        <Header
          searchedProducts={searchedProducts}
          setSearchedProducts={setSearchedProducts}
        />
        <Main
          searchedProducts={searchedProducts}
          setSearchedProducts={setSearchedProducts}
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
        />
      </div>
    );
}

export default App;
