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
  onClose: () => void;
}

export const NavItem = ({
  icon,
  title,
  active,
  navSize,
  link,
  onClose,
}: NavItemProps) => {
  return (
    <Flex
      onClick={onClose}
      align='center'
      w={navSize === 'small' ? 'unset' : '100%'}
      h={'55px'}
    >
      <Menu placement='right'>
        <Link
          as={ReactLink}
          to={link}
          h={'100%'}
          w={'100%'}
          textDecor='none !important'
        >
          <Flex
            p={3}
            pt={1}
            pb={1}
            mb={2}
            h={'100%'}
            _hover={{
              textDecor: 'none',
              backgroundColor: 'brand.10',
            }}
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
                  display={navSize === 'small' ? 'none' : 'flex'}
                >
                  {title}
                </Text>
              </Flex>
            </MenuButton>
          </Flex>
        </Link>
      </Menu>
    </Flex>
  );
};
