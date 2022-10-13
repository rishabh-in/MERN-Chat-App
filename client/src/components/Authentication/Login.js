import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { warning } from "@remix-run/router";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please provide all fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        "Content-type": "applcation.json"
      }

      const { data } = await axios.post('/api/user/login', { email, password }, config);
      if (data && data._id) {
        toast({
          title: "Logged in successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom"
        })
        navigate("/chats");
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Error occured",
        description: error.response.data.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false);
      return;
    }

  }
  return (
    <VStack spacing={"5px"} color="black">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={handleClick}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        colorScheme={"red"}
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("Guest@123");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
};

export default Login;
