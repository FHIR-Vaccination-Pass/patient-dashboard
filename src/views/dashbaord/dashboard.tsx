import { Box, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '../../components/dashboard/appShell/header';

export default function Dashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <GridItem colSpan={12} display={'flex'} justifyContent={'center'}>
          <DashboardHeader
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
          ></DashboardHeader>
        </GridItem>
        <GridItem rowSpan={11} colSpan={{ base: 12, md: 11 }}>
          <Box h={'100%'} p='4'>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
