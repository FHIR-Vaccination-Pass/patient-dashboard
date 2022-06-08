import {
  Avatar,
  BoxProps,
  Divider,
  Flex,
  Heading,
  Input,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaBookMedical, FaRegCalendarAlt, FaSyringe } from 'react-icons/fa';
import { NavItem } from './navitem';
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
  link: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'History', icon: FaSyringe, link: 'history' },
  { name: 'Recommendations', icon: FaRegCalendarAlt, link: 'recommendations' },
  { name: 'Wiki', icon: FaBookMedical, link: 'wiki' },
];

export const MobileMenu = ({
  onClose,
  onOpen,
  isOpen,
  ...rest
}: SidebarProps) => {
  return (
    <ModalOverlay>
      <ModalContent bg={'transparent'} p={'10px'}>
        <Flex
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
          borderRadius={'30px'}
          flexDir='column'
          justifyContent='space-between'
          h={'95vh'}
          pos='sticky'
          w={'full'}
          {...rest}
        >
          <Flex p='5%' flexDir='column' w='100%' alignItems={'flex-start'}>
            <Link to={'profile'} onClick={onClose}>
              <Flex
                mb={4}
                align='center'
                borderRadius={'25px'}
                w={'100%'}
                p={'10px'}
                _hover={{ boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.10)' }}
              >
                <Avatar size='md' src='avatar-1.jpg' />
                <Flex flexDir='column' ml={2} display={'flex'}>
                  <Heading as='h3' size='sm'>
                    Sylwia Weller
                  </Heading>
                  <Text color='gray'>Admin</Text>
                </Flex>
              </Flex>
            </Link>
            <Input
              mt={4}
              mb={4}
              variant='outline'
              focusBorderColor='base.700'
              placeholder='Search'
            />
            {LinkItems.map((navLink) => (
              <NavItem
                title={navLink.name}
                icon={navLink.icon}
                navSize={'large'}
                active={false}
                link={navLink.link}
                onClose={onClose}
              >
                {navLink.name}
              </NavItem>
            ))}
          </Flex>

          <Flex
            p='5%'
            flexDir='column'
            w='100%'
            alignItems={'flex-start'}
            mt={4}
          >
            <Divider />
            <Flex mt={4} mb={4} align='center' onClick={onClose}>
              <Flex flexDir='column' ml={4} display={'flex'}>
                <Text size='sm'>Close</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </ModalContent>
    </ModalOverlay>
  );
};
