import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {login} from '../../redux/actions/userAction';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch=useDispatch();
  const submitHandler=(e)=>{
    e.preventDefault();
    // console.log(email,password);
    dispatch(login(email,password))
  }
  return (
    <Container h={'95vh'}>
      <VStack justifyContent={'center'} spacing={'10'} h={'full'}>
        <Heading children="Welcome to Course Bundler" />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box marginY={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              type="email"
              id="email"
              value={email}
              placeholder={'abc@gmail.com'}
              focusBorderColor="yellow.500"
              onChange={e => setEmail(e.target.value)}
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="email" children="Password" />
            <Input
              required
              type="password"
              id="password"
              value={password}
              placeholder={'*******'}
              focusBorderColor="yellow.500"
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          <Box>
            <Link to="/forgetpassword">
              <Button fontSize={'sm'} variant={'link'}>
                Forget Password
              </Button>
            </Link>
          </Box>
          <Button my="4" colorScheme="yellow" type="submit">
            Login
          </Button>
          <Box my={'4'}>
            {' '}
            New User?{' '}
            <Link to="/register">
              <Button variant="link" colorScheme="yellow">
                Sign up
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
