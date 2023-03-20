import React, { useEffect } from "react";
import "./ProductEdit.scss";
import { useState } from "react";
import axios from "axios";
import { FaRupeeSign } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../Assets/Images/headerLogo.svg";
import { Form, Input, Button } from "antd";
function ProductEdit() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rate, setRate] = useState();
  const [count, setCount] = useState();

  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = () => {
    id ? Editproducts(id) : Postproducts();
    navigate("/");
  };
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (id) GetDataById(id);
  }, [id]);

  const Postproducts = async () => {
    await axios.post("http://localhost:3000/products/", {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rating: {
        rate: rate,
        count: count,
      },
    });
  };

  async function GetDataById(id) {
    let res = await axios.get(`http://localhost:3000/products/${id}`);
    setTitle(res.data.title);
    setPrice(res.data.price);
    setDescription(res.data.description);
    setCategory(res.data.category);
    setImage(res.data.image);
    setRate(res.data.rating.rate);
    setCount(res.data.rating.count);
  }

  async function Editproducts(id) {
    await axios.put(`http://localhost:3000/products/${id}`, {
      id,
      title,
      price,
      description,
      category,
      image,
      rating: {
        rate,
        count,
      },
    });
  }

  return (
    <div id="productEdit-page">
      <div className="sticky-header-container">
        <img
          onClick={handleBack}
          className="header-logo"
          style={{ width: "6%" }}
          src={logo}
          alt="belton-logo"
        />
      </div>
      <div className="form-wrap-container">
        <div className="create-edit-form">
          <Form name="basic" layout="vertical" requiredMark={false}>
            <h3>{id ? "Edit form" : "Create"}</h3>
            <Form.Item label="Title">
              <Input
                value={title}
                onChange={({ target: { value } }) => setTitle(value)}
                placeholder="Type your title"
              />
            </Form.Item>
            <Form.Item label="Price">
              <Input
                type="number"
                value={price}
                onChange={({ target: { value } }) => setPrice(value)}
                placeholder="Type your price"
                prefix={<FaRupeeSign />}
              />
            </Form.Item>
            <Form.Item label="Category">
              <Input
                value={category}
                onChange={({ target: { value } }) => setCategory(value)}
                placeholder="Type your category"
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input.TextArea
                value={description}
                onChange={({ target: { value } }) => setDescription(value)}
                placeholder="Type your description"
              />
            </Form.Item>
            <Form.Item label="Image">
              <Input
                type="url"
                value={image}
                onChange={({ target: { value } }) => setImage(value)}
                placeholder="Type your image url"
              />
            </Form.Item>

            <Form.Item label="Rate">
              <Input
                type="number"
                value={rate}
                onChange={({ target: { value } }) => setRate(value)}
                placeholder="Type your rating"
              />
            </Form.Item>
            <Form.Item
              label="Review Count">
              <Input
                 type="number"
                value={count}
                onChange={({ target: { value } }) => setCount(value)}
                placeholder="Type your Review Count"
              />
            </Form.Item>
            <div className="btn-back-create">
              <Button className="form-btn" onClick={handleBack}>
                Back
              </Button>
              <Button
                disabled={
                  title === "" ||
                  price === "" ||
                  category === "" ||
                  description === ""
                }
                className="form-btn"
                htmlType="button"
                onClick={handleClick}
              >
                {id ? "save changes" : "create"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
