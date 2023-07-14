import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
//   const params = useParams();
  //   console.log(params.token);

  return (
    <Container paddingY={'16'} h={'90vh'}>
      <form>
        <Heading
          children="Reset Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
          fontFamily={'revert-layer'}
        />
        <VStack spacing={'6'} h={'full'} justifyContent={'center'}>
          <Input
            required
            value={password}
            type={'password'}
            placeholder="enter Pasword"
            focusBorderColor="yellow.500"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            w={'full'}
            colorScheme="yellow"
            fontFamily={'monospace'}
          >
            Reset password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
