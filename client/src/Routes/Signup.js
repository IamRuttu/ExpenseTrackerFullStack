import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Space } from "antd";
import axios from "axios";
import config from "../config";

function Signup() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSignup = async () => {
    if(!validateEmail(userName)){
        message.error("Please Enter a Valid Email", 3);
        return;

    }

    if (password !== cPassword) {
      message.error("The passwords do not match", 3);
      return;
    }

    if(!userName || !password || !firstName || !lastName){
        message.error("Please fill all the required fields", 3);
        return;

    }
    const data = {
      email:userName,firstName,lastName,password

    };

    axios
      .post(config.backendUrl + "/auth/signup", data)
      .then((response) => {
        if(response.data.status==="success"){
            message.success("Signup Successful", 3);
            navigate("/login");

        }
        else{
            message.warning(response.data.message, 3);

        }

      })
      .catch((error) => {
        message.error("Signup Failed", 3);
        console.error(error);
      });
  };

  useEffect(() => {
    if (window.localStorage.getItem("expense-tracker-token")) {
      navigate("/dashboard",{replace:true});

    }

  }, []);

  return (
    <div>
      <div>
        <Flex vertical gap={12}>
          <Input
            placeholder="Enter Email"
            value={userName}
            onChange={(e) => {
              setUserName(e.currentTarget.value);
            }}
            autoCorrect="off"
            spellCheck="false"
            autoComplete="off"
          />

          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.currentTarget.value);
            }}
            autoCorrect="off"
            spellCheck="false"
            autoComplete="off"
          />

          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.currentTarget.value);
            }}
            autoCorrect="off"
            spellCheck="false"
            autoComplete="off"
          />

          <Input.Password
            autoCorrect="off"
            spellCheck="false"
            autoComplete="off"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            placeholder="input password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />

          <Input.Password
            autoCorrect="off"
            spellCheck="false"
            autoComplete="off"
            value={cPassword}
            onChange={(e) => {
              setCPassword(e.currentTarget.value);
            }}
            placeholder="confirm password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />

          <label>
            Already have an account?
            <a href="/login">Login</a>
          </label>

          <Button type="primary" onClick={handleSignup}>
            Signup
          </Button>
        </Flex>
      </div>
    </div>
  );
}

export default Signup;
