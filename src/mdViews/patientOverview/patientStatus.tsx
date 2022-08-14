import { Box, Grid, GridItem } from '@chakra-ui/react';
import { PatientInformationWidget } from './StatusComponents/PatientInformationWidget';
import { RecommendationsWidget } from './StatusComponents/RecommendationsWidget';
import { ImportantDiseaseWidget } from './StatusComponents/ImportantDiseaseWidget';
import { RecentHistoryWidget } from './StatusComponents/RecentHistoryWidget';
import { QuickActions } from './StatusComponents/QuickActions';

export function PatientStatus() {
  return (
    <Grid
      h={'100%'}
      w={'100%'}
      pl={6}
      templateRows={{
        base: 'repeat(12, 1fr)',
        md: 'repeat(12, 1fr)',
      }}
      templateColumns='repeat(12, 1fr)'
      gap={6}
    >
      <GridItem rowSpan={1} colSpan={12}>
        <QuickActions></QuickActions>
      </GridItem>
      <GridItem rowSpan={6} colSpan={6}>
        <PatientInformationWidget></PatientInformationWidget>
      </GridItem>
      <GridItem rowSpan={6} colSpan={6}>
        <RecommendationsWidget></RecommendationsWidget>
      </GridItem>
      <GridItem rowSpan={5} colSpan={6}>
        <ImportantDiseaseWidget></ImportantDiseaseWidget>
      </GridItem>
      <GridItem rowSpan={5} colSpan={6}>
        <RecentHistoryWidget></RecentHistoryWidget>
      </GridItem>
    </Grid>
  );
}
