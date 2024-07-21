import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Input,message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Space } from 'antd';
import axios from "axios";
import config from "../config";

function Login() {
    const navigate=useNavigate();
    const [userName,setUserName]= useState("");
    const [password,setPassword]= useState("");

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const handleLogin=()=>{
        if(!validateEmail(userName)){
            message.error("Please Enter a Valid Email", 3);
            return;
    
        }

        if(!userName || !password) {
            message.error("Please Fill All Fields", 3);
            return;
        }

        axios.post(config.backendUrl + "/auth/login", {email:userName, password})
        .then((response) => {
            if(response.data.status === "success") {
                window.localStorage.setItem("expense-tracker-token", JSON.stringify(response.data.data));
                navigate("/dashboard");
            }
            else {
                message.warning(response.data.message, 3);
            }
        })

    }
    
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
                placeholder="Enter Username" 
                value={userName} 
                onChange={(e)=>{setUserName(e.currentTarget.value)}} 
                autoCorrect="off" 
                spellCheck="false" 
                autoComplete="off"
            />

            <Input.Password
                autoCorrect="off" 
                spellCheck="false" 
                autoComplete="off"
                value={password}
                onChange={(e)=>{setPassword(e.currentTarget.value)}}
                placeholder="input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />

            <label>
                Dont have an account? 
                <a href="/signup">Signup</a>
            </label>

            <Button type="primary" onClick={handleLogin}>
                Login
            </Button>

        </Flex>
        </div>
    </div>
    );
}

export default Login;
