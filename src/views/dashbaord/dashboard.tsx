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
        <GridItem rowSpan={{ base: 10, md: 11 }} colSpan={12}>
          <Box h={'95%'} pl='4' pr='4' pt='2'>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
