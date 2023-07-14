import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  return (
    <Container paddingY={'16'} h={'90vh'}>
      <form>
        <Heading
          children="Forget Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
          fontFamily={'revert-layer'}
        />
        <VStack spacing={'6'} h={'full'} justifyContent={'center'}>
          <Input
            required
            value={email}
            type={'email'}
            placeholder="enter email"
            focusBorderColor="yellow.500"
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" w={'full'}  colorScheme='yellow' fontFamily={'monospace'}>
            Send reset link <BiLinkExternal />
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
