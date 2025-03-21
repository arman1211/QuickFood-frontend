import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { CloudUploadOutlined, LocationCity, Store } from "@mui/icons-material";
import { createRestaurant } from "../../api/services/resturent";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    image: null,
  });
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setFormData({
        ...formData,
        image: selectedImage,
      });

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await createRestaurant(formData);
    if (response.status === 201) {
      enqueueSnackbar("Restaurant added successfully", { variant: "success" });
      queryClient.invalidateQueries("restaurants");
      setIsLoading(false);
    } else {
      enqueueSnackbar("Failed to add restaurant", { variant: "error" });
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        sx={{ p: 4, borderRadius: 2, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      >
        <Typography variant="h5" fontWeight="bold" mb={4}>
          Add New Restaurant
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ mb: 3, height: "100%" }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="h6"
                    mb={3}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Store color="primary" sx={{ mr: 1 }} />
                    Restaurant Details
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Restaurant Name"
                        variant="outlined"
                        placeholder="e.g. Italiano Delight"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
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
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
                    <LocationCity color="primary" sx={{ mr: 1 }} />
                    Location
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Location"
                        variant="outlined"
                        placeholder="Full address"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
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
                    <CloudUploadOutlined color="primary" sx={{ mr: 1 }} />
                    Restaurant Image
                  </Typography>

                  {imagePreview && (
                    <Box sx={{ mb: 2, textAlign: "center" }}>
                      <img
                        src={imagePreview}
                        alt="Restaurant preview"
                        style={{ maxHeight: "200px", maxWidth: "100%" }}
                      />
                    </Box>
                  )}

                  <Box
                    sx={{
                      border: "2px dashed #ccc",
                      p: 5,
                      borderRadius: 2,
                      textAlign: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                    }}
                  >
                    <input
                      accept="image/*"
                      id="restaurant-image-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="restaurant-image-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<CloudUploadOutlined />}
                        sx={{ mb: 2 }}
                      >
                        Upload Restaurant Image
                      </Button>
                    </label>
                    <Typography variant="body2" color="text.secondary">
                      Drag and drop an image or click to browse. Max size: 5MB.
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box
            sx={{ mt: 4, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button variant="outlined" size="large" type="button">
              Cancel
            </Button>
            <Button variant="contained" size="large" type="submit">
              {!isLoading ? "Add Restaurant" : "Adding..."}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddRestaurant;
