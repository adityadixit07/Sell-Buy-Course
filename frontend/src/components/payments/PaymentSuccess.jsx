import {
  Text,
  Box,
  Container,
  Heading,
  VStack,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <Container h={'90vh'} p={'16'}>
      <Heading my={'8'} textAlign={'center'}>
        Pro Pack
      </Heading>
      <VStack
        boxShadow={'lg'}
        alignItems={'center'}
        spacing={'8'}
        paddingBottom="16"
      >
        <Box
          w="full"
          p="4"
          bg={'yellow.400'}
          css={{ borderRadius: '8px 8px 0 0' }}
        >
          <Text color={'black'} fontWeight={'extrabold'}>
            Payment Success
          </Text>
        </Box>
        <Box p={'4'}>
          <VStack textAlign="center" px="8" mt={'4'} spacing={'8'}>
            <Text>
              Congratulations🎉, You are a pro member. You have a access of
              premium content.
            </Text>
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
            <Link to="/profile">
              <Button variant={'ghost'} textDecoration={'underline'}>Go to profile</Button>
            </Link>
            <Heading size={'xs'}>Refrence-Id:4535234</Heading>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
