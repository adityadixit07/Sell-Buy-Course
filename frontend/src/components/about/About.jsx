import {
  Avatar,
  Stack,
  Text,
  VStack,
  Container,
  Heading,
  Button,
  Box,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import intro from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import TermsAndConditions from '../../assets/docs/TermsAndConditions'

const Founder = () => (
  <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
    <VStack>
      <Avatar
        src="https://media.licdn.com/dms/image/D4E03AQErTp9zyXmxAA/profile-displayphoto-shrink_800_800/0/1676306436455?e=1693440000&v=beta&t=hlbrQJSTEsCLYhCJdkkrYDwDVtk4gtX_1RN0D5JT4SM"
        boxSize={['40', '48']}
      />
      <Text children="Developer" opacity={0.8} />
    </VStack>
    <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
      <Heading children="Aditya Dixit" size={['md', 'xl']} />
      <Text children="Hi, I am a passioante full-stack developer and dsa-mentor.Our mission to create and give a valuable content to the tech world" />
    </VStack>
  </Stack>
);

const VideoPlayer = () => (
  <Box>
    <video
      src={intro}
      autoPlay="true"
      controls
      controlsList="nodownload nofullscreen noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
    ></video>
  </Box>
);

// terms and conditons  component
const TermConditions = ({tc}) => (
  <Box>
    <Heading
      size={'md'}
      children="Terms and Conditions"
      textAlign={['center', 'left']}
      my={'4'}
    />
    <Box h={'sm'} p={'4'} overflowY={'scroll'}>
      <Text textAlign={['center','left']} letterSpacing={'widest'} fontFamily={'mono'}>
        {tc}
      </Text>
      <Heading my={'4'} size={'xs'} children='Refund applicable only within 7 Days' />
    </Box>
  </Box>
);

const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />
      <Founder />
      <Stack m="8" direction={['column', 'row']} alignItems={'center'}>
        <Text fontFamily={'cursive'} textAlign={['center', 'left']}>
          We are a video streaming platform with some premius courses avaible
          only for premium user
        </Text>
        <Link to="/subscribe">
          <Button variant={'outline'} colorScheme="yellow">
            Check out our Plan
          </Button>
        </Link>
      </Stack>
      <VideoPlayer />

      {/* terms and conditions */}
      <TermConditions tc={TermsAndConditions} />

      <HStack marginY={'4'} p="4">
        <RiSecurePaymentFill />
        <Heading
          children="payment is secured by RazorPay"
          size={'xs'}
          fontFamily={'sans-serif'}
          textTransform={'uppercase'}
        />
      </HStack>
    </Container>
  );
};

export default About;
