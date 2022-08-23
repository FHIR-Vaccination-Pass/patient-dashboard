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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { Medication, MedicationMapper } from '../../core/models';
import { medicationApi } from '../../core/services/redux/fhir';
import { useOrganizations, useTargetDiseases } from '../../hooks';

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const defaultVaccine = (): Medication => ({
  id: uuidv4(),
  code: { coding: { system: 'http://fhir.de/CodeSystem/ifa/pzn', code: '' } },
  form: { coding: { system: 'http://snomed.info/sct', code: '' } },
  manufacturerId: '',
  tradeName: '',
  targetDiseaseCodes: [],
});

export const AddVaccineModal = ({ isOpen, onClose }: ModalProps) => {
  const { organizations, idToOrganization } = useOrganizations({});
  const {
    data: targetDiseasesData,
    targetDiseases,
    idToTargetDisease,
  } = useTargetDiseases({});

  const [postMed] = medicationApi.endpoints.post.useMutation();
  const [med, setMed] = useState(defaultVaccine());

  const selectedOrganization = idToOrganization(med.manufacturerId);
  const organizationOptions =
    organizations?.map(({ id, name }) => ({ value: id, label: name })) ?? [];

  const selectedTargetDiseases =
    (targetDiseasesData &&
      med.targetDiseaseCodes
        .flatMap((tdCode) => targetDiseasesData.byCode[tdCode]?.ids ?? [])
        .map((tdId) => idToTargetDisease(tdId)!)) ??
    [];
  const targetDiseaseOptions = targetDiseases?.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Vaccine</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Trade Name</FormLabel>
            <Input
              value={med.tradeName}
              onChange={({ target: { value } }) => {
                setMed({ ...med, tradeName: value });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Code</FormLabel>
            <Input
              value={med.code.coding.code}
              onChange={({ target: { value } }) => {
                setMed({
                  ...med,
                  code: {
                    ...med.code,
                    coding: { ...med.code.coding, code: value },
                  },
                });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Manufacturer</FormLabel>
            <Select
              options={organizationOptions}
              value={
                selectedOrganization
                  ? {
                      value: selectedOrganization.id,
                      label: selectedOrganization.name,
                    }
                  : {
                      value: '',
                      label: 'Manufacturer',
                    }
              }
              onChange={(newValue) => {
                setMed({ ...med, manufacturerId: newValue!.value });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Form</FormLabel>
            <Input
              value={med.form.coding.code}
              onChange={({ target: { value } }) => {
                setMed({
                  ...med,
                  form: {
                    ...med.form,
                    coding: { ...med.form.coding, code: value },
                  },
                });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Target Diseases</FormLabel>
            <Select
              isMulti
              options={targetDiseaseOptions}
              value={selectedTargetDiseases.map(({ id, name }) => ({
                value: id,
                label: name,
              }))}
              onChange={(newValues) => {
                setMed({
                  ...med,
                  targetDiseaseCodes: newValues.map(
                    ({ value }) => idToTargetDisease(value)!.code.coding.code
                  ),
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
              postMed(MedicationMapper.fromModel(med).toResource());
              setMed(defaultVaccine());
              onClose();
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setMed(defaultVaccine());
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
