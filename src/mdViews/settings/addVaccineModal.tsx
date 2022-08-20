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
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import Select, { OnChangeValue } from 'react-select';
import { Medication } from '../../core/models/Medication';
import {
  convertArrayToOptionArray,
  OptionType,
} from '../../core/services/util/convertArrayToOptionArray';

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
}

/*
  id: string;
  code: CodeableConcept;
  form: CodeableConcept;
  manufacturerId: string; // id refers to an Organization id
  tradeName: string;
  targetDiseaseIds: string[];
 */

export const AddVaccineModal = ({ isOpen, onClose }: ModalProps) => {
  const mapper = useMapper();

  const [vaccineCode, setVaccineCode] = useState<string | undefined>(undefined);
  const [formCode, setFormCode] = useState<string | undefined>(undefined);
  const [manufacturerName, setManufacturerName] = useState<string | undefined>(
    undefined
  );
  const [tradeName, setTradeName] = useState<string | undefined>(undefined);
  const [targetDiseaseIds, setTargetDiseaseIds] = useState<string[]>([]);

  const diseases = mapper.getAllDiseases();
  const manufacturers = mapper.getAllOrganizations();
  const targetDiseaseOptions = convertArrayToOptionArray(
    diseases.map((disease) => disease.name)
  );

  const initialRef = React.useRef(null);

  function addTargetDiseasesToDisease(
    newTargetDiseases: OnChangeValue<OptionType, true>
  ) {
    setTargetDiseaseIds(
      diseases
        .filter((disease) =>
          newTargetDiseases
            .map((newTargetDisease) => newTargetDisease.label)
            .includes(disease.name)
        )
        .map((disease) => disease.id)
    );
  }

  function saveMedication() {
    const medication = {
      code: {
        coding: { code: vaccineCode, system: 'http://hl7.org/fhir/sid/icd-10' },
      },
      form: { coding: { code: formCode, system: 'http://snomed.info/sct' } },
      manufacturerId: manufacturers.find(
        (manufacturer) => manufacturer.name === manufacturerName
      )!.id,
      tradeName: tradeName,
      targetDiseaseIds: targetDiseaseIds,
    } as unknown as Medication;
    mapper.saveMedication(medication);
  }

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
              ref={initialRef}
              placeholder=''
              onChange={(value) => setTradeName(value.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Code</FormLabel>
            <Input
              placeholder=''
              onChange={(value) => setVaccineCode(value.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Manufacturer</FormLabel>
            <Input
              placeholder=''
              isInvalid={
                !manufacturers
                  .map((manufacturer) => manufacturer.name)
                  .includes(manufacturerName || '')
              }
              onChange={(value) => {
                setManufacturerName(value.target.value);
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Form</FormLabel>
            <Input
              ref={initialRef}
              placeholder=''
              onChange={(value) => setFormCode(value.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Target Diseases</FormLabel>
            <Select
              ref={initialRef}
              isMulti
              options={targetDiseaseOptions}
              onChange={addTargetDiseasesToDisease}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              saveMedication();
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
