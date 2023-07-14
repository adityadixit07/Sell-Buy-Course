import { Text, Box, Grid, Heading, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import intro from '../../assets/videos/intro.mp4';
const CoursePage = () => {
  const [lectureNumber,setLectureNumber]=useState(0);
  const lectures = [
    {
      _id: 'asda34sda1',
      title: 'sample1',
      descripton: 'This is a sample course',
      video: {
        url: 'adityadixit.com',
      },
    },
    {
      _id: 'asda34sda2',
      title: 'sample2',
      descripton: 'This is a sample course',
      video: {
        url: 'adityadixit.com',
      },
    },
    {
      _id: 'asda34sda3',
      title: 'sample3',
      descripton: 'This is a sample course',
      video: {
        url: 'adityadixit.com',
      },
    },
    {
      _id: 'asda34sda4',
      title: 'sample4',
      descripton: 'This is a sample course',
      video: {
        url: 'adityadixit.com',
      },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width={'100%'}
          controls
          controlsList="nodownload noremoteplayback"
          disableRemotePlayback
          src={intro}
        ></video>
        <Heading
          m={'4'}
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`}
        />
        <Heading children="Description" m={'4'} />
        <Text m={'4'} children={lectures[lectureNumber].descripton} />
      </Box>
      {/* side column */}
      <VStack>
        {lectures.map((element, index) => (
          <button
            key={element._id}
            style={{
              width: '100%',
              padding: '1rem',
              margin: '0',
              borderBottom: '1px solid rgba(0,0,0,0.2',
              textAlign: 'center',
            }}
            onClick={()=>setLectureNumber(index)}
          >
            <Text noOfLines={'1'}>
              #{index + 1}
              {element.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursePage;
