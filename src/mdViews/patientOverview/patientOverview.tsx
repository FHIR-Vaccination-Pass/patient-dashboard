import { Flex } from '@chakra-ui/react';
import { PatientSidebar } from './patientSidebar';
import { useLocation } from 'react-router-dom';
import { useMapper } from '../../core/services/resourceMapper/ResourceMapperContext';
import { Patient } from '../../core/models/Patient';

export function PatientOverview() {
  const location = useLocation();
  const pathComponents: string[] = location.pathname.split('/');
  const mapper = useMapper();
  const patientId: string = pathComponents[pathComponents.length - 1];
  const patient: Patient | undefined = mapper.getPatientById(patientId);
  return (
    <Flex h={'100%'} flexDirection={'row'}>
      <PatientSidebar
        onClose={() => {
          return;
        }}
        patient={patient}
      ></PatientSidebar>
    </Flex>
  );
}
