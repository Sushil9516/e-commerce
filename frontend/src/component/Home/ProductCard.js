import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {

  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.1 ,
    size: window.innerWidth < 600 ? "small" : "small",
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>

    {/* <Link className="productCard" to={"/"}> */}

      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan"> ({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>        
    </Link>
  );
};

export default ProductCard;








// ================================Modified code===================================
