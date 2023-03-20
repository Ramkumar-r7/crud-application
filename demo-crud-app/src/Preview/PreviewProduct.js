import React, { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../Assets/Images/headerLogo.svg";
import "./PreviewProduct.scss";

function PreviewProduct() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    GetPreviewDataById(id);
  }, [id]);

  async function GetPreviewDataById(id) {
    let res = await axios.get(`http://localhost:3000/products/${id}`);
    setProducts(res.data);
  }

  const handleback = () => {
    navigate("/");
  };

  return (
    <div id="Previewpage">
      <div className="sticky-header-container">
        <img
          onClick={handleback}
          className="header-logo"
          style={{ width: "6%" }}
          src={logo}
          alt="belton-logo"
        />
      </div>
      <button className="back-btn" onClick={handleback}>
        <IoIosArrowBack /> Back
      </button>
      <div className="product-details">
        <div className="product-img">
          <img style={{ width: "300px" }} src={products.image} alt="product" />
          <div className="btn-cart-buy">
            <button className="cart-btn">
              <FaShoppingCart
                style={{ color: "white", marginRight: "4px", height: "18px" }}
              />
              ADD TO CART
            </button>
            <button className="buy-btn">
              <AiFillThunderbolt
                style={{ color: "white", marginRight: "4px", height: "18px" }}
              />
              BUY NOW
            </button>
          </div>
        </div>
        <div className="product-content">
          <span className="product-label">Product</span>
          <p className="product-name">{products.title}</p>
          <span className="product-label">Price</span>
          <p className="product-price"> $ {products.price}</p>
          <span className="product-label">Category</span>
          <p className="product-category">{products.category}</p>
          <span className="product-label">Description</span>
          <p className="product-description">{products.description}</p>
          <span className="product-label">Rate</span>
          <p className="product-rate">{products?.rating?.rate} ★</p>
          <span className="product-label">Reviews count</span>
          <p className="product-count">{products?.rating?.count}</p>
        </div>
      </div>
    </div>
  );
}

export default PreviewProduct;
