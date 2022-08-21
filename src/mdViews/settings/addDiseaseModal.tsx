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
import {
  Disease,
  DiseaseMapper,
  PopulationRecommendationMapper,
} from '../../core/models';
import {
  populationRecommendationApi,
  targetDiseaseApi,
} from '../../core/services/redux/fhir';

interface ModalProps extends BoxProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddDiseaseModal = ({ isOpen, onClose }: ModalProps) => {
  const [postTd] = targetDiseaseApi.endpoints.post.useMutation();
  const [postPr] = populationRecommendationApi.endpoints.post.useMutation();
  const [disease, setDisease] = useState<Disease>({
    id: '',
    name: '',
    code: {
      coding: { code: '', system: 'http://hl7.org/fhir/sid/icd-10' },
    },
    description: '',
  });

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
              value={disease.name}
              onChange={({ target: { value } }) => {
                setDisease({ ...disease, name: value });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Code</FormLabel>
            <Input
              value={disease.code.coding.code}
              onChange={({ target: { value } }) => {
                setDisease({
                  ...disease,
                  code: {
                    ...disease.code,
                    coding: { ...disease.code.coding, code: value },
                  },
                });
              }}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Input
              value={disease.description}
              onChange={({ target: { value } }) => {
                setDisease({ ...disease, description: value });
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={() => {
              postTd(DiseaseMapper.fromModel(disease).toResource());
              postPr(
                PopulationRecommendationMapper.fromModel({
                  id: '',
                  diseaseId: disease.code.coding.code,
                  locations: [],
                }).toResource()
              );
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
