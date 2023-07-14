import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  return (
    <Container h="92vh">
      <VStack h="full" justifyContent="center" spacing={'16'}>
        <Heading children="Request Course" />
        <form style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" fontWeight={'semibold'} />
            <Input
              required
              value={name}
              type="text"
              placeholder="enter name"
              onChange={e => setName(e.target.value)}
            />
          </Box>
          <Box my={'4'}>
            <FormLabel
              htmlFor="email"
              children="Email"
              fontWeight={'semibold'}
            />
            <Input
              required
              value={email}
              type="email"
              focusBorderColor="yellow.500"
              placeholder="enter email"
              onChange={e => setEmail(e.target.value)}
            />
          </Box>
          <Box my={'4'}>
            <FormLabel
              htmlFor="message"
              children="Course"
              fontWeight={'semibold'}
            />
            <Textarea
              noOfLines={'3'}
              resize={'none'}
              required
              value={course}
              type="text"
              focusBorderColor="yellow.500"
              placeholder="Explain about your desired course....🤔"
              onChange={e => setCourse(e.target.value)}
            />
          </Box>
          <Button type="submit" my={'4'} colorScheme={'yellow'}>
            Send Mail
          </Button>
          <Box my={'4'}>
            See Available Courses?{' '}
            <Link to="/courses">
              <Button colorScheme="yellow" variant={'link'}>
                Click
              </Button>{' '}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
