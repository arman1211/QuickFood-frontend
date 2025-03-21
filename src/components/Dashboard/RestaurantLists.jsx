import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  LocationOn,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  MenuBook,
  FastfoodOutlined as FoodIcon,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { QK } from "../../base/qk";
import { getRestaurants } from "../../api/services/resturent";
import AddFoodModal from "./Action/AddFoodModal";

const RestaurantLists = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [openAddFoodModal, setOpenAddFoodModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const {
    data: restaurants,
    isLoading,
    error,
  } = useQuery([QK.restaurants], () => getRestaurants());

  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = restaurants?.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddFood = (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    setOpenAddFoodModal(true);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, p: 3, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          Error loading restaurants: {error.message}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <MenuBook color="primary" sx={{ mr: 1 }} />
            Restaurants
            <Chip
              label={filteredRestaurants?.length || 0}
              size="small"
              color="primary"
              sx={{ ml: 1 }}
            />
          </Typography>

          <Button
            variant="contained"
            component={Link}
            onClick={() => setActiveTab(1)}
            startIcon={<AddIcon />}
          >
            Add Restaurant
          </Button>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search restaurants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
      </Paper>

      {filteredRestaurants?.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 6 }}>
          <Typography variant="h6" color="text.secondary">
            No restaurants found with this name.
          </Typography>
        </Box>
      ) : (
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Restaurant</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Menu Items</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRestaurants.map((restaurant) => (
                  <TableRow
                    key={restaurant.id}
                    hover
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src={restaurant.image}
                          alt={restaurant.name}
                          variant="rounded"
                          sx={{ width: 50, height: 50, mr: 2 }}
                        />
                        <Typography variant="subtitle1" fontWeight="medium">
                          {restaurant.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ maxWidth: 250 }}>
                      <Typography
                        noWrap
                        variant="body2"
                        title={restaurant.description}
                      >
                        {restaurant.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOn
                          fontSize="small"
                          color="action"
                          sx={{ mr: 0.5 }}
                        />
                        <Typography variant="body2">
                          {restaurant.location}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {restaurant.menu_items.length > 0 ? (
                          <>
                            <Chip
                              icon={<FoodIcon />}
                              label={`${restaurant.menu_items.length} items`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                            {restaurant.menu_items.slice(0, 2).map((item) => (
                              <Tooltip
                                key={item.id}
                                title={`${item.name} - ${item.price}`}
                              >
                                <Chip
                                  label={item.name}
                                  size="small"
                                  variant="outlined"
                                  sx={{ ml: 0.5 }}
                                />
                              </Tooltip>
                            ))}
                            {restaurant.menu_items.length > 2 && (
                              <Chip
                                label={`+${restaurant.menu_items.length - 2}`}
                                size="small"
                                color="secondary"
                                sx={{ ml: 0.5 }}
                              />
                            )}
                          </>
                        ) : (
                          <Chip
                            label="No menu items"
                            size="small"
                            color="default"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box>
                        <Tooltip title="View Details">
                          <IconButton size="small" color="primary">
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Restaurant">
                          <IconButton size="small" color="info">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Food Item">
                          <IconButton
                            size="small"
                            color="success"
                            onClick={() => handleAddFood(restaurant.id)}
                          >
                            <FoodIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      {selectedRestaurant && (
        <AddFoodModal
          open={openAddFoodModal}
          handleClose={() => setOpenAddFoodModal(false)}
          restaurantId={selectedRestaurant}
        />
      )}
    </Box>
  );
};

export default RestaurantLists;
