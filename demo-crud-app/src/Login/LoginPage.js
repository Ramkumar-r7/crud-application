import React, { useState } from "react";
import "./LoginPage.scss";
import axios from "axios";
import { Button, Input, Row, Col, Space, Form } from "antd";
import { BsPerson } from "react-icons/bs";
import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillTwitterCircle, AiFillGoogleCircle } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();

  async function userLogin() {
    await axios
      .post("https://dummyjson.com/auth/login", {
        username: userName,
        password: passWord,
      })
      .then((res) => {
        localStorage.setItem("id", res.data.id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("image", res.data.image);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    const storageValue = localStorage.getItem("token");
    if (storageValue) {
      navigate("/");
    }
  }

  return (
    <div id="loginPage">
      <div className="login-container">
        <Form>
          <Row>
            <Col lg={24}>
              <div className="login-heading">
                <p>Login</p>
              </div>
              <span>Username</span>
              <Input
                className="login-username-field"
                placeholder="Type your username"
                bordered={false}
                prefix={<BsPerson />}
                onChange={({ target: { value } }) => setUserName(value)}
              />
              <span>Password</span>
              <Input.Password
                className="login-password-field"
                placeholder="Type your password"
                bordered={false}
                prefix={<CiLock />}
                type="passWord"
                onChange={({ target: { value } }) => setPassWord(value)}
              />
              <span className="forgot-password">Forgot password?</span>
              <Button
                className="login-btn"
                htmlType="button"
                disabled={userName === "" || passWord === ""}
                onClick={() => {
                  userLogin();
                }}
              >
                LOGIN
              </Button>
              <ToastContainer />
              <div className="logos">
                <Space>
                  <RiFacebookCircleFill size={40} color="darkblue" />
                  <AiFillTwitterCircle color="lightblue" size={40} />
                  <AiFillGoogleCircle color="red" size={40} />
                </Space>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
