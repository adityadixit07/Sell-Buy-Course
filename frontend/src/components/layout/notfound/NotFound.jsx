import { Button, Container, Heading, VStack } from '@chakra-ui/react';
import React from 'react';
import { RiArrowRightLine, RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container h={'90vh'} p="16">
      <VStack justifyContent={'center'} h={'full'} spacing={'4'}>
        <RiErrorWarningFill style={{ fontSize: '5rem',color:"GrayText"}} />
        <Heading my="8" textAlign={'center'}>
          Page Not Found! 🙃
        </Heading>
        <Link to="/">
          <Button variant={'ghost'} textDecorationLine={'underline'}  fontSize={'2xl'}>Go to home <RiArrowRightLine/></Button>
        </Link>
      </VStack>
    </Container>
  );
};

export default NotFound;
