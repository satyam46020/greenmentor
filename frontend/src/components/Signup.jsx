import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Link} from "react-router-dom";
import { signup } from "../Redux/Register/action";
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isAuth = useSelector((store) => store.signupReducer.isAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ name, avatar, email, password }));
  };

  if (isAuth) navigate('/');

  return (
    <Flex align="center" justify="center" h="100vh">
      <Center>
        <Box p={10} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Heading as="h2" size="md" mb={4}>
            REGISTER
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
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
            <Button as={Link} to="/" colorScheme="blue" ml={30}>
              Login
            </Button>
          </form>
        </Box>
      </Center>
    </Flex>
  );
};

export default Register;
