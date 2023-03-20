import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import logo from "../Assets/Images/headerLogo.svg";
import {
  Card,
  Input,
  Dropdown,
  Drawer,
  Rate,
  Row,
  Col,
  FloatButton,
  Popconfirm,
  Button,
} from "antd";
import { FaEdit } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
const { Meta } = Card;

function HomePage() {
  const [productsData, setProductsData] = useState([]);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const profilePic = localStorage.getItem("image");
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create");
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    let res = await axios.get("http://localhost:3000/products");
    setProductsData(res.data);
  }

  async function GetDataById(id) {
    await axios.get(`http://localhost:3000/products/${id}`);
  }

  async function productDelete(id) {
    await axios.delete(`http://localhost:3000/products/${id}`);
    getAllProducts();
  }

  async function GetUserInfo(id) {
    const userId = localStorage.getItem("id", id);
    let res = await axios.get(`https://dummyjson.com/user/${userId}`);
    setUserData(res.data);
  }

  const filteringProducts = productsData.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const items = [
    {
      label: "User profile",
      key: "1",
      onClick: () => {
        showDrawer();
        GetUserInfo();
      },
    },
    {
      label: "Logout",
      key: "2",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        localStorage.clear();
        navigate("/login");
      },
    },
  ];

  const menuProps = {
    items,
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  return (
    <div id="homePage">
      <div className="page-container">
        <Row className="sticky-header-container">
          <Col span={24}>
            <img className="header-logo" src={logo} alt="belton-logo" />
            <Dropdown menu={menuProps}>
              <img
                className="user-profile"
                src={profilePic}
                alt="user-profile"
              />
            </Dropdown>
          </Col>
        </Row>
        <div className="search-container">
          <Input
            prefix={<BiSearchAlt2 />}
            placeholder="Search products"
            className="search-field"
            onChange={({ target: { value } }) => setSearch(value)}
          />
          <Button className="create-btn" onClick={handleCreate}>
            Create
          </Button>
        </div>
        <div className="cards">
          <Row gutter={[48, 48]}>
            {filteringProducts.map((product) => (
              <Col
                xs={24}
                sm={12}
                m={10}
                lg={8}
                xl={6}
                xxl={4}
                key={product.id}
              >
                <Card
                 type='inner'
                  hoverable
                  style={{ border: "1px solid" }}
                  cover={
                    <img
                      className="product-img"
                      src={product.image}
                      alt="products"
                      onClick={() => {
                        navigate(`/preview/${product.id}`);
                      }}
                    />
                  }
                >
                  <Meta
                    className="product-title"
                    title={product.title}
                    onClick={() => {
                      GetDataById(product.id);
                      navigate(`/preview/${product.id}`);
                    }}
                  />
                  <span style={{ opacity: 0.6 }}>Free delivery</span>
                  <br />
                  <span style={{ fontFamily: "sans-serif" }}>
                    {product.category}
                  </span>
                  <span>
                    Upto to<span style={{ fontWeight: "bold" }}> ₹2.20 </span>
                    off for exchange
                  </span>
                  <br />
                  <span style={{ color: "green", fontWeight: "700" }}>
                    Price: ₹{product.price}
                  </span>
                  <br />

                  <Rate
                    style={{ color: "#F1C40F", fontSize: "12px" }}
                    disabled
                    defaultValue={product.rating?.rate}
                  />
                  <span style={{ opacity: 0.8 }}>
                    ({product.rating?.count})
                  </span>
                  <hr></hr>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      navigate(`/${product.id}`);
                    }}
                  >
                    <FaEdit
                      style={{
                        color: "#0080A5",
                        marginRight: "3px",
                      }}
                    />
                    Edit
                  </button>
                  <Popconfirm
                    title="Delete"
                    description="Are you sure you want to delete?"
                    onConfirm={() => {
                      productDelete(product.id);
                    }}
                  >
                    <button className="delete-btn">
                      <RiDeleteBin6Line
                        style={{
                          color: "#F46464",
                          marginRight: "3px",
                        }}
                      />
                      Delete
                    </button>
                  </Popconfirm>
                </Card>
              </Col>
            ))}
            <FloatButton.BackTop />
          </Row>
        </div>
        <Drawer
          title="User Profile"
          placement="right"
          onClose={onClose}
          open={openDrawer}
        >
          <div className="drawer">
            <div className="profile-img">
              <img
                style={{
                  width: "100px",
                  borderRadius: "50%",
                  backgroundColor: "lightgrey",
                }}
                src={userData.image}
                alt="profile pic"
              />
            </div>
            <label>FirstName</label>
            <p className="info">{userData.firstName}</p>
            <label>LastName</label>
            <p className="info">{userData.lastName}</p>
            <label>Date Of Birth</label>
            <p className="info">{userData.birthDate}</p>
            <label>Age</label>
            <p className="info">{userData.age}</p>
            <label>Maiden Name</label>
            <p className="info">{userData.maidenName}</p>
            <label>Phone Number</label>
            <p className="info">{userData.phone}</p>
            <label>Address</label>
            <p className="info">
              {userData?.address?.address},{userData?.address?.city}
            </p>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default HomePage;
