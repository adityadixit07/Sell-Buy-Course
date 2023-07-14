import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const fileUploadCSS = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  height: '100%',
  color: '#ECC948',
  backgroundColor: 'white',
  border: 'none',
};
const fileUploadStyle = {
  '&::file-selector-button': fileUploadCSS,
};
const Login = () => {
  //   function to upload image on avatar
  const uploadImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const formSubmitHandler = (e, image) => {
    e.preventDefault();
  };
  return (
    <Container h={'95vh'}>
      <VStack justifyContent={'center'} spacing={'4'} h={'full'}>
        <Heading children="Registration" textTransform={'uppercase'} />
        <form
          style={{ width: '100%' }}
          onSubmit={e => formSubmitHandler(e, image)}
        >
          <Box marginY={'4'} display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePrev} size={'2xl'} />
          </Box>
          <Box marginY={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              type="text"
              id="name"
              value={name}
              placeholder={'your name'}
              focusBorderColor="yellow.500"
              onChange={e => setName(e.target.value)}
            />
          </Box>
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
              value={password}
              id="password"
              placeholder={'*******'}
              focusBorderColor="yellow.500"
              onChange={e => setPassword(e.target.value)}
            />
          </Box>{' '}
          <Box marginY={'4'}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              required
              type="file"
              id="chooseAvatar"
              placeholder={'choose Avatar'}
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={uploadImageHandler}
            />
          </Box>
          <Button my="4" colorScheme="yellow" type="submit">
            Login
          </Button>
          <Box my={'4'}>
            {' '}
            Already Signed Up?{' '}
            <Link to="/login">
              <Button variant="link" colorScheme="yellow">
                Login{' '}
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
