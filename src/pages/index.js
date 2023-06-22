import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { createContext, useContext } from 'react';

const now = new Date();


export const orders = [
  {
    id: 'f69f88012978187a6c12897f',
    ref: 'D1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1685016400000,
    status: 'cours',
    image: '/assets/trash-img/1.jpg',
    latitude: '',
    longitude: '',
    predictions: [
      [
        "Clear plastic bottle",
        [
          402.34423828125,
          1833.075927734375,
          880.0072021484375,
          2151.718505859375,
          0.8004488348960876,
        ],
      ],
      [
        "Other Carton",
        [
          1028.7479248046875,
          1091.213623046875,
          1578.9385986328125,
          1877.279541015625,
          0.6411442756652832,
        ],
      ],
      [
        "Paper",
        [
          1029.7685546875,
          1070.0174560546875,
          1574.3126220703125,
          1886.70751953125,
          0.2975366413593292,
        ],
      ],
    ],
    message: 'Les déchets sont encombrants !',
  },
  {
    id: '9eaa1c7dd4433f413c308ce2',
    ref: 'D1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1685016400000,
    status: 'traité',
    image: '/assets/products/product-2.png',
    latitude: '',
    longitude: '',
    predictions: [],
    message: 'Les déchets sont encombrants !',
  },
  {
    id: '01a5230c811bd04996ce7c13',
    ref: 'D1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1684930000000,
    status: 'attente',
    image: '/assets/products/product-5.png',
    latitude: '',
    longitude: '',
    predictions: [],
    message: 'Les déchets sont encombrants !',
  },
  {
    id: '1f4e1bd0a87cea23cdb83d18',
    ref: 'D1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1684757200000,
    status: 'cours',
    image: '/assets/products/product-4.png',
    latitude: '',
    longitude: '',
    predictions: [],
    message: 'Les déchets sont encombrants !',
  },
  {
    id: '9f974f239d29ede969367103',
    ref: 'D1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1674670800000,
    status: 'traité',
    image: '/assets/products/product-5.png',
    latitude: '',
    longitude: '',
    predictions: [],
    message: 'Les déchets sont encombrants !',
  },
  {
    id: 'ffc83c1560ec2f66a1c05596',
    ref: 'D1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1674670800000,
    status: 'traité',
    image: '/assets/products/product-6.png',
    latitude: '',
    longitude: '',
    predictions: [],
    message: 'Les déchets sont encombrants !',
  }
];

const Page = () => (
  <>
    <Head>
      <title>
        Green AI | Dashboard
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="329"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={2}
              positive={false}
              sx={{ height: '100%' }}
              value="48"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={"2j 14h 18m"}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="3"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              orders={orders}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Bouteilles', 'Cartons', 'Sacs poubelles']}
              sx={{ height: '100%' }}
            />
          </Grid>
          {/*
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Healthcare Erbology',
                  updatedAt: subHours(now, 6).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Makeup Lancome Rouge',
                  updatedAt: subDays(subHours(now, 8), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Skincare Soja CO',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Makeup Lipstick',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Healthcare Ritual',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
            </Grid>*/}
          <Grid
            xs={14}
            md={14}
            lg={12}
          >
            <OverviewLatestOrders
              orders={orders}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
