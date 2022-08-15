import {
  BoxProps,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
} from '@chakra-ui/react';
import React from 'react';
import {
  SCHEMETYPE,
  VaccinationScheme,
} from '../../core/models/VaccinationScheme';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import Select from 'react-select';

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
  medicationId: string;
}

export const AddVaccinationSchemeModal = ({
  isOpen,
  onClose,
  medicationId,
}: ModalProps) => {
  const mapper = useMapper();
  const vaccinationScheme = {
    name: undefined,
    type: SCHEMETYPE.NORMAL,
    isPreferred: false,
    ageStart: undefined,
    ageEnd: undefined,
    medicationId: medicationId,
  } as unknown as VaccinationScheme;
  const initialRef = React.useRef(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Vaccination Scheme</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              ref={initialRef}
              placeholder=''
              onChange={(value) =>
                (vaccinationScheme.name = value.target.value)
              }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Type</FormLabel>
            <Select
              defaultValue={{
                value: SCHEMETYPE.NORMAL,
                label: 'Normal',
              }}
              options={[
                { value: SCHEMETYPE.NORMAL, label: 'Normal' },
                { value: SCHEMETYPE.FAST, label: 'Fast' },
              ]}
              onChange={(newValue) => {
                vaccinationScheme.type = newValue!.value;
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Preferred Scheme</FormLabel>
            <Switch
              id='preferredScheme'
              mb={'15px'}
              colorScheme='green'
              size={'lg'}
              onChange={() =>
                (vaccinationScheme.isPreferred = !vaccinationScheme.isPreferred)
              }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Minimum Age</FormLabel>
            <Input
              placeholder=''
              onChange={(value) =>
                (vaccinationScheme.ageStart = Number(value.target.value))
              }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Maximum Age</FormLabel>
            <Input
              placeholder=''
              onChange={(value) =>
                (vaccinationScheme.ageEnd = Number(value.target.value))
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              mapper.saveVaccinationScheme(vaccinationScheme);
              onClose();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
