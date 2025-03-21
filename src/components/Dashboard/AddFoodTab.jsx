import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import { Fastfood, Add, AttachMoney, CloudUpload } from "@mui/icons-material";

// Sample data for restaurants
const sampleRestaurants = [
  {
    id: 1,
    name: "Italiano Delight",
    cuisine: "Italian",
    location: "Downtown",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Spice Garden",
    cuisine: "Indian",
    location: "Westside",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Sushi Master",
    cuisine: "Japanese",
    location: "Riverside",
    rating: 4.7,
  },
];

const AddFoodTab = () => (
  <Box sx={{ mt: 4 }}>
    <Paper
      sx={{ p: 4, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
    >
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Add New Food Item
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Fastfood color="primary" sx={{ mr: 1 }} />
                Food Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Food Name"
                    variant="outlined"
                    placeholder="e.g. Margherita Pizza"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Describe your food item"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Restaurant</InputLabel>
                    <Select label="Restaurant">
                      {sampleRestaurants.map((restaurant) => (
                        <MenuItem key={restaurant.id} value={restaurant.id}>
                          {restaurant.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category">
                      <MenuItem value="appetizer">Appetizer</MenuItem>
                      <MenuItem value="main_course">Main Course</MenuItem>
                      <MenuItem value="dessert">Dessert</MenuItem>
                      <MenuItem value="beverage">Beverage</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    variant="outlined"
                    placeholder="e.g. 500"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Availability</InputLabel>
                    <Select label="Availability" defaultValue="available">
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                      <MenuItem value="coming_soon">Coming Soon</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AttachMoney color="primary" sx={{ mr: 1 }} />
                Pricing & Options
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Size Options</InputLabel>
                    <Select
                      label="Size Options"
                      multiple
                      value={["regular"]}
                      renderValue={() => "Selected: 1"}
                    >
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="regular">Regular</MenuItem>
                      <MenuItem value="large">Large</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Preparation Time (mins)"
                    variant="outlined"
                    type="number"
                    defaultValue="30"
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Dietary Tags</InputLabel>
                    <Select
                      label="Dietary Tags"
                      multiple
                      value={["vegetarian"]}
                      renderValue={() => "Selected: 1"}
                    >
                      <MenuItem value="vegetarian">Vegetarian</MenuItem>
                      <MenuItem value="vegan">Vegan</MenuItem>
                      <MenuItem value="gluten_free">Gluten Free</MenuItem>
                      <MenuItem value="dairy_free">Dairy Free</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CloudUpload color="primary" sx={{ mr: 1 }} />
                Food Images
              </Typography>

              <Box
                sx={{
                  border: "2px dashed #ccc",
                  p: 5,
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  mb: 3,
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2 }}
                >
                  Upload Food Images
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Drag and drop images or click to browse. Max size: 5MB per
                  image.
                </Typography>
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Image Preview
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  height: "150px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  No image uploaded yet
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" size="large">
          Cancel
        </Button>
        <Button variant="contained" size="large" startIcon={<Add />}>
          Add Food Item
        </Button>
      </Box>
    </Paper>
  </Box>
);

export default AddFoodTab;
