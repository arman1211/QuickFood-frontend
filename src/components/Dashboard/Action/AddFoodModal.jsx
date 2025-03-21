import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  Box,
  Typography,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Chip,
} from "@mui/material";

// Import MUI icons
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DescriptionIcon from "@mui/icons-material/Description";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import CategoryIcon from "@mui/icons-material/Category";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import { createMenuItem } from "../../../api/services/menuItems";
import { QK } from "../../../base/qk";

const CATEGORY_CHOICES = [
  { value: "Salad", label: "Salad" },
  { value: "Rolls", label: "Rolls" },
  { value: "Deserts", label: "Deserts" },
  { value: "Sandwich", label: "Sandwich" },
  { value: "Cake", label: "Cake" },
  { value: "Pure Veg", label: "Pure Veg" },
  { value: "Pasta", label: "Pasta" },
  { value: "Noodles", label: "Noodles" },
  { value: "Biriyani", label: "Biriyani" },
  { value: "Kacchi", label: "Kacchi" },
];

const AddFoodModal = ({ open, handleClose, restaurantId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
    image: null,
    restaurant: restaurantId,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prevState) => ({
      ...prevState,
      image: null,
    }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    const response = await createMenuItem(formData);
    console.log(response);
    if (response.status === 201) {
      enqueueSnackbar("Food item added successfully", { variant: "success" });
      queryClient.invalidateQueries([QK.restaurants]);
      setLoading(false);
      handleClose();
    } else {
      enqueueSnackbar("Failed to add food item", { variant: "error" });
      setLoading(false);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Salad",
      image: null,
      restaurant: restaurantId,
    });
    setImagePreview(null);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.main",
          color: "white",
          py: 2,
        }}
      >
        <Box display="flex" alignItems="center">
          <FastfoodIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div">
            Add New Food Item
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <FastfoodIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
                placeholder="Enter food item name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={3}
                InputProps={{
                  startAdornment: (
                    <DescriptionIcon color="action" sx={{ mr: 1, mt: 1 }} />
                  ),
                }}
                placeholder="Describe the food item"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                variant="outlined"
                inputProps={{ step: "0.01", min: "0" }}
                InputProps={{
                  startAdornment: (
                    <MonetizationOnIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
                placeholder="0.00"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                required
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <CategoryIcon color="action" sx={{ mr: 1 }} />
                  ),
                }}
              >
                {CATEGORY_CHOICES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }}>
                <Chip icon={<ImageIcon />} label="Food Image" />
              </Divider>

              {!imagePreview ? (
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<PhotoCameraIcon />}
                  sx={{
                    height: "100px",
                    border: "1px dashed",
                    borderColor: "divider",
                  }}
                >
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
              ) : (
                <Paper
                  variant="outlined"
                  sx={{
                    position: "relative",
                    mt: 1,
                    p: 1,
                    textAlign: "center",
                    borderRadius: 1,
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Food preview"
                    style={{
                      height: "140px",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <Tooltip title="Remove Image">
                    <IconButton
                      size="small"
                      color="error"
                      onClick={handleRemoveImage}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        backgroundColor: "rgba(255,255,255,0.7)",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.9)",
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Paper>
              )}
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
          <Button
            onClick={() => {
              resetForm();
              handleClose();
            }}
            variant="outlined"
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            {loading ? "Adding..." : "Add Food"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddFoodModal;
