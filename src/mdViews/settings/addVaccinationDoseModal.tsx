import {
  Box,
  Button,
  Flex,
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
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import {
  AgeUnit,
  VaccinationDoseRepeating,
  VaccinationDoseSingle,
} from '../../core/models';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  vaccinationSchemeId: string;
  onChange: (model: VaccinationDoseSingle | VaccinationDoseRepeating) => void;
}

type DoseType = 'single' | 'repeating';

const defaultSingleDose = (
  vaccinationSchemeId: string
): VaccinationDoseSingle => ({
  type: 'single',
  id: uuidv4(),
  vaccinationSchemeId,
  doseQuantity: 0,
  isProtected: false,
  notes: 'Note',
  numberInScheme: 1,
  timeframeStart: 0,
  timeframeEnd: 0,
});

const defaultRepeatingDose = (
  vaccinationSchemeId: string
): VaccinationDoseRepeating => ({
  type: 'repeating',
  id: uuidv4(),
  vaccinationSchemeId,
  doseQuantity: 0,
  isProtected: false,
  notes: 'Note',
  interval: {
    value: 0,
    code: 'd',
  },
});

export const AddVaccinationDoseModal = ({
  isOpen,
  onClose,
  vaccinationSchemeId,
  onChange,
}: ModalProps) => {
  const [doseType, setDoseType] = useState<DoseType>('single');
  const [singleDose, setSingleDose] = useState(
    defaultSingleDose(vaccinationSchemeId)
  );
  const [repeatingDose, setRepeatingDose] = useState(
    defaultRepeatingDose(vaccinationSchemeId)
  );
  const currentDose = useMemo(
    () => (doseType === 'single' ? singleDose : repeatingDose),
    [doseType, singleDose, repeatingDose]
  );
  const setCurrentDose = useCallback(
    (dose: VaccinationDoseSingle | VaccinationDoseRepeating): void => {
      if (doseType === 'single') {
        setSingleDose(dose as VaccinationDoseSingle);
      } else {
        setRepeatingDose(dose as VaccinationDoseRepeating);
      }
    },
    [doseType, setSingleDose, setRepeatingDose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Vaccination Dose</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select
              value={{
                value: doseType,
                label: doseType.slice(0, 1).toUpperCase() + doseType.slice(1),
              }}
              options={[
                { value: 'single', label: 'Single' },
                { value: 'repeating', label: 'Repeating' },
              ]}
              onChange={(newValue) => {
                setDoseType(newValue!.value);
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Dose Quantity</FormLabel>
            <Input
              type={'number'}
              step={0.01}
              value={currentDose.doseQuantity}
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                setCurrentDose({ ...currentDose, doseQuantity: Number(value) });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Notes</FormLabel>
            <Input
              value={currentDose.notes}
              onChange={({
                target: { value },
              }: ChangeEvent<HTMLInputElement>) => {
                setCurrentDose({ ...currentDose, notes: value });
              }}
            />
          </FormControl>

          {doseType === 'single' && (
            <>
              <FormControl mt={4}>
                <FormLabel>Dose Number</FormLabel>
                <Input
                  type={'number'}
                  min={1}
                  value={singleDose.numberInScheme}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    setSingleDose({
                      ...singleDose,
                      numberInScheme: Number(value),
                    });
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Timeframe Start (d)</FormLabel>
                <Input
                  type={'number'}
                  min={0}
                  max={singleDose.timeframeEnd}
                  value={singleDose.timeframeStart ?? ''}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    setSingleDose({
                      ...singleDose,
                      timeframeStart: Number(value) || undefined,
                    });
                  }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Timeframe End (d)</FormLabel>
                <Input
                  type={'number'}
                  min={singleDose.timeframeStart}
                  value={singleDose.timeframeEnd ?? ''}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    setSingleDose({
                      ...singleDose,
                      timeframeEnd: Number(value) || undefined,
                    });
                  }}
                />
              </FormControl>
            </>
          )}

          {doseType === 'repeating' && (
            <Flex flexDirection={'row'}>
              <FormControl mt={4} mr={3}>
                <FormLabel alignSelf={'flex-start'}>Interval</FormLabel>
                <Input
                  type={'number'}
                  min={0}
                  value={repeatingDose.interval.value}
                  onChange={({
                    target: { value },
                  }: ChangeEvent<HTMLInputElement>) => {
                    setRepeatingDose({
                      ...repeatingDose,
                      interval: {
                        ...repeatingDose.interval,
                        value: Number(value),
                      },
                    });
                  }}
                />
              </FormControl>
              <Box alignSelf={'flex-end'} w={'100px'} h={'40px'}>
                <Select
                  value={{ value: 'd', label: 'D' }}
                  options={[{ value: 'd', label: 'D' }]}
                  onChange={(newValue) => {
                    setRepeatingDose({
                      ...repeatingDose,
                      interval: {
                        ...repeatingDose.interval,
                        code: newValue!.value as AgeUnit,
                      },
                    });
                  }}
                />
              </Box>
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              onChange(currentDose);
              setSingleDose(defaultSingleDose(vaccinationSchemeId));
              setRepeatingDose(defaultRepeatingDose(vaccinationSchemeId));
              onClose();
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setSingleDose(defaultSingleDose(vaccinationSchemeId));
              setRepeatingDose(defaultRepeatingDose(vaccinationSchemeId));
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
