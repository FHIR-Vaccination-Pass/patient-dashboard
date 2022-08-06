import { Box, Grid, GridItem } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { DashboardHeader } from '../../components/dashboard/appShell/mdHeader';

export default function MDDashboard() {
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
          <DashboardHeader />
        </GridItem>
        <GridItem rowSpan={11} colSpan={12}>
          <Box h={'100%'} p='4' pb={'0'}>
            <Outlet />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}
