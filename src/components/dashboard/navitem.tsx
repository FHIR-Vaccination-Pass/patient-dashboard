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
    <Flex mb={4} align='center' w={navSize == 'small' ? 'unset' : '100%'}>
      <Menu placement='right'>
        <Link
          backgroundColor={active ? 'brand.300' : '#fff'}
          p={3}
          borderRadius={8}
          _hover={{
            textDecor: 'none',
            backgroundColor: 'brand.300',
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
