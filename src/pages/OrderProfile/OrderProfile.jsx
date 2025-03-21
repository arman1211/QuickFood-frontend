import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
} from "@mui/material";
import {
  ShoppingBag,
  ExpandMore,
  AccessTime,
  LocalShipping,
  Check,
  Print,
} from "@mui/icons-material";
import { getUserOder } from "../../api/services/order";

const OrderProfile = () => {
  const { id } = useParams();

  // Fetching order data using useQuery
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery(
    ["orders", id],
    () => getUserOder(id), // Call your API function to fetch order by id
    { enabled: !!id } // Ensures the query only runs if there's an id
  );

  // Handle loading state
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Alert severity="error">
        Error loading order details. Please try again later.
      </Alert>
    );
  }

  // Handle empty state
  if (!orders || orders.length === 0) {
    return <Alert severity="info">No orders found.</Alert>;
  }

  // Helper function to get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "warning";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      case "shipping":
        return "info";
      default:
        return "default";
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          My Orders
        </Typography>
        <Button startIcon={<Print />} variant="outlined">
          Print All
        </Button>
      </Box>

      {orders.map((order) => (
        <Paper key={order.id} sx={{ mb: 3, overflow: "hidden" }} elevation={2}>
          {/* Order Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: "primary.main",
              color: "primary.contrastText",
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Order #{order.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2">
                  {formatDate(order.created_at)}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{ textAlign: { xs: "left", sm: "right" } }}
              >
                <Chip
                  label={
                    order.status.charAt(0).toUpperCase() + order.status.slice(1)
                  }
                  color={getStatusColor(order.status)}
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Order Summary */}
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <ShoppingBag sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">Order Summary</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />

                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Total Items
                        </Typography>
                        <Typography variant="body1">
                          {order.item_details.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </Typography>
                      </Grid>

                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">
                          Total Amount
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                          ${parseFloat(order.total_price).toFixed(2)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <AccessTime sx={{ mr: 1, color: "primary.main" }} />
                      <Typography variant="h6">Order Status</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Check color="success" />
                        <Typography variant="body2">Confirmed</Typography>
                      </Box>

                      <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{ flex: 1, mx: 1 }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        {order.status === "preparing" ? (
                          <AccessTime color="warning" />
                        ) : (
                          <Check color="success" />
                        )}
                        <Typography variant="body2">Preparing</Typography>
                      </Box>

                      <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{ flex: 1, mx: 1 }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <LocalShipping color="disabled" />
                        <Typography variant="body2" color="text.secondary">
                          Shipping
                        </Typography>
                      </Box>

                      <Divider
                        orientation="horizontal"
                        flexItem
                        sx={{ flex: 1, mx: 1 }}
                      />

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Check color="disabled" />
                        <Typography variant="body2" color="text.secondary">
                          Delivered
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Order Items Table Accordion */}
            <Accordion sx={{ mt: 3 }}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls={`order-${order.id}-items-content`}
                id={`order-${order.id}-items-header`}
              >
                <Typography variant="subtitle1">Order Items</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: "background.default" }}>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.item_details.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <Typography fontWeight="medium">
                              {item.item_name}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            ${item.price_per_item.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">{item.quantity}</TableCell>
                          <TableCell align="right">
                            ${item.total_price_for_item.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}

                      <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell align="right">
                          <Typography variant="subtitle2">Subtotal</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            $
                            {order.item_details
                              .reduce(
                                (sum, item) => sum + item.total_price_for_item,
                                0
                              )
                              .toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell align="right">
                          <Typography variant="subtitle2">
                            Delivery Fee
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">$2.00</Typography>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={2} />
                        <TableCell align="right">
                          <Typography variant="subtitle1" fontWeight="bold">
                            Total
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="subtitle1" fontWeight="bold">
                            ${parseFloat(order.total_price).toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default OrderProfile;
