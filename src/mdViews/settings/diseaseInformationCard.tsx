import {
  BoxProps,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { FC } from 'react';
import { Disease } from '../../core/models/Disease';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import { PopulationRecommendation } from '../../core/models/PopulationRecommendation';

interface DiseaseInformationCardProps extends BoxProps {
  currentDisease: Disease;
}

export const DiseaseInformationCard: FC<DiseaseInformationCardProps> = ({
  currentDisease,
}) => {
  const mapper = useMapper();
  let populationRecommendation = mapper.getPopulationRecommendationByDiseaseId(
    currentDisease.id
  );

  function saveDiseaseInformation() {
    const updatedDisease = mapper.saveDiseaseInformation(currentDisease);
    console.log(currentDisease);
  }

  return (
    <Flex pt={'30px'} flexDirection={'column'} w={'100%'}>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        mb={'10px'}
        alignItems={'center'}
      >
        <Text color={'gray.600'} fontSize={'xl'} alignItems={'center'}>
          Disease Description
        </Text>
        <Button
          variant={'solid'}
          color={'white'}
          bg={'green.400'}
          _hover={{ bg: 'green.500' }}
          _active={{ bg: 'green.500' }}
          _focus={{
            bg: 'green.500',
          }}
          onClick={() => saveDiseaseInformation()}
        >
          Save Changes
        </Button>
      </Flex>
      <Editable
        defaultValue={currentDisease.description}
        p={'10px'}
        border={'1px'}
        borderColor={'gray.200'}
        borderRadius={'5px'}
        color={'gray.500'}
        mb={'20px'}
        onChange={(value) => {
          currentDisease.description = value;
        }}
        w={'100%'}
      >
        <EditablePreview />
        <EditableTextarea />
      </Editable>
      <Text color={'gray.600'} fontSize={'xl'} mb={'10px'}>
        Population Recommendation
      </Text>
      <Flex flexDirection={'row'}>
        <Flex flexDirection={'column'} w={'30%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Minimum Age
          </Text>
          <Editable
            defaultValue={populationRecommendation?.ageStart?.toString() ?? ''}
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'10px'}
            onChange={(value) => {
              if (populationRecommendation) {
                populationRecommendation.ageStart = Number(value);
              } else {
                populationRecommendation = {
                  ageStart: Number(value),
                } as unknown as PopulationRecommendation;
              }
            }}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>

          <Text fontSize={'sm'} color={'gray.500'}>
            Maximum Age
          </Text>
          <Editable
            defaultValue={populationRecommendation?.ageEnd?.toString() ?? ''}
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'10px'}
            onChange={(value) => {
              if (populationRecommendation) {
                populationRecommendation.ageEnd = Number(value);
              } else {
                populationRecommendation = {
                  ageEnd: Number(value),
                } as unknown as PopulationRecommendation;
              }
            }}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>

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
              <ListItem
                key={`${location.country}/${location.state}`}
                color={'gray.500'}
              >
                {location.country}
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
        <Flex flexDirection={'column'} w={'70%'} ml={'50px'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Recommendation Text
          </Text>
          <Editable
            defaultValue={`The STIKO recommends start immunization for ${currentDisease.name} earliest from age ${populationRecommendation?.ageStart} and latest until age ${populationRecommendation?.ageEnd}.`}
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'10px'}
            onChange={(value) => {
              //TODO: How to deal with recommendation text
            }}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Flex>
      </Flex>
    </Flex>
  );
};
