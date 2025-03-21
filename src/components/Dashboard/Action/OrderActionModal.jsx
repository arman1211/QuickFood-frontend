import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress,
} from "@mui/material";
import { patchOrder } from "../../../api/services/order";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import { QK } from "../../../base/qk";

const OrderActionModal = ({ open, handleClose, order }) => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  useEffect(() => {
    setStatus(order?.status);
  }, [order]);

  // All possible order statuses
  const orderStatuses = [
    "preparing",
    "out_for_delivery",
    "delivered",
    "canceled",
  ];

  // Get appropriate color for status chip
  const getStatusColor = (status) => {
    switch (status) {
      case "preparing":
        return "info";
      case "out_for_delivery":
        return "warning";
      case "delivered":
        return "success";
      case "canceled":
        return "error";
      default:
        return "default";
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async () => {
    if (!order || status === order.status) return;

    setIsLoading(true);
    try {
      // Call the parent function to update status
      const response = await patchOrder(order.id, { status });
      if (response.status === 200) {
        enqueueSnackbar("Order status updated successfully", {
          variant: "success",
        });
        queryClient.invalidateQueries([QK.orderLists]);
        handleClose();
      }
    } catch (error) {
      enqueueSnackbar("Failed to update order status", { variant: "error" });
      // You could add snackbar notification here
    } finally {
      setIsLoading(false);
    }
  };

  // If no order is provided yet
  if (!order) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="order-action-modal-title"
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(3px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
          maxWidth: "800px",
          maxHeight: "90vh",
          overflow: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          id="order-action-modal-title"
          variant="h5"
          component="h2"
          fontWeight="600"
          gutterBottom
        >
          Order #{order.id}
          <Chip
            label={order.status.replace(/_/g, " ").toUpperCase()}
            color={getStatusColor(order.status)}
            size="small"
            sx={{ ml: 2, textTransform: "capitalize" }}
          />
        </Typography>

        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
          Created: {new Date(order.created_at).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Customer Information */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Customer Information
        </Typography>
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.delivery_address.first_name}{" "}
                {order.delivery_address.last_name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Contact
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.delivery_address.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.delivery_address.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.delivery_address.street}, {order.delivery_address.city},{" "}
                {order.delivery_address.state},{" "}
                {order.delivery_address.zip_code},{" "}
                {order.delivery_address.country}
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Order Items */}
        <Typography variant="h6" gutterBottom>
          Order Items
        </Typography>
        <Paper elevation={1} sx={{ mb: 3 }}>
          <List disablePadding>
            {order.ordered_items.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ py: 1, px: 2 }}>
                  <ListItemText
                    primary={item.item_name}
                    secondary={`${
                      item.quantity
                    } × $${item.price_per_item.toFixed(2)}`}
                  />
                  <Typography variant="body1">
                    ${item.total_price_for_item.toFixed(2)}
                  </Typography>
                </ListItem>
                {index < order.ordered_items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            <Divider />
            <ListItem sx={{ py: 1, px: 2 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ${Number(order.total_price).toFixed(2)}
              </Typography>
            </ListItem>
          </List>
        </Paper>

        {/* Status Change */}
        <Typography variant="h6" gutterBottom>
          Update Order Status
        </Typography>
        <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              {orderStatuses.map((statusOption) => (
                <MenuItem
                  key={statusOption}
                  value={statusOption}
                  sx={{ textTransform: "capitalize" }}
                >
                  {statusOption.replace(/_/g, " ")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {/* Action Buttons */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <Button onClick={handleClose} variant="outlined" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isLoading || status === order.status}
            startIcon={
              isLoading && <CircularProgress size={20} color="inherit" />
            }
          >
            {isLoading ? "Updating..." : "Update Status"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrderActionModal;
