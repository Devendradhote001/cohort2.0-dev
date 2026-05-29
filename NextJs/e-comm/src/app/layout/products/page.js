import ProductCard from "@/components/ProductCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const page = async () => {
  let res = await fetch("https://fakestoreapi.com/products");
  let products = await res.json();

  console.log(products);
  return (
    <ProtectedRoute>
      <div className="grid grid-cols-4 gap-5">
        {products.map((elem) => {
          return <ProductCard key={elem.id} product={elem} />;
        })}
      </div>
    </ProtectedRoute>
  );
};

export default page;
