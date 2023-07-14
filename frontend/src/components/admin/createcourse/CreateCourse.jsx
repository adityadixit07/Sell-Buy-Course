import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Sidebar from '../Sidebar';

const CreateCourse = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState();
  const fileUploadCSS = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    height: '100%',
    color: '#ECC948',
    backgroundColor: 'white',
    border: 'none',
  };
  const fileUploadStyle = {
    '&::file-selector-button': fileUploadCSS,
  };
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
  const uploadImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      //   css={{cursor:`url(${xyz}),default`}}
    >
      <Container py={'16'}>
        <form>
          <Heading
            textTransform={'uppercase'}
            children="create courese"
            my={'16'}
            textAlign={['center', 'left']}
          />
          <VStack m="auto" spacing={'8'}>
            <Input
              required
              type="text"
              id="title"
              value={title}
              placeholder={'Course Name'}
              focusBorderColor="yellow.500"
              onChange={e => setTitle(e.target.value)}
            />{' '}
            <Input
              required
              type="text"
              id="description"
              value={description}
              placeholder={'Description'}
              focusBorderColor="yellow.500"
              onChange={e => setDescription(e.target.value)}
            />
            <Input
              required
              type="text"
              id="description"
              value={createdBy}
              placeholder={'Creator Name'}
              focusBorderColor="yellow.500"
              onChange={e => setCreatedBy(e.target.value)}
            />
            <Select
              focusBorderColor="yellow.500"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Course Category</option>
              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              type="file"
              id="chooseAvatar"
              placeholder={'choose Avatar'}
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={uploadImageHandler}
            />
            {imagePrev && (
              <Image objectFit={'contain'} boxSize={'64'} src={imagePrev} />
            )}
            <Button width={'full'} type="submit" colorScheme="yellow">
              Create...
            </Button>
          </VStack>
        </form>
      </Container>
      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;
