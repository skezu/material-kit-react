import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import ProductPage from './overview-latest-orders-popup';
import { useState } from 'react';

const statusMap = {
  cours: 'warning',
  traité: 'success',
  attente: 'error'
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleItemClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductPage = () => {
    setSelectedProduct(null);
  };
  
  const handleValidateProductPage = (product) => {
    product.status = 'traité';
    setSelectedProduct(null);
  }

  return (
    <Card sx={sx}>
      <CardHeader title="Derniers signalements" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Preview
                </TableCell>
                <TableCell>
                  Ticket n°
                </TableCell>
                <TableCell>
                  Contact
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = format(order.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={order.id}
                    onClick={() => handleItemClick(order)}
                  >
                    <TableCell>
                    {
                  order.image
                    ? (
                        <Box
                          component="img"
                          src={order.image}
                          sx={{
                            borderRadius: 1,
                            height: 48,
                            width: 48
                          }}
                        />
                        )
                        : (
                          <Box
                            sx={{
                              borderRadius: 1,
                              backgroundColor: 'neutral.200',
                              height: 48,
                              width: 48
                            }}
                          />
                        )
                    }
                    </TableCell>
                    <TableCell>
                      {order.ref}
                    </TableCell>
                    <TableCell>
                      {order.customer.name}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
      {selectedProduct && (
        <ProductPage product={selectedProduct} onClose={handleCloseProductPage} onValidate={() => handleValidateProductPage(selectedProduct)}/>
      )}
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
