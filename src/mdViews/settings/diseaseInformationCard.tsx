import {
  BoxProps,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Disease } from '../../core/models/Disease';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';

interface DiseaseInformationCardProps extends BoxProps {
  currentDisease: Disease;
}

export const DiseaseInformationCard: FC<DiseaseInformationCardProps> = ({
  currentDisease,
}) => {
  const mapper = useMapper();
  const populationRecommendation =
    mapper.getPopulationRecommendationByDiseaseId(currentDisease.id);
  return (
    <Flex pt={'30px'} flexDirection={'column'}>
      <Text color={'gray.600'} fontSize={'xl'} mb={'10px'}>
        Disease Description
      </Text>
      <Text
        p={'10px'}
        border={'1px'}
        borderColor={'gray.200'}
        borderRadius={'5px'}
        color={'gray.500'}
        mb={'20px'}
      >
        {currentDisease.description}
      </Text>
      <Text color={'gray.600'} fontSize={'xl'} mb={'10px'}>
        Population Recommendation
      </Text>
      <Flex flexDirection={'row'}>
        <Flex flexDirection={'column'} w={'30%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Minimum Age
          </Text>
          <Text
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'10px'}
          >
            {populationRecommendation?.ageStart ?? ''}
          </Text>

          <Text fontSize={'sm'} color={'gray.500'}>
            Maximum Age
          </Text>
          <Text
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'10px'}
          >
            {populationRecommendation?.ageEnd ?? ''}
          </Text>

          <Text color={'gray.600'} fontSize={'xl'} mb={'10px'}>
            Affected Locations
          </Text>

          <UnorderedList
            p={'10px 10px 10px 25px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            mb={'10px'}
            ml={'0px'}
          >
            {populationRecommendation?.locations.map((location) => (
              <ListItem color={'gray.500'}>{location.country}</ListItem>
            ))}
          </UnorderedList>
        </Flex>
        <Flex flexDirection={'column'} w={'70%'} ml={'50px'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Recommendation Text
          </Text>
          <Text
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'10px'}
          >
            The STIKO recommends start immunization for {currentDisease.name}{' '}
            earliest from age {populationRecommendation?.ageStart} and latest
            until age {populationRecommendation?.ageEnd}.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
