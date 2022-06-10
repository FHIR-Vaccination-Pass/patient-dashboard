import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function ProfileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profile = { name: 'Sylwia Weller', role: 'Admin' };
  return (
    <>
      <Flex align='center' onClick={onOpen}>
        <Avatar size='md' src='avatar-1.jpg' />
        <Flex flexDir='column' ml={4} display={'flex'}>
          <Heading as='h3' size='sm'>
            Sylwia Weller
          </Heading>
          <Text color='gray'>Admin</Text>
        </Flex>
      </Flex>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <div style={{ margin: '20px 0px 0px 20px', height: '100%' }}>
            <Flex>
              <Avatar size='2xl' src='avatar-1.jpg' />
            </Flex>
            <HStack>
              <Box>
                <DrawerHeader
                  style={{ marginLeft: '-25px', marginBottom: '-15px' }}
                >
                  {profile.name}
                </DrawerHeader>
                <Text color='gray'>{profile.role}</Text>
              </Box>
              <Link to={'/profile'}>
                <Button colorScheme='teal' variant='ghost'>
                  View Profile
                </Button>
              </Link>
            </HStack>

            <DrawerBody></DrawerBody>
          </div>

          <DrawerFooter>
            <Button
              colorScheme='teal'
              variant='solid'
              aria-label={'Logout'}
              leftIcon={<FaSignOutAlt />}
            >
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
