import React, { FC } from 'react';
import {
  Flex,
  useBoolean,
  useColorModeValue,
  FormLabel,
  FormControl,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import { Patient } from '../../../core/models/Patient';
import { useMapper } from '../../../core/services/resourceMapper/ResourceMapperContext';
import { useParams } from 'react-router-dom';

export const PatientInformationWidget: FC = ({}) => {
  const mapper = useMapper();
  const params = useParams();
  const [editMode, setEditMode] = useBoolean(false);
  const patient: Patient | undefined = mapper.getPatientById(
    params['patientId'] || ''
  );
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow='0 4px 12px 0 rgba(0, 0, 0, 0.15)'
      borderRadius={'15px'}
      flexDir='column'
      justifyContent='space-between'
      h={'100%'}
      w={'100%'}
    >
      <Flex flexDirection={'row'}>
        <Flex ml={'20px'} flexDirection={'column'} w={'30%'}>
          <FormControl mt={4}>
            <FormLabel>Given name</FormLabel>
            <Editable
              variant='flushed'
              isPreviewFocusable={editMode}
              defaultValue={patient?.name.given.join(' ') || 'Wow'}
              p={'5px 10px'}
              borderBottom={'1px'}
              borderColor={'gray.200'}
              borderRadius={'5px'}
              color={'gray.500'}
              mb={'20px'}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </FormControl>
        </Flex>
        <Flex flexDirection={'column'}></Flex>
      </Flex>
    </Flex>
  );
};
