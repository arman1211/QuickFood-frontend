import React from "react";
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  Badge,
  Container,
} from "@mui/material";

import {
  RestaurantMenu,
  Fastfood,
  ListAlt,
  Search,
  Add,
  CloudUpload,
  Dashboard as DashboardIcon,
  Store as StoreIcon,
  LocationOn,
} from "@mui/icons-material";

const AddRestaurant = () => (
  <Box sx={{ mt: 4 }}>
    <Paper
      sx={{ p: 4, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
    >
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Add New Restaurant
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ mb: 3, height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <StoreIcon color="primary" sx={{ mr: 1 }} />
                Restaurant Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Restaurant Name"
                    variant="outlined"
                    placeholder="e.g. Italiano Delight"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Describe your restaurant"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Cuisine Type</InputLabel>
                    <Select label="Cuisine Type">
                      <MenuItem value="italian">Italian</MenuItem>
                      <MenuItem value="indian">Indian</MenuItem>
                      <MenuItem value="japanese">Japanese</MenuItem>
                      <MenuItem value="chinese">Chinese</MenuItem>
                      <MenuItem value="thai">Thai</MenuItem>
                      <MenuItem value="american">American</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price Range"
                    variant="outlined"
                    placeholder="e.g. $$$"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ mb: 3, height: "100%" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LocationOn color="primary" sx={{ mr: 1 }} />
                Location & Contact
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    placeholder="Full address"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" variant="outlined" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Postal Code" variant="outlined" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                mb={3}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CloudUpload color="primary" sx={{ mr: 1 }} />
                Restaurant Images
              </Typography>

              <Box
                sx={{
                  border: "2px dashed #ccc",
                  p: 5,
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2 }}
                >
                  Upload Restaurant Images
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Drag and drop images or click to browse. Max size: 5MB per
                  image.
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
          Add Restaurant
        </Button>
      </Box>
    </Paper>
  </Box>
);

export default AddRestaurant;
