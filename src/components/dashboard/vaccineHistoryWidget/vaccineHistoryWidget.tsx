import {
  Badge,
  BoxProps,
  Flex,
  List,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { HistoryItems } from './vaccineHistoryMockData';

interface VaccineHistoryWidgetProps extends BoxProps {}

export const VaccineHistoryWidget = ({
  ...rest
}: VaccineHistoryWidgetProps) => {
  const mockData = HistoryItems;
  return (
    <Flex
      maxW={'100%'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      rounded={'lg'}
      h={'100%'}
      overflowY={'hidden'}
    >
      <List spacing={3} p={5} overflowY={'scroll'} mt={4} mb={4}>
        {mockData.map((item, index) => (
          <ListItem
            borderRadius={'15px'}
            border={'1px solid'}
            borderColor={'gray.200'}
            p={2}
            pt={1}
            pb={1}
            _hover={{
              textDecor: 'none',
              backgroundColor: 'brand.10',
            }}
          >
            <Badge mr={2}>{item.date}</Badge> {item.name}{' '}
            <Badge ml={2} colorScheme={'purple'}>
              {item.medicalDoctor}
            </Badge>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};
