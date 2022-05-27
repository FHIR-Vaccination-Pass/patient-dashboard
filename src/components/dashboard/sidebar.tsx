import {
  Avatar,
  BoxProps,
  CloseButton,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useState } from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaBookMedical,
  FaRegCalendarAlt,
  FaSyringe,
} from 'react-icons/fa';
import { NavItem } from './navitem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'History', icon: FaSyringe },
  { name: 'Recommendations', icon: FaRegCalendarAlt },
  { name: 'Wiki', icon: FaBookMedical },
];

export const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
  const [navSize, changeNavSize] = useState('large');
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={navSize == 'small' ? '20px' : '30px'}
      flexDir='column'
      justifyContent='space-between'
      m={'10px'}
      h={'95%'}
      pos='sticky'
      left='5'
      w={navSize == 'small' ? '75px' : '200px'}
      {...rest}
    >
      <Flex
        p='5%'
        mt={4}
        flexDir='column'
        w='100%'
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
      >
        <Flex mb={4} align='center'>
          <Avatar size='sm' src='avatar-1.jpg' />
          <Flex
            flexDir='column'
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}
          >
            <Heading as='h3' size='sm'>
              Sylwia Weller
            </Heading>
            <Text color='gray'>Admin</Text>
          </Flex>
        </Flex>
        <Divider mb={2} />
        {LinkItems.map((link) => (
          <NavItem
            title={link.name}
            icon={link.icon}
            navSize={navSize}
            active={false}
          >
            {link.name}
          </NavItem>
        ))}
      </Flex>

      <Flex
        p='5%'
        flexDir='column'
        w='100%'
        alignItems={navSize == 'small' ? 'center' : 'flex-start'}
        mt={4}
      >
        <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
          <CloseButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onClose}
          />
        </Flex>
        <Divider />
        <Flex
          mt={4}
          mb={4}
          alignSelf='center'
          onClick={() => {
            if (navSize == 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        >
          <Icon
            as={navSize == 'small' ? FaAngleRight : FaAngleLeft}
            justifySelf={'center'}
            alignSelf={'center'}
            fontSize='xl'
            color={'gray.500'}
          />
          <Flex flexDir='column' display={navSize == 'small' ? 'none' : 'flex'}>
            <Text size='sm'>Collapse</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
