import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const UpdateProfile = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
  return (
    <Container py={'16'} minH={'90vh'}>
      <form>
        <Heading
          children="Update Profile"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          <Input
            required
            type="text"
            id="name"
            value={name}
            placeholder={'Name'}
            focusBorderColor="yellow.500"
            onChange={e => setName(e.target.value)}
          />{' '}
          <Input
            required
            type="email"
            id="email"
            value={email}
            placeholder={'Email'}
            focusBorderColor="yellow.500"
            onChange={e => setEmail(e.target.value)}
          />
          <Button w={'full'} colorScheme="yellow" type="submit">
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
