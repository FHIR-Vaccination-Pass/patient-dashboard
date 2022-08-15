import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  HStack,
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
import React, { FC, useState } from 'react';
import { Medication } from '../../core/models/Medication';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import Select, { OnChangeValue } from 'react-select';
import { SmallCloseIcon } from '@chakra-ui/icons';
import { AddVaccinationDoseModal } from './addVaccinationDoseModal';
import { AddVaccinationSchemeModal } from './addVaccinationSchemeModal';

interface VaccineInformationCardProps extends BoxProps {
  selectedMedication: Medication;
}

type OptionType = {
  value: string;
  label: string;
};

// Convert to option array for Select component
function convertArrayToOptionArray(list: string[]): OptionType[] {
  const result: OptionType[] = [];
  list.forEach((listElement) => {
    result.push({
      value: listElement.toLowerCase(),
      label: listElement,
    });
  });
  return result;
}

export const VaccineInformationCard: FC<VaccineInformationCardProps> = ({
  selectedMedication,
}) => {
  const mapper = useMapper();
  const {
    isOpen: isSchemeOpen,
    onOpen: onSchemeOpen,
    onClose: onSchemeClose,
  } = useDisclosure();
  const {
    isOpen: isDoseOpen,
    onOpen: onDoseOpen,
    onClose: onDoseClose,
  } = useDisclosure();
  const vaccinationSchemes = mapper
    .getAllVaccinationSchemes()
    .filter((scheme) => scheme.medicationId === selectedMedication.id);
  const diseases = mapper.getAllDiseases();
  const dosesMap = mapper.getVaccinationDosesForVaccinationSchemes(
    vaccinationSchemes.map((scheme) => scheme.id)
  );

  // options for select component
  const diseaseOptions: OptionType[] = convertArrayToOptionArray(
    diseases.map((disease) => disease.name)
  );

  const [currentMedication, setCurrentMedication] =
    useState<Medication>(selectedMedication);

  function setNewManufacturer(name: string) {
    const organization = mapper.getOrganizationByName(name);
    if (organization) {
      currentMedication.manufacturerId = organization.id;
    }
  }

  function updateTargetDiseases(
    newTargetDiseases: OnChangeValue<OptionType, true>
  ) {
    currentMedication.targetDiseaseIds = diseases
      .filter((disease) =>
        newTargetDiseases
          .map((newTargetDisease) => newTargetDisease.label)
          .includes(disease.name)
      )
      .map((disease) => disease.id);
  }

  function saveVaccineInformation() {
    const result = mapper.saveVaccineInformation(currentMedication);
  }

  function monthDiff(d1: Date, d2: Date) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }
  return (
    <Flex flexDirection={'column'} pr={'70px'} mt={'20px'} w={'80%'}>
      <Box borderBottom={'1px'} borderBottomColor={'gray.300'} mb={'15px'}>
        <Text color={'gray.600'} mb={'5px'} fontSize={'xl'}>
          Vaccine Information
        </Text>
      </Box>
      <HStack mb={'30px'} spacing={'20px'} w={'100%'}>
        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Manufacturer
          </Text>
          <Editable
            defaultValue={
              mapper.getOrganizationById(currentMedication.manufacturerId)?.name
            }
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'20px'}
            onChange={(value) => {
              setNewManufacturer(value);
            }}
          >
            <EditablePreview />
            <EditableTextarea />
          </Editable>
        </Flex>

        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            PZN Code
          </Text>
          <Editable
            defaultValue={currentMedication.code.coding.code}
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'20px'}
            onChange={(value) => {
              currentMedication.code.coding.code = value;
            }}
          >
            <EditablePreview />
            <EditableTextarea />
          </Editable>
        </Flex>

        <Flex flexDirection={'column'} w={'100%'}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Form
          </Text>
          <Editable
            defaultValue={currentMedication.form.coding.code}
            p={'5px 10px'}
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'20px'}
            onChange={(value) => {
              currentMedication.form.coding.code = value;
            }}
          >
            <EditablePreview />
            <EditableTextarea />
          </Editable>
        </Flex>
      </HStack>
      <Flex justifyContent={'space-between'}>
        <Box
          borderBottom={'1px'}
          borderBottomColor={'gray.300'}
          mb={'30px'}
          w={'92%'}
          pr={'10px'}
        >
          <Text color={'gray.600'} mb={'5px'} fontSize={'xl'}>
            Vaccination Scheme
          </Text>
        </Box>
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
        <AddVaccinationSchemeModal
          isOpen={isSchemeOpen}
          onClose={onSchemeClose}
          medicationId={currentMedication.id}
        />
      </Flex>

      <Accordion defaultIndex={[]} allowMultiple mb={'30px'}>
        {vaccinationSchemes.map((scheme) => (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  {scheme.name}
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
                  defaultChecked={scheme.isPreferred}
                  onChange={() => (scheme.isPreferred = !scheme.isPreferred)}
                />
              </Flex>
              <HStack mb={'30px'} spacing={'20px'} w={'100%'}>
                <Flex flexDirection={'column'} w={'50%'}>
                  <Text fontSize={'sm'} color={'gray.500'}>
                    Recommended from age
                  </Text>
                  <NumberInput
                    defaultValue={scheme?.ageStart}
                    min={0}
                    max={99}
                    onChange={(value) => {
                      if (scheme) {
                        scheme.ageStart = Number(value);
                      }
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
                    defaultValue={scheme?.ageEnd}
                    min={0}
                    max={99}
                    onChange={(value) => {
                      if (scheme) {
                        scheme.ageEnd = Number(value);
                      }
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
                    {dosesMap.get(scheme.id)?.map((dose) => (
                      <Tr>
                        <Td>
                          {dose.numberInScheme}/
                          {dosesMap.get(scheme.id)?.length}
                        </Td>
                        <Td>Single</Td>
                        <Td>{dose.doseQuantity}</Td>
                        <Td>
                          TODO: wrong logic!
                          {dose.timeframeStart !== undefined &&
                            dose.timeframeEnd !== undefined &&
                            (dose.timeframeEnd - dose.timeframeStart) / 30}{' '}
                          months after
                        </Td>
                        <Td>{dose.notes}</Td>
                        <Td isNumeric>
                          <SmallCloseIcon
                            _hover={{ cursor: 'pointer' }}
                            onClick={() => {
                              dosesMap.set(
                                scheme.id,
                                dosesMap
                                  .get(scheme.id)!
                                  .filter(
                                    (possibleDose) =>
                                      possibleDose.id !== dose.id
                                  )
                              );
                            }}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
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
              <AddVaccinationDoseModal
                isOpen={isDoseOpen}
                onClose={onDoseClose}
                vaccinationSchemeId={scheme.id}
              />
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>

      <Box
        borderBottom={'1px'}
        borderBottomColor={'gray.300'}
        mb={'15px'}
        w={'100%'}
        pr={'10px'}
      >
        <Text color={'gray.600'} mb={'5px'} fontSize={'xl'}>
          Target Diseases
        </Text>
      </Box>
      <Select
        defaultValue={convertArrayToOptionArray(
          diseases
            .filter((disease) =>
              currentMedication.targetDiseaseIds.includes(disease.id)
            )
            .map((disease) => disease.name)
        )}
        isMulti
        options={diseaseOptions}
        onChange={updateTargetDiseases}
      />
      <Button
        variant={'solid'}
        color={'white'}
        bg={'green.400'}
        _hover={{ bg: 'green.500' }}
        _active={{ bg: 'green.500' }}
        _focus={{
          bg: 'green.500',
        }}
        w={'150px'}
        h={'40px'}
        mt={'30px'}
        onClick={() => saveVaccineInformation()}
      >
        Save Changes
      </Button>
    </Flex>
  );
};
