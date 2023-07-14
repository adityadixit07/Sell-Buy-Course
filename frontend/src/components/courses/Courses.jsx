import {
  Button,
  Container,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Course = ({
  views,
  title,
  imagesrc,
  id,
  addToPlayListHandler,
  creator,
  description,
  lecturecount,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imagesrc} boxSize={'60'} objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW={'200px'}
        fontFamily={'sans-serif'}
        noOfLines={'3'}
        children={title}
        fontSize={'sm'}
      />
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          children={'Creator'}
          fontWeight={'bold'}
          textTransform={'uppercase'}
        />
        <Text
          children={creator}
          fontFamily={'body'}
          textTransform={'uppercase'}
        />
      </HStack>
      <Heading
        textAlign={'center'}
        size={'xs'}
        children={`Lecture: ${lecturecount}`}
        textTransform={'uppercase'}
      />
      <Heading
        size={'xs'}
        children={`views: ${views}`}
        textTransform={'uppercase'}
      />

      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/courses/${id}`}>
          <Button variant={'solid'} colorScheme="yellow">
            Watch Now
          </Button>
        </Link>
        <Button
          onClick={() => addToPlayListHandler(id)}
          variant={'outline'}
          colorScheme="yellow"
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const categories = [
    'Web Developement',
    'Artificial Intelligence (AI)',
    'Game Developement',
    'App Developement',
    'Machine Learning',
    'Deep Learning',
    'Internet of Things(IOT)',
    'Java Developement',
    'DevOps',
    'Cloud Computing',
  ];
  const [category,setCategory] = useState('');
  const addtoplaylisthandler = () => {
    console.log('add to playlist handler');
  };

  return (
    <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="search a course....."
        type="text"
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={'auto'}
        paddingY={'8'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button minW={'60'} key={index} onClick={() => setCategory(item)}>
            <Text children={item} fontWeight={'bold'} />
          </Button>
        ))}
      </HStack>
      {/* course content */}
      <Stack
        direction={['column', 'row']}
        flexWrap={'wrap'}
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        <Course
          title={'Javascript'}
          description={'This is a complete beginner friendly course on javascript.'}
          views={50}
          imagesrc={
            'https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_1280.jpg'
          }
          id={'js'}
          creator={'Aditya Dixit'}
          lecturecount={11}
          addtoPlayListHandler={addtoplaylisthandler}
        />
      </Stack>
    </Container>
  );
};

export default Courses;
