import React, { useState } from "react";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Badge,
  Container,
  Pagination,
} from "@mui/material";

import {
  RestaurantMenu,
  Fastfood,
  ListAlt,
  Search,
  Add,
  FilterList,
  MoreVert,
  AccountCircle,
  Notifications,
  AttachMoney,
  CloudUpload,
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  LocationOn,
  CheckCircleOutline,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useQuery, useQueryClient } from "react-query";
import { QK } from "../../base/qk";
import { getOrders } from "../../api/services/order";
import OrderActionModal from "./Action/OrderActionModal";

const sampleOrders = [
  {
    id: 1,
    customer: "John Doe",
    items: 4,
    total: 1302.0,
    status: "preparing",
    date: "2025-03-20",
  },
  {
    id: 2,
    customer: "Jane Smith",
    items: 2,
    total: 850.5,
    status: "delivered",
    date: "2025-03-19",
  },
  {
    id: 3,
    customer: "Robert Johnson",
    items: 3,
    total: 1100.25,
    status: "cancelled",
    date: "2025-03-19",
  },
  {
    id: 4,
    customer: "Emily Parker",
    items: 1,
    total: 450.0,
    status: "shipping",
    date: "2025-03-18",
  },
  {
    id: 5,
    customer: "Michael Brown",
    items: 5,
    total: 1450.75,
    status: "delivered",
    date: "2025-03-17",
  },
];
// Function to get status color
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

// Content components for each tab

const OrderListTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderActionModalOpen, setOrderActionModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const orderPerPage = 10;

  const queryClient = useQueryClient();

  // Fetch medicines using react-query
  const { data: orderLists, isLoading } = useQuery(
    [QK.orderLists, currentPage],
    () => getOrders(currentPage),
    { keepPreviousData: true, enabled: !!currentPage }
  );
  const orders = orderLists?.results || [];
  const totalRecords = orderLists?.count || 0;
  const totalPages = Math.ceil(totalRecords / orderPerPage);
  const handlePageChange = (event, page) => setCurrentPage(page);
  console.log(orders);

  const handleOrderAction = (order) => {
    setSelectedOrder(order);
    setOrderActionModalOpen(true);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        sx={{ p: 4, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Order List
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              placeholder="Search orders..."
              size="small"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button variant="outlined" startIcon={<FilterList />}>
              Filter
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: "#E3F2FD", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="primary">
                    Total Orders
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" mt={1}>
                    125
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    +12% from last month
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: "#E8F5E9", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="success.main">
                    Completed
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" mt={1}>
                    98
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    78.4% completion rate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: "#FFF8E1", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="warning.main">
                    In Progress
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" mt={1}>
                    18
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    14.4% of all orders
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ bgcolor: "#FFEBEE", borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="subtitle2" color="error.main">
                    Cancelled
                  </Typography>
                  <Typography variant="h4" fontWeight="bold" mt={1}>
                    9
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    7.2% cancellation rate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Address</TableCell> {/* Added Address Column */}
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    {" "}
                    {/* Updated colSpan */}
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => (
                  <TableRow key={order.id} hover>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>
                      {order.delivery_address.first_name}{" "}
                      {order.delivery_address.last_name}
                    </TableCell>
                    <TableCell>
                      {order.ordered_items
                        .map((item) => `${item.item_name} (x${item.quantity})`)
                        .join(", ")}
                    </TableCell>
                    <TableCell>${order.total_price}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {order.delivery_address ? (
                        `${order.delivery_address.street}, ${order.delivery_address.city},`
                      ) : (
                        <span className="text-gray-400">
                          No address provided
                        </span>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Order Actions">
                        <IconButton
                          color="primary"
                          onClick={() => handleOrderAction(order)}
                        >
                          <CheckCircleOutline />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <OrderActionModal
          open={orderActionModalOpen}
          order={selectedOrder}
          handleClose={() => setOrderActionModalOpen(false)}
        />

        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderListTab;
