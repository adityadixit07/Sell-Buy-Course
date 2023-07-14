import React from 'react';
import {
  Box,
  Button,
  HStack,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import './home.css';
import logo from '../../assets/images/logo.png';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import intro from '../../assets/videos/intro.mp4';
const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          right="100%"
          justifyContent={['center', 'space-between']}
          alignItems={'center'}
          spacing={['16', '56']}
        >
          <VStack width={'full'} alignItems={['center', 'flex-end']}>
            <Heading children="LEARN FROM THE EXPERTS" size="lg" />
            <Text
              textAlign={['center', 'left']}
              children="Find the quality content at affordable price"
              fontFamily={'cursive'}
            />
            <Link to="/courses">
              <Button size={'lg'} colorScheme="orange">
                Explore Now
              </Button>
            </Link>
          </VStack>
          <Image
            className="vector-graphics"
            boxSize="md"
            borderRadius={'full'}
            objectFit={'contain'}
            src={logo}
          />
        </Stack>
      </div>
      <Box
        className="brand-content"
        padding={'8'}
        backgroundColor={'blackAlpha.800'}
      >
        <Heading
          textAlign={'center'}
          fontFamily={'body'}
          color={'gray.400'}
          children="OUR BRANDS"
        />
        <HStack className="brandsBanner" justifyContent={'space-evenly'}>
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container-2">
        <video
          src={intro}
          autoPlay={true}
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
        ></video>
      </div>
    </div>
  );
};

export default Home;
