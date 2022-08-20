import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Flex,
  FormLabel,
  FormControl,
  Button,
  ButtonGroup,
  Input,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Select, { SingleValue } from 'react-select';
import { Country, State } from 'country-state-city';
import { Gender, PatientMapper } from '../../../core/models';
import { CloseIcon } from '@chakra-ui/icons';
import { FaWrench } from 'react-icons/fa';
import { cloneDeep } from 'lodash';
import { patientApi } from '../../../core/services/redux/fhir';

export const PatientInformationWidget: FC = () => {
  const params = useParams();

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

  const currentResource = useMemo((): PatientMapper | undefined => {
    if (editMode) {
      return updatedPatient;
    } else if (getIsFetching || putIsLoading) {
      return updatedPatient;
    } else {
      return patient;
    }
  }, [editMode, getIsFetching, putIsLoading, patient, updatedPatient]);

  const givenName = useMemo(
    (): string | undefined => currentResource?.name.given[0],
    [currentResource]
  );
  const setGivenName = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
      setUpdatedPatient(
        updatedPatient!.withName(updatedPatient!.name.withGiven([value]))
      );
    },
    [updatedPatient]
  );

  const familyName = useMemo(
    (): string | undefined => currentResource?.name.family,
    [currentResource]
  );
  const setFamilyName = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => {
      setUpdatedPatient(
        updatedPatient!.withName(updatedPatient!.name.withFamily(value))
      );
    },
    [updatedPatient]
  );

  const birthDate = useMemo(
    () => currentResource?.birthDate.toLocaleDateString(),
    [currentResource]
  );
  const setBirthDate = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const [day, month, year] = value.split('/');
      const birthDate = new Date(`${year}-${month}-${day}`);

      setUpdatedPatient(updatedPatient!.withBirthDate(birthDate));
    },
    [updatedPatient]
  );

  const gender = useMemo(():
    | SingleValue<{ value: string; label: string }>
    | undefined => {
    const value = currentResource?.gender;
    if (value === undefined) {
      return undefined;
    }

    const label = value.slice(0, 1).toUpperCase() + value.slice(1);
    return { value, label };
  }, [currentResource]);
  const setGender = useCallback(
    (value: SingleValue<{ value: string; label: string }>): void => {
      setUpdatedPatient(updatedPatient!.withGender(value!.value as Gender));
    },
    [updatedPatient]
  );

  const country = useMemo(():
    | SingleValue<{ value: string; label: string }>
    | undefined => {
    const value = currentResource?.address.countryCode;
    if (value === undefined) {
      return undefined;
    }

    const label = Country.getCountryByCode(value)!.name;
    return { value, label };
  }, [currentResource]);
  const setCountry = useCallback(
    (value: SingleValue<{ value: string; label: string }>): void => {
      let state: string;
      let stateCode: string;

      // Default to first value in state list if a new country is selected
      if (updatedPatient!.address.countryCode === value!.value) {
        state = updatedPatient!.address.state;
        stateCode = updatedPatient!.address.stateCode;
      } else {
        const stateObj = State.getStatesOfCountry(value!.value)![0];
        state = stateObj.name;
        stateCode = `${stateObj.countryCode}-${stateObj.isoCode}`;
      }

      setUpdatedPatient(
        updatedPatient!.withAddress(
          updatedPatient!.address
            .withCountry(value!.label)
            .withCountryCode(value!.value)
            .withState(state)
            .withStateCode(stateCode)
        )
      );
    },
    [updatedPatient]
  );

  const state = useMemo(():
    | SingleValue<{ value: string; label: string }>
    | undefined => {
    const value = currentResource?.address.stateCode;
    if (value === undefined) {
      return undefined;
    }

    const [countryCode, stateCode] = value.split('-');
    const label = State.getStateByCodeAndCountry(stateCode, countryCode)!.name;
    return { value, label };
  }, [currentResource]);
  const setState = useCallback(
    (value: SingleValue<{ value: string; label: string }>): void => {
      setUpdatedPatient(
        updatedPatient!.withAddress(
          updatedPatient!.address
            .withState(value!.label)
            .withStateCode(value!.value)
        )
      );
    },
    [updatedPatient]
  );

  const countrySelectOptions = useMemo(
    () =>
      Country.getAllCountries().map(({ isoCode, name }) => ({
        value: isoCode,
        label: name,
      })),
    []
  );
  const stateSelectOptions = useMemo(() => {
    return (
      currentResource &&
      State.getStatesOfCountry(currentResource.address.countryCode).map(
        ({ countryCode, isoCode, name }) => ({
          value: `${countryCode}-${isoCode}`,
          label: name,
        })
      )
    );
  }, [currentResource]);

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

  const paddingY = '12px';
  const paddingX = '16px';
  const formControlWidth = '50%';

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
      <Flex flexDirection={'row'} flexWrap={'wrap'} p={'12px'}>
        <FormControl
          pt={paddingY}
          pb={paddingY}
          pl={paddingX}
          pr={paddingX}
          width={formControlWidth}
        >
          <FormLabel color={'gray.600'}>Given name</FormLabel>
          <Input
            variant='flushed'
            value={givenName}
            p={'5px 10px'}
            borderBottom={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'20px'}
            pl={'5px'}
            onChange={setGivenName}
          />
        </FormControl>
        <FormControl
          pt={paddingY}
          pb={paddingY}
          pl={paddingX}
          pr={paddingX}
          width={formControlWidth}
        >
          <FormLabel color={'gray.600'}>Surname</FormLabel>
          <Input
            variant='flushed'
            value={familyName}
            p={'5px 10px'}
            borderBottom={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'20px'}
            pl={'5px'}
            onChange={setFamilyName}
          />
        </FormControl>
        <FormControl
          pt={paddingY}
          pb={paddingY}
          pl={paddingX}
          pr={paddingX}
          width={formControlWidth}
        >
          <FormLabel color={'gray.600'}>Birthday</FormLabel>
          <Input
            variant='flushed'
            value={birthDate}
            p={'5px 10px'}
            borderBottom={'1px'}
            borderColor={'gray.200'}
            borderRadius={'5px'}
            color={'gray.500'}
            mb={'20px'}
            pl={'5px'}
            onChange={setBirthDate}
          />
        </FormControl>
        <FormControl
          pt={paddingY}
          pb={paddingY}
          pl={paddingX}
          pr={paddingX}
          width={formControlWidth}
        >
          <FormLabel color={'gray.600'}>Gender</FormLabel>
          <Select
            value={gender}
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
        <FormControl
          pt={paddingY}
          pb={paddingY}
          pl={paddingX}
          pr={paddingX}
          width={formControlWidth}
        >
          <FormLabel color={'gray.600'}>Country</FormLabel>
          <Select
            value={country}
            options={countrySelectOptions}
            isDisabled={!editMode}
            onChange={setCountry}
          />
        </FormControl>
        <FormControl
          pt={paddingY}
          pb={paddingY}
          pl={paddingX}
          pr={paddingX}
          width={formControlWidth}
        >
          <FormLabel color={'gray.600'}>State</FormLabel>
          <Select
            value={state}
            isDisabled={!editMode}
            options={stateSelectOptions}
            onChange={setState}
          />
        </FormControl>
      </Flex>
      {editMode ? (
        <ButtonGroup isAttached={true} w={'100%'}>
          <Button
            isLoading={getIsFetching || putIsLoading}
            colorScheme={'green'}
            leftIcon={<FaWrench color={'white'} />}
            flexGrow={1}
            onClick={() => {
              savePatientInformation();
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
          w={'100%'}
          onClick={toggleEditMode}
          leftIcon={<FaWrench color={'black'} />}
        >
          Edit Profile
        </Button>
      )}
    </Flex>
  );
};
