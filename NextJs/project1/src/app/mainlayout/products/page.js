"use client";

import React, { useState } from "react";

const page = () => {
  const [products, setProducts] = useState([]);

  let data = async () => {
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    setProducts(data);
  };

  data()

  return (
    <div className="p-6">
      <h1>all products lists here</h1>

      <div>
        {products.map((elem) => (
          <h1 onClick={() => console.log("hello")}>{elem.title}</h1>
        ))}
      </div>
    </div>
  );
};

export default page;
