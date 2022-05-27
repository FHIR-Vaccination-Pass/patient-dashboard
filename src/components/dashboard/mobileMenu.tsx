import {
  Avatar,
  BoxProps,
  Divider,
  Flex,
  Heading,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FaBookMedical, FaRegCalendarAlt, FaSyringe } from 'react-icons/fa';
import { NavItem } from './navitem';

interface SidebarProps extends BoxProps {
  onClose: () => void;
  onOpen: () => void;
  isOpen: boolean;
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
          <Flex
            p='5%'
            mt={4}
            flexDir='column'
            w='100%'
            alignItems={'flex-start'}
          >
            <Flex mb={4} align='center'>
              <Avatar size='sm' src='avatar-1.jpg' />
              <Flex flexDir='column' ml={4} display={'flex'}>
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
                navSize={'large'}
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
