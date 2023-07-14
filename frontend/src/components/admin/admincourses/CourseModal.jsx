import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

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

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteLectureButtonHandler,
  addLectureHandler,
  courseTitle,
  lectures = [1,2,3,4,5,6,7,8],
}) => {
  //   const courseTitle = 'Full stack java course';
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const uploadVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  // we upload the content then after we don't want that all fields occupy previous data so after closing we reset all filed of upload form
  const handleClose=()=>{
    setTitle('')
    setDescription('')
    setVideo('')
    setVideoPrev('')
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      size={'full'}
      onClose={handleClose}
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>

        <ModalCloseButton onClick={onClose} />
        <ModalBody p={'16'}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box p={['0', '16']}>
              <Box my={'5'}>
                <Heading children={courseTitle} />
                <Heading children={`#${id}`} size={'sm'} opacity={'0.4'} />
              </Box>
              <Heading children={'Lectures'} size={'lg'} />
              {
                lectures.map((item,index)=>(
                  <VideoCard
                  title={'java intro'}
                  description={'this is a intro lecture'}
                  num={index+1}
                  lectureId="adi_70"
                  courseId="aditya"
                  deleteLectureButtonHandler={deleteLectureButtonHandler}
                />
                ))
              }
             
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading
                    children="Add lecture"
                    size={'md'}
                    textTransform={'uppercase'}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.300"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <Input
                    accept="image/*"
                    required
                    type="file"
                    id="chooseAvatar"
                    placeholder={'choose Avatar'}
                    focusBorderColor="purple.300"
                    css={fileUploadStyle}
                    onChange={uploadVideoHandler}
                  />
                  {videoPrev && (
                    <video
                      src={videoPrev}
                      controlsList="nodownload"
                      controls
                    ></video>
                  )}
                  <Button width={'full'} colorScheme='green' type='submit'>Upload</Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteLectureButtonHandler,
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my={'8'}
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      padding={['4', '8']}
    >
      <Box>
        <Heading children={`#${num} ${title}`} size={'sm'} />
        <Text children={description} />
      </Box>
      <Button
        color={'yellow.600'}
        onClick={() => deleteLectureButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBin7Fill />
      </Button>
    </Stack>
  );
}
