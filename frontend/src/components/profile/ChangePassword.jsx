import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
        <Heading
          children="Change Password"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            required
            type="password"
            id="oldpassword"
            value={oldPassword}
            placeholder={'Old password'}
            focusBorderColor="yellow.500"
            onChange={e => setOldPassword(e.target.value)}
          />{' '}
          <Input
            required
            type="password"
            id="newpassword"
            value={newpassword}
            placeholder={'New password'}
            focusBorderColor="yellow.500"
            onChange={e => setNewPassword(e.target.value)}
          />
          <Button w={'full'} colorScheme='yellow' type='submit'>Change</Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
