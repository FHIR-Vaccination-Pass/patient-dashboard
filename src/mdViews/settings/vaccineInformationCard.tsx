import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { CloseIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { cloneDeep, keyBy } from 'lodash';
import { skipToken } from '@reduxjs/toolkit/query';

import {
  MedicationMapper,
  VaccinationDoseMapper,
  VaccinationSchemeMapper,
} from '../../core/models';
import { AddVaccinationDoseModal } from './addVaccinationDoseModal';
import { AddVaccinationSchemeModal } from './addVaccinationSchemeModal';
import { OptionType } from '../../core/services/util/convertArrayToOptionArray';
import {
  medicationApi,
  vaccinationSchemeApi,
} from '../../core/services/redux/fhir';
import {
  useOrganizations,
  useTargetDiseases,
  useVaccinationDoses,
  useVaccinationSchemes,
} from '../../hooks';
import { FaWrench } from 'react-icons/fa';
import {
  VaccinationDoseRepeatingMapper,
  VaccinationDoseSingleMapper,
} from '../../core/models/VaccinationDose';

interface VaccinationSchemeUpdate {
  vs: VaccinationSchemeMapper;
  doses: (VaccinationDoseSingleMapper | VaccinationDoseRepeatingMapper)[];
}

interface VaccinationSchemeAccordionItemProps {
  vs: VaccinationSchemeMapper;
  doses: (VaccinationDoseSingleMapper | VaccinationDoseRepeatingMapper)[];
  onChange: ({ vs, doses }: VaccinationSchemeUpdate) => void;
  editMode: boolean;
}

const VaccinationSchemeAccordionItem: FC<
  VaccinationSchemeAccordionItemProps
> = ({ vs, doses, onChange, editMode }) => {
  const {
    isOpen: isDoseOpen,
    onOpen: onDoseOpen,
    onClose: onDoseClose,
  } = useDisclosure();

  return (
    <AccordionItem>
      <>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              {vs.name}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Flex flexDirection={'row'}>
            <Text color={'gray.600'} mr={'5px'}>
              Standard Scheme
            </Text>
            <Switch
              id='email-alerts'
              mb={'15px'}
              colorScheme='green'
              size={'lg'}
              isChecked={vs.isPreferred}
              isDisabled={!editMode}
              onChange={() => {
                onChange({ vs: vs.withIsPreferred(!vs.isPreferred), doses });
              }}
            />
          </Flex>
          <HStack mb={'30px'} spacing={'20px'} w={'100%'}>
            <Flex flexDirection={'column'} w={'50%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Recommended from age
              </Text>
              <NumberInput
                defaultValue={vs.ageStart}
                min={0}
                max={vs.ageEnd}
                isDisabled={!editMode}
                onChange={(value) => {
                  onChange({
                    vs: vs.withAgeStart(Number(value) || undefined),
                    doses,
                  });
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>

            <Flex flexDirection={'column'} w={'50%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Recommended until age
              </Text>
              <NumberInput
                defaultValue={vs.ageEnd}
                min={vs.ageStart}
                max={100}
                isDisabled={!editMode}
                onChange={(value) => {
                  onChange({
                    vs: vs.withAgeEnd(Number(value) || undefined),
                    doses,
                  });
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </HStack>

          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th>Dose Number</Th>
                  <Th>Type</Th>
                  <Th>Dose Quantity</Th>
                  <Th>Time Frame</Th>
                  <Th>Notes</Th>
                  <Th isNumeric></Th>
                </Tr>
              </Thead>
              <Tbody>
                {doses.map((dose) => (
                  <Tr key={dose.id}>
                    <Td>
                      {dose.type === 'single'
                        ? `${dose.numberInScheme} / ${doses.length}`
                        : 'Booster'}
                    </Td>
                    <Td>Single</Td>
                    <Td>{dose.doseQuantity}</Td>
                    <Td>TODO: wrong logic! months after</Td>
                    <Td>{dose.notes}</Td>
                    <Td isNumeric>
                      {editMode ? (
                        <SmallCloseIcon
                          w={'16px'}
                          h={'16px'}
                          _hover={{ cursor: 'pointer' }}
                          onClick={() => {
                            console.error('not implemented');
                          }}
                        />
                      ) : (
                        <Box w={'16px'} h={'16px'} />
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {editMode && (
            <Button
              variant={'solid'}
              color={'white'}
              bg={'green.400'}
              _hover={{ bg: 'green.500' }}
              _active={{ bg: 'green.500' }}
              _focus={{
                bg: 'green.500',
              }}
              mt={'10px'}
              onClick={onDoseOpen}
            >
              Add Dose
            </Button>
          )}

          <AddVaccinationDoseModal
            isOpen={isDoseOpen}
            onClose={onDoseClose}
            vaccinationSchemeId={vs.id}
          />
        </AccordionPanel>
      </>
    </AccordionItem>
  );
};

interface VaccineInformationCardProps extends BoxProps {
  medicationId: string;
}

export const VaccineInformationCard: FC<VaccineInformationCardProps> = ({
  medicationId,
}) => {
  const {
    isOpen: isSchemeOpen,
    onOpen: onSchemeOpen,
    onClose: onSchemeClose,
  } = useDisclosure();

  const { data: medRaw, isFetching: getMedIsFetching } =
    medicationApi.endpoints.getById.useQuery(medicationId);
  const [putMed, { isLoading: putMedIsLoading }] =
    medicationApi.endpoints.put.useMutation();
  const med = MedicationMapper.fromResource(medRaw);

  const { vaccinationSchemes, isFetching: vaccinationSchemesIsFetching } =
    useVaccinationSchemes(med ? { subject: medicationId } : skipToken);
  const [putVs, { isLoading: putVsIsLoading }] =
    vaccinationSchemeApi.endpoints.put.useMutation();

  const { vaccinationDoses, isFetching: vaccinationDosesIsFetching } =
    useVaccinationDoses(
      vaccinationSchemes
        ? { subject: vaccinationSchemes.map(({ id }) => id).join(',') }
        : skipToken
    );

  const schemes: Record<string, VaccinationSchemeUpdate> | undefined =
    vaccinationSchemes && vaccinationDoses && {};
  if (vaccinationSchemes && vaccinationDoses) {
    vaccinationSchemes?.forEach((vs) => (schemes![vs.id] = { vs, doses: [] }));
    vaccinationDoses?.forEach((dose) =>
      schemes![dose.vaccinationSchemeId].doses.push(dose)
    );
  }

  const { organizations, idToOrganization } = useOrganizations({});
  const {
    data: targetDiseasesData,
    targetDiseases,
    idToTargetDisease,
  } = useTargetDiseases({});

  const [updatedMed, setUpdatedMed] = useState<MedicationMapper | undefined>(
    undefined
  );
  const [updatedSchemes, setUpdatedSchemes] = useState<
    Record<string, VaccinationSchemeUpdate> | undefined
  >(undefined);
  const isLoading =
    getMedIsFetching ||
    putMedIsLoading ||
    vaccinationSchemesIsFetching ||
    putVsIsLoading;
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
      setUpdatedMed(cloneDeep(med));
      setUpdatedSchemes(cloneDeep(schemes));
      setEditMode(true);
    }

    setToggleEditModeRequested(false);
  }, [editMode, toggleEditModeRequested, isLoading, med]);

  const currentMed = useMemo((): MedicationMapper | undefined => {
    if (editMode) {
      return updatedMed;
    } else if (isLoading) {
      return updatedMed;
    } else {
      return med;
    }
  }, [editMode, isLoading, med, updatedMed]);

  const currentSchemes = useMemo(():
    | Record<string, VaccinationSchemeUpdate>
    | undefined => {
    if (editMode) {
      return updatedSchemes;
    } else if (isLoading) {
      return updatedSchemes;
    } else {
      return schemes;
    }
  }, [editMode, isLoading, schemes, updatedSchemes]);

  const manufacturer = useMemo((): OptionType => {
    const org = idToOrganization(currentMed?.manufacturerId);
    return org
      ? { value: org.id, label: org.name }
      : { value: '', label: 'Manufacturer' };
  }, [currentMed, idToOrganization]);
  const setManufacturer = useCallback(
    (value: SingleValue<OptionType>) => {
      setUpdatedMed(updatedMed!.withManufacturerId(value!.value));
    },
    [updatedMed]
  );

  const code = useMemo(
    (): string | undefined => currentMed?.code.coding.code,
    [currentMed]
  );
  const setCode = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setUpdatedMed(
        updatedMed!.withCode({
          coding: { system: updatedMed!.code.coding.system, code: value },
        })
      );
    },
    [updatedMed]
  );

  const form = useMemo(
    (): string | undefined => currentMed?.form.coding.code,
    [currentMed]
  );
  const setForm = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setUpdatedMed(
        updatedMed!.withForm({
          coding: { system: updatedMed!.form.coding.system, code: value },
        })
      );
    },
    [updatedMed]
  );

  const diseases = useMemo(
    (): OptionType[] =>
      currentMed?.targetDiseaseCodes.flatMap((tdCode) => {
        const td = idToTargetDisease(
          targetDiseasesData?.byCode[tdCode]?.ids[0]
        );
        return td ? [{ value: tdCode, label: td.name }] : [];
      }) ?? [],
    [currentMed, targetDiseasesData, idToTargetDisease]
  );
  const setDiseases = useCallback(
    (values: MultiValue<OptionType>) => {
      setUpdatedMed(
        updatedMed!.withTargetDiseaseCodes(values.map(({ value }) => value))
      );
    },
    [updatedMed]
  );

  const setScheme = useCallback(
    (value: VaccinationSchemeUpdate) => {
      const newSchemes = cloneDeep(updatedSchemes!);
      newSchemes[value.vs.id] = value;
      setUpdatedSchemes(newSchemes);
    },
    [updatedSchemes]
  );

  // options for select component
  const organizationOptions = useMemo(
    (): OptionType[] =>
      organizations?.map((org) => ({
        value: org.id,
        label: org.name,
      })) ?? [],
    [organizations]
  );
  const diseaseOptions = useMemo(
    (): OptionType[] =>
      targetDiseases?.map((td) => ({
        value: td.code.coding.code,
        label: td.name,
      })) ?? [],
    [targetDiseases]
  );

  function saveVaccineInformation() {
    if (updatedMed !== undefined && updatedSchemes !== undefined) {
      putMed(updatedMed.toResource());
      Object.values(updatedSchemes).forEach(({ vs, doses }) => {
        putVs(vs.toResource());
      });
    }
  }

  function monthDiff(d1: Date, d2: Date) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  const [expandedIdxs, setExpandedIdxs] = useState<number[]>([]);

  return (
    <Flex flexDirection={'column'} pr={'70px'} mt={'20px'} w={'80%'}>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        borderBottom={'1px'}
        borderBottomColor={'gray.300'}
        py={'12px'}
      >
        <Text color={'gray.600'} fontSize={'xl'}>
          Vaccine Information
        </Text>
        {editMode ? (
          <ButtonGroup isAttached={true} w={'256px'}>
            <Button
              isLoading={isLoading}
              colorScheme={'green'}
              leftIcon={<FaWrench color={'white'} />}
              flexGrow={1}
              onClick={() => {
                saveVaccineInformation();
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
            Edit Vaccine
          </Button>
        )}
      </Flex>
      <HStack mt={'12px'} spacing={'20px'} w={'100%'}>
        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Manufacturer
          </Text>
          <Select
            options={organizationOptions}
            value={manufacturer}
            isDisabled={!editMode}
            onChange={setManufacturer}
          />
        </Flex>

        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            PZN Code
          </Text>
          <Input
            variant={'flushed'}
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            value={code ?? ''}
            isDisabled={!editMode}
            onChange={setCode}
          />
        </Flex>

        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Form
          </Text>
          <Input
            variant={'flushed'}
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            value={form ?? ''}
            isDisabled={!editMode}
            onChange={setForm}
          />
        </Flex>
      </HStack>

      <Box
        borderBottom={'1px'}
        borderBottomColor={'gray.300'}
        mt={'32px'}
        w={'100%'}
        pr={'10px'}
      >
        <Text color={'gray.600'} mb={'5px'} fontSize={'xl'}>
          Target Diseases
        </Text>
      </Box>
      <Select
        isMulti
        options={diseaseOptions}
        value={diseases}
        isDisabled={!editMode}
        onChange={setDiseases}
      />

      {currentMed && currentSchemes && (
        <>
          <Flex justifyContent={'space-between'}>
            <Box
              borderBottom={'1px'}
              borderBottomColor={'gray.300'}
              mt={'32px'}
              w={'92%'}
              pr={'10px'}
            >
              <Text color={'gray.600'} mb={'5px'} fontSize={'xl'}>
                Vaccination Scheme
              </Text>
            </Box>
            <AddVaccinationSchemeModal
              isOpen={isSchemeOpen}
              onClose={onSchemeClose}
              medicationId={currentMed.id}
            />
          </Flex>

          <Accordion
            index={expandedIdxs}
            onChange={(value) => setExpandedIdxs(value as number[])}
            allowMultiple
            mb={'30px'}
          >
            {Object.values(currentSchemes).map(({ vs, doses }) => (
              <VaccinationSchemeAccordionItem
                key={vs.id}
                vs={vs}
                doses={doses}
                editMode={editMode}
                onChange={setScheme}
              />
            ))}
          </Accordion>

          <Button
            variant={'solid'}
            color={'white'}
            bg={'green.400'}
            _hover={{ bg: 'green.500' }}
            _active={{ bg: 'green.500' }}
            _focus={{
              bg: 'green.500',
            }}
            onClick={onSchemeOpen}
          >
            Add Scheme
          </Button>
        </>
      )}
    </Flex>
  );
};
