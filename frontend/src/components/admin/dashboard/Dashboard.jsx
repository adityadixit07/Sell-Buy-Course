import {
  Box,
  Grid,
  HStack,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../Sidebar';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import { DoughnutChart, LineChart } from './Chart';

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    width={['full', '30%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    padding={'8'}
    borderRadius={'lg'}
  >
    <Text children={title} />

    <HStack spacing={'6'}>
      <Text fontSize={'2xl'} fontWeight={'bold'} children={qty} />

      <HStack>
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text opacity={'0.5'} children={'Since last month'} />
  </Box>
);

const Bar = ({ title, value, profit }) => (
  <Box py="4" px={['0', '20']}>
    <Heading children={title} size={'sm'} mb="2" />
    <HStack w={'full'} alignItems={'center'}>
      <Text children={profit ? '0%' : `-${value}%`} />
      <Progress w={'full'} value={profit ? value : 0} colorScheme="purple" />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);
const Dashboard = () => {
  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
      //   css={{cursor:`url(${xyz}),default`}}
    >
      <Box boxSizing="border-box" py="16" px={['4', '0']}>
        <Text
          textAlign={'center'}
          opacity={'0.5'}
          children={`Last change was on ${String(new Date()).split('G')[0]}`}
        />

        <Heading
          children="Dashboard"
          marginLeft={['0', '16']}
          marginBottom={'16'}
          textAlign={['center', 'left']}
        />
        <Stack
          direction={['column', 'row']}
          justifyContent={'space-evenly'}
          minH={'24'}
        >
          <Databox title="Views" qty={123} qtyPercentage={30} profit={true} />
          <Databox title="Users" qty={450} qtyPercentage={90} profit={true} />
          <Databox
            title="Subscriptions"
            qty={20}
            qtyPercentage={20}
            profit={false}
          />
        </Stack>

        {/* showing views graph */}
        <Box
          m={['0', '16']}
          borderRadius={'lg'}
          padding={['0', '16']}
          mt={['4', '16']}
          boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
        >
          <Heading
            children="Views Graph"
            textAlign={['center', 'left']}
            size={'md'}
            pt={['8', '0']}
            ml={['0', '16']}
          />
          {/* line graph */}
          <LineChart />
        </Box>
        <Grid templateColumns={['fr', '2fr 1fr']}>
          <Box p="4">
            <Heading
              children="Progress Bar"
              textAlign={['center', 'left']}
              size={'md'}
              my={'8'}
              ml={['0', '16']}
            />
            <Box>
              <Bar profit={true} title="Views" value={30} />
              <Bar profit={true} title="Users" value={90} />
              <Bar profit={false} title="Profit" value={20} />
            </Box>
          </Box>
          <Box p={['0', '16']} boxSizing="border-box">
            <Heading textAlign={'center'} size={'md'} mb="4" children="Users" />
            <DoughnutChart />
          </Box>
        </Grid>
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
