import { Grid, GridItem } from '@chakra-ui/react';

export function Overview() {
  return (
    <Grid
      minH='100%'
      maxH={'80vh'}
      templateRows={'repeat(12, 1fr)'}
      templateColumns='repeat(12, 1fr)'
      gap={5}
    >
      {/* Mobile */}
      <GridItem colSpan={12} rowSpan={4} bg={'gray.300'}></GridItem>

      <GridItem colSpan={12} rowSpan={4} bg={'gray.300'}></GridItem>

      <GridItem colSpan={12} rowSpan={4} bg={'gray.300'}></GridItem>
    </Grid>
  );
}
