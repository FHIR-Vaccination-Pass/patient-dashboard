import { Box, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/dashboard/sidebar';
import { DashboardHeader } from '../../components/dashboard/header';

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Grid
        minH='100vh'
        templateRows={{ base: 'repeat(11, 1fr)', md: 'repeat(12, 1fr)' }}
        templateColumns='auto repeat(11, 1fr)'
        gap={1}
      >
        <GridItem
          rowSpan={12}
          colSpan={1}
          display={{ base: 'none', md: 'flex' }}
        >
          <Sidebar
            onClose={() => onClose}
            display={{ base: 'none', md: 'flex' }}
          />
        </GridItem>
        <GridItem colSpan={{ base: 12, md: 11 }} pos={'sticky'}>
          <DashboardHeader
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          ></DashboardHeader>
        </GridItem>
        <GridItem rowSpan={{ base: 10, md: 11 }} colSpan={{ base: 12, md: 11 }}>
          <Box h={'95%'} p='4'>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}