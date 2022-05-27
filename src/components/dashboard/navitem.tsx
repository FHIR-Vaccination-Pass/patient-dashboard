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

interface NavItemProps extends FlexProps {
  icon: IconType;
  title: string;
  active: boolean;
  navSize: String;
}

export const NavItem = ({ icon, title, active, navSize }: NavItemProps) => {
  return (
    <Flex mb={4} align='center'>
      <Menu placement='right'>
        <Link
          backgroundColor={active ? '#AEC8CA' : '#fff'}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
          w={navSize == 'large' ? '100%' : 'inherit'}
        >
          <MenuButton>
            <Flex>
              <Icon
                as={icon}
                justifySelf={'center'}
                alignSelf={'center'}
                fontSize='xl'
                color={active ? '#82AAAD' : 'gray.500'}
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
