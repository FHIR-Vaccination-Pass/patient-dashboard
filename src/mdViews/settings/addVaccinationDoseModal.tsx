import {
  Box,
  BoxProps,
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
import React, { useState } from 'react';
import {
  INTERVAL,
  VaccinationDoseRepeating,
  VaccinationDoseSingle,
} from '../../core/models/VaccinationDose';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
  vaccinationSchemeId: string;
}

enum DOSETYPE {
  SINGLE = 'single',
  REPEATING = 'repeating',
}

/*
  doseQuantity: number;
  isProtected: boolean;
  notes: string;
  vaccinationSchemeId: string;

  SINGLE:
  numberInScheme: number;
  timeStart: Date;
  timeEnd: Date;

  REPEATING:
  interval: { value: { value: number; code: INTERVAL } };
 */

export const AddVaccinationDoseModal = ({
  isOpen,
  onClose,
  vaccinationSchemeId,
}: ModalProps) => {
  const mapper = useMapper();
  const [doseType, setDoseType] = useState<DOSETYPE>(DOSETYPE.SINGLE);

  const [doseQuantity, setDoseQuantity] = useState<number | undefined>(
    undefined
  );
  const [notes, setNotes] = useState<string | undefined>(undefined);

  // Repeating dose
  const [intervalValue, setIntervalValue] = useState<number | undefined>(
    undefined
  );
  const [intervalCode, setIntervalCode] = useState<INTERVAL>(INTERVAL.M);

  // Single dose
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberInScheme, setNumberInScheme] = useState<number | undefined>(
    undefined
  );

  const initialRef = React.useRef(null);
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
              ref={initialRef}
              defaultValue={{
                value: DOSETYPE.SINGLE,
                label: 'Single',
              }}
              options={[
                { value: DOSETYPE.SINGLE, label: 'Single' },
                { value: DOSETYPE.REPEATING, label: 'Repeating' },
              ]}
              onChange={(newValue) => {
                setDoseType(newValue!.value);
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Dose Quantity</FormLabel>
            <Input
              placeholder=''
              onChange={(value) => {
                setDoseQuantity(Number(value.target.value));
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Notes</FormLabel>
            <Input
              placeholder=''
              onChange={(value) => {
                setNotes(value.target.value);
              }}
            />
          </FormControl>

          {doseType === DOSETYPE.SINGLE && (
            <>
              <FormControl mt={4}>
                <FormLabel>Dose Number</FormLabel>
                <Input
                  placeholder=''
                  onChange={(value) => {
                    setNumberInScheme(Number(value.target.value));
                  }}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Time Start</FormLabel>
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Time End</FormLabel>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                />
              </FormControl>
            </>
          )}

          {doseType === DOSETYPE.REPEATING && (
            <Flex flexDirection={'row'}>
              <FormControl mt={4} mr={3}>
                <FormLabel alignSelf={'flex-start'}>Interval</FormLabel>
                <Input
                  alignSelf={'flex-end'}
                  placeholder=''
                  onChange={(value) =>
                    setIntervalValue(Number(value.target.value))
                  }
                />
              </FormControl>
              <Box alignSelf={'flex-end'} w={'100px'} h={'40px'}>
                <Select
                  defaultValue={{
                    value: INTERVAL.M,
                    label: 'M',
                  }}
                  options={[
                    { value: INTERVAL.D, label: 'D' },
                    { value: INTERVAL.W, label: 'W' },
                    { value: INTERVAL.M, label: 'M' },
                    { value: INTERVAL.Y, label: 'Y' },
                  ]}
                  onChange={(newValue) => {
                    setIntervalCode(newValue!.value);
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
              if (doseType === DOSETYPE.SINGLE) {
                const singleDose = {
                  doseQuantity: doseQuantity,
                  isProtected: false,
                  notes: notes,
                  vaccinationSchemeId: vaccinationSchemeId,
                  startDate: startDate,
                  endDate: endDate,
                  numberInScheme: numberInScheme,
                } as unknown as VaccinationDoseSingle;
                mapper.saveDose(singleDose);
              } else {
                const repeatingDose = {
                  doseQuantity: doseQuantity,
                  isProtected: false,
                  notes: notes,
                  vaccinationSchemeId: vaccinationSchemeId,
                  interval: {
                    value: { value: intervalValue, code: intervalCode },
                  },
                } as unknown as VaccinationDoseRepeating;
                mapper.saveDose(repeatingDose);
              }
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
