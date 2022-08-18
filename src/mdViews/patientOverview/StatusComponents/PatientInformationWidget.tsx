import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Text,
  Flex,
  useBoolean,
  FormLabel,
  FormControl,
  Editable,
  EditablePreview,
  EditableInput,
  Divider,
  Box,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { convertArrayToOptionArray } from '../../settings/vaccineInformationCard';
import { Country } from 'country-state-city';
import { getStatesOfCountry } from 'country-state-city/dist/lib/state';
import { Gender, PatientMapper } from '../../../core/models';
import { CloseIcon } from '@chakra-ui/icons';
import { FaWrench } from 'react-icons/fa';
import { ICountry, IState } from 'country-state-city/dist/lib/interface';
import { cloneDeep } from 'lodash';
import { patientApi } from '../../../core/services/redux/fhir/patientApi';

export const PatientInformationWidget: FC = () => {
  const params = useParams();

  const allCountries = Country.getAllCountries();
  const allCountryNames = allCountries.map(
    (potentialCountry) => potentialCountry.name
  );

  const { data: patientRaw } = patientApi.endpoints.getById.useQuery(
    params['patientId']!
  );
  const [putPatient] = patientApi.endpoints.put.useMutation();
  const patient = PatientMapper.fromResource(patientRaw);

  const [updatedPatient, setUpdatedPatient] = useState<
    PatientMapper | undefined
  >(undefined);

  const toggleEditMode = useCallback(() => {
    if (updatedPatient === undefined) {
      setUpdatedPatient(cloneDeep(patient));
    } else {
      setUpdatedPatient(undefined);
    }
  }, [patient, updatedPatient]);

  // Input field states

  const [country, setCountry] = useState<ICountry | undefined>(undefined);
  const [state, setState] = useState<string>('');
  const [stateOptions, setStateOptions] = useState<IState[]>([]); // getStatesOfCountry(country.isoCode)

  // useEffect(() => {
  //   if (patient) {
  //     const initialCountry = allCountries.find((potentialCountry) => {
  //       return patient.address.countryCode === potentialCountry.isoCode;
  //     });
  //     setCountry(initialCountry);
  //     setState(patient?.address.state);
  //
  //     setStateOptions(getStatesOfCountry(initialCountry!.isoCode!)); // getStatesOfCountry(country.isoCode)
  //   }
  // }, [patient]);

  // function editCountry(newCountryName: string) {
  //   const newCountry: ICountry = allCountries.find(
  //     (potentialCountry) =>
  //       potentialCountry.name.toLowerCase() === newCountryName
  //   )!;
  //   const statesOfCountry = getStatesOfCountry(newCountry.isoCode);
  //
  //   const newPatient = cloneDeep(updatedPatient!);
  //
  //   setCountry(newCountry);
  //   setState(statesOfCountry[0].name);
  //
  //   setStateOptions(statesOfCountry);
  // }

  function savePatientInformation() {
    if (updatedPatient !== undefined) {
      console.log(
        `Saving the following patient on the FHIR server: ${
          updatedPatient.name.given[0]
        } ${
          updatedPatient.name.family
        } ${updatedPatient?.birthDate.toISOString()} ${updatedPatient?.gender}`
      );
      putPatient(updatedPatient.toResource());
    }
  }

  if (patient === undefined) {
    return <></>;
  }

  return (
    <Flex
      bg={'white'}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={'15px'}
      flexDir='column'
      justifyContent='space-between'
      h={'100%'}
      w={'100%'}
    >
      <Flex flexDirection={'row'}>
        <Flex m={'0px 60px'} flexDirection={'column'} w={'40%'}>
          <FormControl mt={4}>
            <FormLabel color={'gray.600'}>Given name</FormLabel>
            <Editable
              variant='flushed'
              isPreviewFocusable={updatedPatient !== undefined}
              defaultValue={
                updatedPatient
                  ? updatedPatient.name.given[0]
                  : patient.name.given[0]
              }
              value={
                updatedPatient
                  ? updatedPatient.name.given[0]
                  : patient.name.given[0]
              }
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={(value) => {
                setUpdatedPatient(
                  updatedPatient!.withName(
                    updatedPatient!.name.withGiven([value])
                  )
                );
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color={'gray.600'}>Birthday</FormLabel>
            <Editable
              variant='flushed'
              isPreviewFocusable={false}
              value={
                updatedPatient
                  ? updatedPatient.birthDate.toLocaleDateString()
                  : patient.birthDate.toLocaleString()
              }
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={(value) => {
                const [day, month, year] = value.split('/');
                const birthDate = new Date(`${year}-${month}-${day}`);

                setUpdatedPatient(updatedPatient!.withBirthDate(birthDate));
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color={'gray.600'}>Country</FormLabel>
            <Select
              value={{
                value: country?.name.toLowerCase(),
                label: country?.name,
              }}
              options={convertArrayToOptionArray(allCountryNames)}
              isDisabled={updatedPatient === undefined}
              onChange={(newValue) => {
                // editCountry(newValue!.value!);
              }}
            />
          </FormControl>
        </Flex>
        <Flex ml={'20px'} flexDirection={'column'} w={'40%'}>
          <FormControl mt={4}>
            <FormLabel color={'gray.600'}>Surname</FormLabel>
            <Editable
              variant='flushed'
              isPreviewFocusable={updatedPatient !== undefined}
              value={
                updatedPatient
                  ? updatedPatient.name.family
                  : patient.name.family
              }
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={(value) => {
                setUpdatedPatient(
                  updatedPatient!.withName(
                    updatedPatient!.name.withFamily(value)
                  )
                );
              }}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </FormControl>

          <FormControl mt={4} mb={'23px'}>
            <FormLabel color={'gray.600'}>Gender</FormLabel>
            <Select
              value={{
                value: (updatedPatient
                  ? updatedPatient.gender
                  : patient.gender) as string,
                label: (updatedPatient
                  ? updatedPatient.gender
                  : patient.gender) as string,
              }}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'unknown', label: 'Unknown' },
              ]}
              isDisabled={true}
              onChange={(newValue) => {
                setUpdatedPatient(
                  updatedPatient!.withGender(newValue!.value as Gender)
                );
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel color={'gray.600'}>State</FormLabel>
            <Select
              value={{
                value: state,
                label: state,
              }}
              isDisabled={updatedPatient === undefined}
              options={convertArrayToOptionArray(
                stateOptions.map((stateOption) => stateOption.name)
              )}
              onChange={(newValue) => {
                setState(newValue!.label!);
              }}
            />
          </FormControl>
        </Flex>
      </Flex>
      <Box>
        <Divider orientation='horizontal' mt={'5px'} />
        {updatedPatient === undefined && (
          <Flex
            h={'40px'}
            alignItems={'center'}
            bg={'white'}
            textColor={'green.600'}
            cursor={'pointer'}
            borderBottomRadius={'10px'}
            justifyContent={'center'}
            onClick={toggleEditMode}
          >
            <FaWrench color={'black'} />
            <Text ml={'10px'} justifyContent={'flex-start'} color={'gray.600'}>
              Edit Profile
            </Text>
          </Flex>
        )}
        {updatedPatient !== undefined && (
          <Flex
            h={'40px'}
            alignItems={'center'}
            bg={'green.400'}
            textColor={'green.600'}
            cursor={'pointer'}
            borderBottomRadius={'10px'}
            justifyContent={'space-between'}
            onClick={() => {
              savePatientInformation();
              toggleEditMode();
            }}
          >
            <Box />
            <Flex flexDirection={'row'} alignItems={'center'} ml={'15px'}>
              <FaWrench color={'white'} />
              <Text ml={'10px'} justifyContent={'flex-start'} color={'white'}>
                Save Changes
              </Text>
            </Flex>
            <CloseIcon color={'white'} mr={'15px'} onClick={toggleEditMode} />
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
