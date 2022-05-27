import { Grid, GridItem } from '@chakra-ui/react';

export function Overview() {
  return (
    <Grid
      minH='100%'
      templateRows={'repeat(12, 1fr)'}
      templateColumns='repeat(12, 1fr)'
      gap={1}
    >
      <GridItem
        rowSpan={12}
        colSpan={1}
        display={'flex'}
        bg={'gray.100'}
      ></GridItem>
      <GridItem colSpan={11} bg={'gray.300'}></GridItem>
      <GridItem bg={'gray.600'} rowSpan={11} colSpan={11}></GridItem>
    </Grid>
  );
}
