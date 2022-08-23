import {
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
} from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { VaccinationScheme, VaccinationSchemeType } from '../../core/models';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicationId: string;
  onChange: (model: VaccinationScheme) => void;
}

const defaultVaccinationScheme = (medicationId: string): VaccinationScheme => ({
  id: uuidv4(),
  name: '',
  medicationId,
  type: 'standard',
  isPreferred: false,
  ageStart: undefined,
  ageEnd: undefined,
});

export const AddVaccinationSchemeModal = ({
  isOpen,
  onClose,
  medicationId,
  onChange,
}: ModalProps) => {
  const [vs, setVs] = useState(defaultVaccinationScheme(medicationId));

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
              value={vs.name}
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                setVs({ ...vs, name: value });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Type</FormLabel>
            <Select
              defaultValue={{
                value: 'standard',
                label: 'Normal',
              }}
              options={[
                { value: 'standard', label: 'Standard' },
                { value: 'fast', label: 'Fast' },
                { value: 'booster', label: 'Booster' },
              ]}
              onChange={(newValue) => {
                setVs({
                  ...vs,
                  type: newValue!.value as VaccinationSchemeType,
                });
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              onChange(vs);
              setVs(defaultVaccinationScheme(medicationId));
              onClose();
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setVs(defaultVaccinationScheme(medicationId));
              onClose();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
