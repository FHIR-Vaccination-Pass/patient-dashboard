import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  Input,
  ListItem,
  Text,
  Textarea,
  UnorderedList,
} from '@chakra-ui/react';
import { cloneDeep } from 'lodash';

import {
  DiseaseMapper,
  PopulationRecommendationMapper,
} from '../../core/models';
import {
  populationRecommendationApi,
  targetDiseaseApi,
} from '../../core/services/redux/fhir';
import { usePopulationRecommendations } from '../../hooks';
import { FaWrench } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';

interface DiseaseInformationCardProps extends BoxProps {
  diseaseId: string;
}

export const DiseaseInformationCard: FC<DiseaseInformationCardProps> = ({
  diseaseId,
}) => {
  const { data: tdRaw, isFetching: getTdIsFetching } =
    targetDiseaseApi.endpoints.getById.useQuery(diseaseId);
  const [putTd, { isLoading: putTdIsLoading }] =
    targetDiseaseApi.endpoints.put.useMutation();
  const td = DiseaseMapper.fromResource(tdRaw);

  const {
    data: prData,
    isFetching: getPrIsFetching,
    idToPopulationRecommendation,
  } = usePopulationRecommendations({});
  const [putPr, { isLoading: putPrIsLoading }] =
    populationRecommendationApi.endpoints.put.useMutation();
  const pr =
    td &&
    idToPopulationRecommendation(
      prData?.byDisease[td.code.coding.code]?.ids[0]
    );

  const [updatedTd, setUpdatedTd] = useState<DiseaseMapper | undefined>(
    undefined
  );
  const [updatedPr, setUpdatedPr] = useState<
    PopulationRecommendationMapper | undefined
  >(undefined);
  const isLoading =
    getTdIsFetching || putTdIsLoading || getPrIsFetching || putPrIsLoading;
  const [editMode, setEditMode] = useState<boolean>(false);
  const [toggleEditModeRequested, setToggleEditModeRequested] = useState(false);

  const toggleEditMode = useCallback(() => {
    setToggleEditModeRequested(!toggleEditModeRequested);
  }, [toggleEditModeRequested]);

  useEffect(() => {
    if (!toggleEditModeRequested || isLoading) {
      return;
    }

    if (editMode) {
      setEditMode(false);
    } else {
      setUpdatedTd(cloneDeep(td));
      setUpdatedPr(cloneDeep(pr));
      setEditMode(true);
    }

    setToggleEditModeRequested(false);
  }, [editMode, toggleEditModeRequested, isLoading, td, pr]);

  const currentTd = useMemo((): DiseaseMapper | undefined => {
    if (editMode) {
      return updatedTd;
    } else if (isLoading) {
      return updatedTd;
    } else {
      return td;
    }
  }, [editMode, isLoading, td, updatedTd]);

  const currentPr = useMemo((): PopulationRecommendationMapper | undefined => {
    if (editMode) {
      return updatedPr;
    } else if (isLoading) {
      return updatedPr;
    } else {
      return pr;
    }
  }, [editMode, isLoading, pr, updatedPr]);

  const description = useMemo(
    (): string | undefined => currentTd?.description,
    [currentTd]
  );
  const setDescription = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>): void => {
      setUpdatedTd(updatedTd!.withDescription(value));
    },
    [updatedTd]
  );

  const ageStart = useMemo(
    (): string => currentPr?.ageStart?.toString() ?? '',
    [currentPr]
  );
  const setAgeStart = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
      setUpdatedPr(updatedPr!.withAgeStart(Number(value) || undefined));
    },
    [updatedPr]
  );

  const ageEnd = useMemo(
    (): string => currentPr?.ageEnd?.toString() ?? '',
    [currentPr]
  );
  const setAgeEnd = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
      setUpdatedPr(updatedPr!.withAgeEnd(Number(value) || undefined));
    },
    [updatedPr]
  );

  function saveDiseaseInformation() {
    if (updatedTd !== undefined && updatedPr !== undefined) {
      putTd(updatedTd.toResource());
      putPr(updatedPr.toResource());
    }
  }

  return (
    <Flex pt={'30px'} flexDirection={'column'} w={'100%'}>
      {td && (
        <>
          <Flex
            flexDirection={'row'}
            justifyContent={'space-between'}
            mb={'10px'}
            alignItems={'center'}
          >
            <Text color={'gray.600'} fontSize={'xl'} alignItems={'center'}>
              Disease Description
            </Text>
            {editMode ? (
              <ButtonGroup isAttached={true} w={'256px'}>
                <Button
                  isLoading={getTdIsFetching || putTdIsLoading}
                  colorScheme={'green'}
                  leftIcon={<FaWrench color={'white'} />}
                  flexGrow={1}
                  onClick={() => {
                    saveDiseaseInformation();
                    toggleEditMode();
                  }}
                >
                  Save Changes
                </Button>
                <Button
                  colorScheme={'gray'}
                  onClick={toggleEditMode}
                  leftIcon={<CloseIcon color={'darkgray'} />}
                />
              </ButtonGroup>
            ) : (
              <Button
                w={'256px'}
                onClick={toggleEditMode}
                leftIcon={<FaWrench color={'black'} />}
              >
                Edit Disease
              </Button>
            )}
          </Flex>
          <Textarea
            variant='flushed'
            value={description}
            p={'10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'20px'}
            isDisabled={!editMode}
            onChange={setDescription}
            w={'100%'}
          />
          <Text color={'gray.600'} fontSize={'xl'} mb={'10px'}>
            Population Recommendation
          </Text>
          <Flex flexDirection={'row'}>
            <Flex flexDirection={'column'} w={'30%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Minimum Age
              </Text>
              <Input
                variant='flushed'
                type={'number'}
                min={'0'}
                max={ageEnd}
                value={ageStart}
                p={'5px 10px'}
                border={'1px'}
                borderColor={'gray.200'}
                borderRadius={'5px'}
                color={'gray.500'}
                mb={'10px'}
                isDisabled={!editMode}
                onChange={setAgeStart}
              />
              <Text fontSize={'sm'} color={'gray.500'}>
                Maximum Age
              </Text>
              <Input
                variant='flushed'
                type={'number'}
                min={ageStart}
                max={'100'}
                value={ageEnd}
                p={'5px 10px'}
                border={'1px'}
                borderColor={'gray.200'}
                borderRadius={'5px'}
                color={'gray.500'}
                mb={'10px'}
                isDisabled={!editMode}
                onChange={setAgeEnd}
              />

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
                {pr?.locations.map((location) => (
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
              <Text
                variant='flushed'
                p={'5px 10px'}
                border={'1px'}
                borderColor={'gray.200'}
                borderRadius={'5px'}
                color={'gray.500'}
                mb={'10px'}
              >
                The STIKO recommends start immunization for {td.name} earliest
                from age {pr?.ageStart} and latest until age {pr?.ageEnd}.
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
