"use client";

import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => {
  return (
    <Card className="group overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:shadow-xl">
      {/* Product Image */}
      <Link
        href={`/layout/products/${product.id}`}
        className="relative block h-[250px] w-full overflow-hidden bg-muted"
      >
        <img
          src={product.image}
          alt={product.title}
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <CardContent className="space-y-3 p-4">
        {/* Category */}
        <span className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground capitalize">
          {product.category}
        </span>

        {/* Title */}
        <h2 className="line-clamp-2 text-lg font-semibold text-foreground">
          {product.title}
        </h2>

        {/* Description */}
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <span>⭐</span>

          <span className="font-medium text-foreground">
            {product.rating.rate}
          </span>

          <span className="text-muted-foreground">
            ({product.rating.count} reviews)
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        {/* Price */}
        <h3 className="text-2xl font-bold text-foreground">${product.price}</h3>

        {/* Button */}
        <Button className="rounded-xl">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
