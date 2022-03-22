import React from "react";
import { useLocation, useParams } from "react-router-dom";

function ProductImg() {
  const params = useParams();
  const location = useLocation();
  console.log(params, location);
  return <div>ProductImg</div>;
}

export default ProductImg;
