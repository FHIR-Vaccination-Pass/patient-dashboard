import { IconType } from 'react-icons';
import {
  Flex,
  FlexProps,
  Icon,
  Link,
  Menu,
  MenuButton,
  Text,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

interface NavItemProps extends FlexProps {
  icon: IconType;
  title: string;
  active: boolean;
  navSize: String;
  link: string;
}

export const NavItem = ({
  icon,
  title,
  active,
  navSize,
  link,
}: NavItemProps) => {
  return (
    <Flex mb={4} align='center' w={navSize == 'small' ? 'unset' : '100%'}>
      <Menu placement='right'>
        <Link
          as={ReactLink}
          borderRadius={'5px'}
          to={link}
          backgroundColor={active ? 'brand.300' : '#fff'}
          p={3}
          _hover={{
            textDecor: 'none',
            backgroundColor: 'brand.500',
            color: 'white',
          }}
          w={'100%'}
          color={'gray.500'}
        >
          <MenuButton>
            <Flex>
              <Icon
                as={icon}
                justifySelf={'center'}
                alignSelf={'center'}
                fontSize='xl'
              />
              <Text
                align={'left'}
                ml={2}
                display={navSize == 'small' ? 'none' : 'flex'}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};
