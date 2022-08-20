import React, { FC, useEffect, useState } from 'react';
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

export const PatientInformationWidget: FC = ({}) => {
  const params = useParams();
  const [editMode, setEditMode] = useBoolean(false);
  const [initialized, setInitialized] = useBoolean(false);

  const allCountries = Country.getAllCountries();
  const allCountryNames = allCountries.map(
    (potentialCountry) => potentialCountry.name
  );

  const { data: patientRaw } = patientApi.endpoints.getById.useQuery(
    params['patientId']!
  );
  const patient = PatientMapper.fromResource(patientRaw);

  const oldPatient = cloneDeep(patient);
  const updatedPatient = cloneDeep(patient);

  // Input field states
  const [givenName, setGivenName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [birthday, setBirthday] = useState<Date | undefined>(undefined);
  const [gender, setGender] = useState<Gender>('unknown');
  const [country, setCountry] = useState<ICountry | undefined>(undefined);
  const [state, setState] = useState<string>('');
  const [stateOptions, setStateOptions] = useState<IState[]>([]); // getStatesOfCountry(country.isoCode)

  useEffect(() => {
    if (patient && !initialized) {
      setGivenName(patient.name.given.join(' '));
      setSurname(patient.name.family);
      setBirthday(patient.birthDate!);
      setGender(patient?.gender);
      const initialCountry = allCountries.find((potentialCountry) => {
        return patient.address.countryCode === potentialCountry.isoCode;
      });
      setCountry(initialCountry);
      setState(patient?.address.state);

      setStateOptions(getStatesOfCountry(initialCountry!.isoCode!)); // getStatesOfCountry(country.isoCode)
      setInitialized.on();
    }
  }, [patient]);

  if (patient === undefined) {
    return <></>;
  }

  function editBirthday(newBirthday: string) {
    const [day, month, year] = newBirthday.split('/');
    const date = `${year}-${month}-${day}`;
    setBirthday(new Date(date));
  }

  function editCountry(newCountryName: string) {
    const newCountry: ICountry = allCountries.find(
      (potentialCountry) =>
        potentialCountry.name.toLowerCase() === newCountryName
    )!;
    setCountry(newCountry);
    const statesOfCountry = getStatesOfCountry(newCountry.isoCode);
    setState(statesOfCountry[0].name);
    setStateOptions(statesOfCountry);
  }

  function CancelEditing() {
    setGivenName(oldPatient!.name.given.join(' '));
    setSurname(oldPatient!.name.family);
    setBirthday(oldPatient!.birthDate);
    setGender(oldPatient!.gender);
    const oldCountry = allCountries.find((potentialCountry) => {
      return oldPatient!.address.countryCode === potentialCountry.isoCode;
    });
    setCountry(oldCountry);
    setState(oldPatient!.address.state);

    setStateOptions(getStatesOfCountry(oldCountry!.isoCode)); // getStatesOfCountry(country.isoCode)
  }

  function savePatientInformation() {
    // Save patient to server
    // updatedPatient!.name.given = givenName.split(' ');
    // updatedPatient!.name.family = surname;
    // updatedPatient!.birthDate = birthday!; Birthday Read-Only!
    // updatedPatient!.gender = gender; Gender Read-Only!
    // updatedPatient!.address.country = country!.name;
    // updatedPatient!.address.countryCode = country!.isoCode;
    // updatedPatient!.address.state = state;
    // updatedPatient!.address.stateCode = stateOptions.find(
    //   (stateOption) => stateOption.name === state
    // )!.isoCode;
    console.log(
      `Saving the following patient on the FHIR server: ${givenName} ${surname} ${birthday} ${gender} ${
        country?.name
      } ${country?.isoCode} ${state} ${
        stateOptions.find((stateOption) => stateOption.name === state)!.isoCode
      }`
    );
  }

  return (
    <Flex
      bg={'white'}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={'15px'}
      flexDir='column'
      h={'100%'}
      w={'100%'}
      justifyContent='space-between'
    >
      <Flex flexDirection={'row'} justifyContent='space-evenly'>
        <Flex p={2} flexDirection={'column'} w={'40%'}>
          <FormControl mt={4}>
            <FormLabel color={'gray.600'}>Given name</FormLabel>
            <Editable
              variant='flushed'
              isPreviewFocusable={editMode}
              defaultValue={givenName}
              value={givenName}
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={(value) => {
                setGivenName(value);
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
              value={birthday?.toLocaleDateString()}
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={(value) => {
                editBirthday(value);
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
              isDisabled={!editMode}
              onChange={(newValue) => {
                editCountry(newValue!.value!);
              }}
            />
          </FormControl>
        </Flex>
        <Flex p={2} flexDirection={'column'} w={'40%'}>
          <FormControl mt={4}>
            <FormLabel color={'gray.600'}>Surname</FormLabel>
            <Editable
              variant='flushed'
              isPreviewFocusable={editMode}
              value={surname}
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={(value) => {
                setSurname(value);
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
                value: gender.toString(),
                label: gender.toString(),
              }}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'unknown', label: 'Unknown' },
              ]}
              isDisabled={true}
              onChange={(newValue) => {
                setGender(newValue!.value! as Gender);
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
              isDisabled={!editMode}
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
        {!editMode && (
          <Flex
            h={'40px'}
            alignItems={'center'}
            bg={'white'}
            textColor={'green.600'}
            cursor={'pointer'}
            borderBottomRadius={'10px'}
            justifyContent={'center'}
            onClick={() => setEditMode.on()}
          >
            <FaWrench color={'black'} />
            <Text ml={'10px'} justifyContent={'flex-start'} color={'gray.600'}>
              Edit Profile
            </Text>
          </Flex>
        )}
        {editMode && (
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
              setEditMode.off();
            }}
          >
            <Box />
            <Flex flexDirection={'row'} alignItems={'center'} ml={'15px'}>
              <FaWrench color={'white'} />
              <Text ml={'10px'} justifyContent={'flex-start'} color={'white'}>
                Save Changes
              </Text>
            </Flex>
            <CloseIcon
              color={'white'}
              mr={'15px'}
              onClick={() => {
                CancelEditing();
                setEditMode.off();
              }}
            />
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
