import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutCircleRLine } from 'react-icons/ri';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = true;

  const user = {
    role: 'admin',
  };

  return (
    <>
      <ColorModeSwitcher />
      <Button
        colorScheme={'yellow'}
        width={'12'}
        height={'12'}
        rounded={'full'}
        position={'fixed'}
        top="6"
        left="6"
        zIndex={'overlay'}
        onClick={onOpen}

      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(2px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'2px'}>Course Bundler</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'1rem'} alignItems={'flex-start'}>
              <Link onClick={onClose} to="/">
                <Button variant={'ghost'}>Home</Button>
              </Link>
              <Link onClick={onClose} to="courses">
                <Button variant={'ghost'}>All Courses</Button>
              </Link>
              <Link onClick={onClose} to="/request">
                <Button variant={'ghost'}>Request Course</Button>
              </Link>
              <Link onClick={onClose} to="contact">
                <Button variant={'ghost'}>Contact</Button>
              </Link>
              <Link onClick={onClose} to="about">
                <Button variant={'ghost'}>About Us</Button>
              </Link>

              <HStack
                position={'absolute'}
                justifyContent={'space-evenly'}
                bottom={'2'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to="profile" onClick={onClose}>
                          <Button variant={'outline'} colorScheme="green">
                            Profile
                          </Button>
                        </Link>
                        <Button variant={'outline'} colorScheme="red" onClick={onClose}> 
                          <RiLogoutCircleRLine style={{ margin: '3px' }} />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link to="/admin/dashboard" onClick={onClose}>
                          <Button variant="ghost" colorScheme="purple">
                            <RiDashboardFill style={{ margin: '3px' }} />
                            DashBoard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                <>
                    <Link to={'/login'} onClick={onClose}>
                      <Button colorScheme="yellow">Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link to={'/register'} onClick={onClose}>
                      <Button colorScheme={'yellow'}>Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Header;
