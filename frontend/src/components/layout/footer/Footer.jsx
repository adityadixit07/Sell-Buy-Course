import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialYoutubeCircular} from 'react-icons/ti'
import {VscGithubInverted} from 'react-icons/vsc'
import {TiSocialInstagramCircular} from 'react-icons/ti'

const Footer = () => {
  return (
    <Box padding={'4'} bg={'blackAlpha.900'} minH={'10vh'}>
        <Stack direction={['column','row']}>
            <VStack alignItems={['center','flex-start']} width={'full'}>
                <Heading children='All rights reserved' color={'white'} fontFamily={'monospace'} fontSize={'2xl'}/>
                <Heading children='@Aditya Kumar Dixit' fontFamily={'initial'}  color={'yellow.600'} size={'sm'}/>
            </VStack>
            <HStack spacing={['2','10']} justifyContent={'center'} color={'whiteAlpha.600'} fontSize={'2xl'}>
                <a href="youtube.com" target='blank'><TiSocialYoutubeCircular/></a>
                <a href="youtube.com" target='blank'><VscGithubInverted/></a>
                <a href="youtube.com" target='blank'><TiSocialInstagramCircular/></a>
                
            </HStack>
        </Stack>
    </Box>
  )
}

export default Footer