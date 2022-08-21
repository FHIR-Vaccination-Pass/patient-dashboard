import {
  Box,
  BoxProps,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { Disease } from '../../../core/models/Disease';
import Select from 'react-select';
import { Medication, VaccinationScheme } from '../../../core/models';
import {
  useMedications,
  useOrganizations,
  useVaccinationSchemes,
} from '../../../hooks';
import { OptionType } from '../../settings/vaccineInformationCard';
import { cloneDeep } from 'lodash';

interface ImmunizationConfigurationTabProps extends BoxProps {
  currentDisease: Disease | undefined;
}

export const ImmunizationConfigurationTab: FC<
  ImmunizationConfigurationTabProps
> = ({ currentDisease }) => {
  const { medications, idToMedication } = useMedications({});
  const { organizations, idToOrganization } = useOrganizations({});
  const medicationOptions = convertMedicationArrayToOptionArray(
    medications || []
  );
  const [initialized, setInitialized] = useBoolean(false);
  let schemes;

  const [standardMedication, setStandardMedication] = useState<
    Medication | undefined
  >(undefined);

  const [standardScheme, setStandardScheme] = useState<
    VaccinationScheme | undefined
  >(undefined);

  useEffect(() => {
    if (medications && medications.length >= 1 && !initialized) {
      setStandardMedication(medications.at(0)); //TODO: Insert real vaccine
      const { vaccinationSchemes } = useVaccinationSchemes({
        subject: medications.at(0)!.id,
      });
      // setStandardScheme()
      setInitialized.on();
    }
  }, [medications]);

  function convertMedicationArrayToOptionArray(
    list: Medication[]
  ): OptionType[] {
    const result: OptionType[] = [];
    list.forEach((listElement) => {
      result.push({
        value: listElement.id,
        label: listElement.tradeName,
      });
    });
    return result;
  }

  return (
    <Flex w={'100%'} flexDirection={'column'}>
      <Text fontSize={'sm'} color={'gray.500'} mb={'5px'}>
        Standard Vaccine
      </Text>
      <FormControl mb={'30px'} w={'30%'}>
        <Select
          value={{
            value: standardMedication?.id,
            label: standardMedication?.tradeName,
          }}
          options={medicationOptions}
          onChange={(newValue) => {
            setStandardMedication(idToMedication(newValue!.value!));
          }}
        />
      </FormControl>
      <Box
        w={'100%'}
        borderBottom={'1px'}
        borderBottomColor={'gray.300'}
        m={'0px 10px 30px 0px'}
      >
        <Text color={'gray.600'} mb={'5px'} fontSize={'xl'}>
          Recommended Vaccine
        </Text>
      </Box>
      {standardMedication && (
        <Box>
          <HStack mb={'30px'} spacing={'20px'} w={'100%'}>
            <Flex flexDirection={'column'} w={'100%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Manufacturer
              </Text>
              <Editable
                defaultValue={
                  idToOrganization(standardMedication.manufacturerId)?.name
                }
                p={'5px 10px'}
                border={'1px'}
                borderColor={'gray.200'}
                borderRadius={'5px'}
                color={'gray.500'}
                mb={'20px'}
                onChange={(value) => {
                  const organization = organizations?.find(
                    (org) => org.name === value
                  );
                  if (organization) {
                    const medicationCopy = cloneDeep(standardMedication);
                    medicationCopy.manufacturerId = organization.id;
                    setStandardMedication(medicationCopy);
                  }
                }}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Flex>

            <Flex flexDirection={'column'} w={'100%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                PZN Code
              </Text>
              <Editable
                defaultValue={standardMedication.code.coding.code}
                p={'5px 10px'}
                border={'1px'}
                borderColor={'gray.200'}
                borderRadius={'5px'}
                color={'gray.500'}
                mb={'20px'}
                onChange={(value) => {
                  const medicationCopy = cloneDeep(standardMedication);
                  medicationCopy.code.coding.code = value;
                  setStandardMedication(medicationCopy);
                }}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Flex>

            <Flex flexDirection={'column'} w={'100%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Form
              </Text>
              <Editable
                defaultValue={standardMedication.form.coding.code}
                p={'5px 10px'}
                border={'1px'}
                borderColor={'gray.200'}
                borderRadius={'5px'}
                color={'gray.500'}
                mb={'20px'}
                onChange={(value) => {
                  const medicationCopy = cloneDeep(standardMedication);
                  medicationCopy.form.coding.code = value;
                  setStandardMedication(medicationCopy);
                }}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Flex>
          </HStack>
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

          <HStack mb={'30px'} spacing={'20px'} w={'100%'}>
            <Text fontSize={'sm'} color={'gray.500'} mb={'5px'}>
              Standard Scheme
            </Text>
            <FormControl mb={'30px'} w={'30%'}>
              <Select
                value={{
                  value: standardMedication?.id,
                  label: standardMedication?.tradeName,
                }}
                options={medicationOptions}
                onChange={(newValue) => {
                  setStandardMedication(idToMedication(newValue!.value!));
                }}
              />
            </FormControl>
            <Flex flexDirection={'column'} w={'50%'}>
              <Text fontSize={'sm'} color={'gray.500'}>
                Recommended from age
              </Text>
              <NumberInput
                defaultValue={'scheme?.ageStart'} //TODO
                min={0}
                max={99}
                onChange={(value) => {
                  if (standardScheme) {
                    standardScheme.ageStart = Number(value);
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
                defaultValue={'scheme?.ageEnd'}
                min={0}
                max={99}
                onChange={(value) => {
                  if (standardScheme) {
                    standardScheme.ageEnd = Number(value);
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
        </Box>
      )}
    </Flex>
  );
};
