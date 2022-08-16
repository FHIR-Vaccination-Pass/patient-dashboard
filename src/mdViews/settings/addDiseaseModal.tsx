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
import React from 'react';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import { Disease } from '../../core/models/Disease';

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
}

/*
  id: string;
  code: CodeableConcept;
  name: string;
  description: string;
  populationRecommendationId: string;
  // Medication ids
  vaccineIds: string[];
 */

export const AddDiseaseModal = ({ isOpen, onClose }: ModalProps) => {
  const mapper = useMapper();
  const disease = {
    name: undefined,
    code: {
      coding: { code: undefined, system: 'http://hl7.org/fhir/sid/icd-10' },
    },
    description: undefined,
    populationRecommendationId: undefined,
    vaccineIds: [],
  } as unknown as Disease;
  const initialRef = React.useRef(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Disease</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              ref={initialRef}
              placeholder=''
              onChange={(value) => (disease.name = value.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Code</FormLabel>
            <Input
              ref={initialRef}
              placeholder=''
              onChange={(value) =>
                (disease.code.coding.code = value.target.value)
              }
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              ref={initialRef}
              placeholder=''
              onChange={(value) => (disease.description = value.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              mapper.saveDisease(disease);
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
