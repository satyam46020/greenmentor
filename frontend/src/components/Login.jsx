import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { login } from "../Redux/Login/action";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Flex,
  Center,
} from "@chakra-ui/react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuth = useSelector((store) => store.loginReducer.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate('/task');
    }
  }, [isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all the fields.");
    }

    dispatch(login({ email, password }));
  };

  return (
    
    <Flex align="center" justify="center" h="100vh">
      <Center>
        <Box p={10} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Heading as="h2" size="md" mb={4}>
            LOGIN
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
            <Button as={Link} to="/register" colorScheme="blue" ml={30}>
              Register
            </Button>
          </form>
        </Box>
      </Center>
    </Flex>
  );
};

export default Login;
