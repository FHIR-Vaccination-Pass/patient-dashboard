import { Box, Grid, GridItem } from '@chakra-ui/react';

export function PatientVacationPlans() {
  return (
    <Box>
      <Grid
        h='100vh'
        templateRows={{
          base: '75px repeat(11, 1fr)',
          md: '75px repeat(12, 1fr)',
        }}
        templateColumns='auto repeat(11, 1fr)'
        gap={1}
      >
        <GridItem
          colSpan={12}
          display={'flex'}
          justifyContent={'center'}
        ></GridItem>
        <GridItem rowSpan={11} colSpan={12}></GridItem>
      </Grid>
    </Box>
  );
}
