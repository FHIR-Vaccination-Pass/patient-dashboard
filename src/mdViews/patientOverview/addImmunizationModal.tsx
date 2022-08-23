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
import React, { ChangeEvent, FC, useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import {
  Immunization,
  ImmunizationMapper,
  VaccinationSchemeMapper,
} from '../../core/models';
import {
  useMedications,
  usePractitioners,
  useVaccinationDoses,
  useVaccinationSchemes,
} from '../../hooks';
import { immunizationApi } from '../../core/services/redux/fhir';
import dayjs from 'dayjs';

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
}

const defaultImmunization = (patientId: string): Immunization => ({
  id: uuidv4(),
  patientId,
  status: 'completed',
  vaccineCode: {
    coding: { system: 'http://fhir.de/CodeSystem/ifa/pzn', code: '' },
  },
  occurrenceTime: new Date(),
  lotNumber: '',
  performerId: '',
  vaccinationDoseId: '',
});

export const AddImmunizationModal: FC<ModalProps> = ({
  isOpen,
  onClose,
  patientId,
}) => {
  const {
    medications,
    data: medicationsData,
    idToMedication,
  } = useMedications({});
  const { practitioners, idToPractitioner } = usePractitioners({});

  const { data: vsData, idToVaccinationScheme } = useVaccinationSchemes({});
  const { data: dosesData, idToVaccinationDose } = useVaccinationDoses({});

  const [postImm] = immunizationApi.endpoints.post.useMutation();
  const [imm, setImm] = useState(defaultImmunization(patientId));

  const selectedPractitioner = idToPractitioner(imm.performerId);
  const practitionerOptions = practitioners?.map(({ id, name }) => ({
    value: id,
    label: `${name.given[0]} ${name.family}`,
  }));

  const selectedMedication = idToMedication(
    medicationsData?.byCode[imm.vaccineCode.coding.code]?.ids[0]
  );
  const medicationOptions =
    medications?.map(({ code, tradeName }) => ({
      value: code.coding.code,
      label: tradeName,
    })) ?? [];

  const [selectedVs, setSelectedVs] = useState<
    VaccinationSchemeMapper | undefined
  >(undefined);
  const vsOptions = selectedMedication
    ? vsData?.byMedication[selectedMedication.id]?.ids
        .map((vsId) => idToVaccinationScheme(vsId)!)
        .map(({ id, name }) => ({ value: id, label: name })) ?? []
    : [];

  const selectedDose = idToVaccinationDose(imm.vaccinationDoseId);
  const doseOptions = selectedVs
    ? dosesData?.byVaccinationScheme[selectedVs.id]?.ids
        .map((doseId) => idToVaccinationDose(doseId)!)
        .map((dose) => ({
          value: dose.id,
          label: dose.type === 'single' ? dose.numberInScheme : 'Booster',
        })) ?? []
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Immunization</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Practitioner</FormLabel>
            <Select
              options={practitionerOptions}
              value={
                selectedPractitioner
                  ? {
                      value: selectedPractitioner.id,
                      label: `${selectedPractitioner.name.given[0]} ${selectedPractitioner.name.family}`,
                    }
                  : {
                      value: '',
                      label: 'Practitioner',
                    }
              }
              onChange={(newValue) => {
                setImm({
                  ...imm,
                  performerId: newValue!.value,
                });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Occurrence Time</FormLabel>
            <Input
              variant='flushed'
              type={'date'}
              value={dayjs(imm.occurrenceTime).format('YYYY-MM-DD')}
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                setImm({ ...imm, occurrenceTime: new Date(value) });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Medication</FormLabel>
            <Select
              options={medicationOptions}
              value={
                selectedMedication
                  ? {
                      value: selectedMedication.code.coding.code,
                      label: selectedMedication.tradeName,
                    }
                  : {
                      value: '',
                      label: 'Medication',
                    }
              }
              onChange={(newValue) => {
                setImm({
                  ...imm,
                  vaccineCode: {
                    ...imm.vaccineCode,
                    coding: {
                      ...imm.vaccineCode.coding,
                      code: newValue!.value,
                    },
                  },
                });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Lot Number</FormLabel>
            <Input
              value={imm.lotNumber}
              onChange={({ target: { value } }) => {
                setImm({ ...imm, lotNumber: value });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Scheme</FormLabel>
            <Select
              options={vsOptions}
              value={
                selectedVs
                  ? {
                      value: selectedVs.id,
                      label: selectedVs.name,
                    }
                  : {
                      value: '',
                      label: 'Scheme',
                    }
              }
              isDisabled={selectedMedication === undefined}
              onChange={(newValue) => {
                setSelectedVs(idToVaccinationScheme(newValue!.value));
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Dose</FormLabel>
            <Select
              options={doseOptions}
              value={
                selectedDose
                  ? {
                      value: selectedDose.id,
                      label:
                        selectedDose.type === 'single'
                          ? selectedDose.numberInScheme
                          : 'Booster',
                    }
                  : {
                      value: '',
                      label: 'Dose',
                    }
              }
              isDisabled={selectedVs === undefined}
              onChange={(newValue) => {
                setImm({ ...imm, vaccinationDoseId: newValue!.value });
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              postImm(ImmunizationMapper.fromModel(imm).toResource());
              setImm(defaultImmunization(patientId));
              onClose();
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setImm(defaultImmunization(patientId));
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
