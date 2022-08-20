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
  Spinner,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { convertArrayToOptionArray } from '../../settings/vaccineInformationCard';
import { Country } from 'country-state-city';
import { getStatesOfCountry } from 'country-state-city/dist/lib/state';
import { Gender, PatientMapper } from '../../../core/models';
import { CloseIcon } from '@chakra-ui/icons';
import { FaWrench } from 'react-icons/fa';
import { ICountry, IState } from 'country-state-city/dist/lib/interface';
import { cloneDeep } from 'lodash';
import { patientApi } from '../../../core/services/redux/fhir';

export const PatientInformationWidget: FC = () => {
  const params = useParams();

  const allCountries = Country.getAllCountries();
  const allCountryNames = allCountries.map(
    (potentialCountry) => potentialCountry.name
  );

  const { data: patientRaw, isFetching: getIsFetching } =
    patientApi.endpoints.getById.useQuery(params['patientId']!);
  const [putPatient, { isLoading: putIsLoading }] =
    patientApi.endpoints.put.useMutation();
  const patient = PatientMapper.fromResource(patientRaw);

  const [updatedPatient, setUpdatedPatient] = useState<
    PatientMapper | undefined
  >(patient && cloneDeep(patient));
  const [editMode, setEditMode] = useState<boolean>(false);
  const [toggleEditModeRequested, setToggleEditModeRequested] = useState(false);

  const toggleEditMode = useCallback(() => {
    setToggleEditModeRequested(!toggleEditModeRequested);
  }, [toggleEditModeRequested]);

  useEffect(() => {
    if (!toggleEditModeRequested || getIsFetching || putIsLoading) {
      return;
    }

    if (editMode) {
      setEditMode(false);
    } else {
      setUpdatedPatient(cloneDeep(patient));
      setEditMode(true);
    }

    setToggleEditModeRequested(false);
  }, [
    editMode,
    toggleEditModeRequested,
    getIsFetching,
    putIsLoading,
    patient,
    updatedPatient,
  ]);

  // Input field states

  const [country, setCountry] = useState<ICountry | undefined>(undefined);
  const [state, setState] = useState<string>('');
  const [stateOptions, setStateOptions] = useState<IState[]>([]); // getStatesOfCountry(country.isoCode)

  const getCurrentResource = (): PatientMapper | undefined => {
    if (editMode) {
      return updatedPatient;
    } else if (getIsFetching || putIsLoading) {
      return updatedPatient;
    } else {
      return patient;
    }
  };

  const getGivenName = (): string => getCurrentResource()!.name.given[0];
  const setGivenName = useCallback(
    (value: string): void => {
      setUpdatedPatient(
        updatedPatient!.withName(updatedPatient!.name.withGiven([value]))
      );
    },
    [updatedPatient]
  );

  const getFamilyName = (): string => getCurrentResource()!.name.family;
  const setFamilyName = useCallback(
    (value: string): void => {
      setUpdatedPatient(
        updatedPatient!.withName(updatedPatient!.name.withFamily(value))
      );
    },
    [updatedPatient]
  );

  const getBirthDate = (): string =>
    getCurrentResource()!.birthDate.toLocaleDateString();
  const setBirthDate = useCallback(
    (value: string) => {
      const [day, month, year] = value.split('/');
      const birthDate = new Date(`${year}-${month}-${day}`);

      setUpdatedPatient(updatedPatient!.withBirthDate(birthDate));
    },
    [updatedPatient]
  );

  const getGender = (): SingleValue<{ value: string; label: string }> => {
    const value = getCurrentResource()!.gender as string;
    const label = value.slice(0, 1).toUpperCase() + value.slice(1);
    return { value, label };
  };
  const setGender = useCallback(
    (value: SingleValue<{ value: string; label: string }>): void => {
      setUpdatedPatient(updatedPatient!.withGender(value!.value as Gender));
    },
    [updatedPatient]
  );
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
              isPreviewFocusable={editMode}
              defaultValue={getGivenName()}
              value={getGivenName()}
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={setGivenName}
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
              value={getBirthDate()}
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={setBirthDate}
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
              isPreviewFocusable={editMode}
              value={getFamilyName()}
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
              pl={'5px'}
              onChange={setFamilyName}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </FormControl>

          <FormControl mt={4} mb={'23px'}>
            <FormLabel color={'gray.600'}>Gender</FormLabel>
            <Select
              value={getGender()}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'unknown', label: 'Unknown' },
              ]}
              isDisabled={!editMode}
              onChange={setGender}
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
            onClick={toggleEditMode}
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
              if (getIsFetching || putIsLoading) {
                return;
              }

              savePatientInformation();
              toggleEditMode();
            }}
          >
            <Box />
            <Flex flexDirection={'row'} alignItems={'center'} ml={'15px'}>
              {getIsFetching || putIsLoading ? (
                <Spinner />
              ) : (
                <>
                  <FaWrench color={'white'} />
                  <Text
                    ml={'10px'}
                    justifyContent={'flex-start'}
                    color={'white'}
                  >
                    Save Changes
                  </Text>
                </>
              )}
            </Flex>
            <CloseIcon color={'white'} mr={'15px'} onClick={toggleEditMode} />
          </Flex>
        )}
      </Box>
    </Flex>
  );
};
