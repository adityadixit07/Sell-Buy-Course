import {
  Text,
  Box,
  Container,
  Heading,
  VStack,
  Button,
} from '@chakra-ui/react';
import React from 'react';

const Subscribe = () => {
  return (
    <Container height={'90vh'} p={'16'}>
      <Heading
        children="We are happy to see you join us"
        my={'8'}
        textAlign={'center'}
      />
      <VStack
        boxShadow={'lg'}
        alignItems={'stretch'}
        spacing={'0'}
        borderRadius={'lg'}
      >
        <Box bg={'yellow.400'} p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text children="Pro Pack-299.00" color={'black'} />
        </Box>
        <Box p={'4'}>
          <VStack textAlign={'center'} px={'8'} mt={'4'} spacing={'8'}>
            <Text children="Join pro-pack & get access to premium content" />
            <Heading size={'md'} children="299.00/month only" />
          </VStack>

          <Button my={'8'} width={'full'} colorScheme="yellow">
            Buy Now
          </Button>
        </Box>
        <Box bg={'blackAlpha.600'} p="4" borderRadius={'0 0 8px 8px'}>
          <Heading
            color={'white'}
            textTransform={'uppercase'}
            size={'sm'}
            children="100% refunt at concellation"
          />
          <Text
            fontSize={'xs'}
            fontWeight={'thin'}
            children="Note:Terms and conditions apply*"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
