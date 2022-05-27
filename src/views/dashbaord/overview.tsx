import { Grid, GridItem } from '@chakra-ui/react';

export function Overview() {
  return (
    <Grid
      minH='100%'
      templateRows={'repeat(12, 1fr)'}
      templateColumns='repeat(12, 1fr)'
      gap={1}
    >
      {/* Desktop */}
      <GridItem
        display={{ base: 'none', md: 'grid' }}
        colSpan={8}
        rowSpan={6}
        bg={'gray.300'}
      ></GridItem>

      <GridItem
        display={{ base: 'none', md: 'grid' }}
        rowSpan={12}
        colSpan={4}
        bg={'gray.100'}
      ></GridItem>

      <GridItem
        display={{ base: 'none', md: 'grid' }}
        colSpan={8}
        rowSpan={6}
        bg={'gray.300'}
      ></GridItem>

      {/* Mobile */}
      <GridItem
        display={{ base: 'grid', md: 'none' }}
        colSpan={12}
        rowSpan={4}
        bg={'gray.100'}
      ></GridItem>

      <GridItem
        display={{ base: 'grid', md: 'none' }}
        colSpan={12}
        rowSpan={4}
        bg={'gray.300'}
      ></GridItem>

      <GridItem
        display={{ base: 'grid', md: 'none' }}
        colSpan={12}
        rowSpan={4}
        bg={'gray.300'}
      ></GridItem>
    </Grid>
  );
}
