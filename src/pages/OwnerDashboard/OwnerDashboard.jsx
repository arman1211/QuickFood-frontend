import React, { useState } from "react";
import { Box, Tabs, Tab, Container } from "@mui/material";

import {
  Fastfood,
  ListAlt,
  Dashboard as DashboardIcon,
  Store as StoreIcon,
} from "@mui/icons-material";
import AddRestaurant from "../../components/Dashboard/AddRestaurant";
import OrderListTab from "../../components/Dashboard/OrderListTab";
import AddFoodTab from "../../components/Dashboard/AddFoodTab";
import RestaurantLists from "../../components/Dashboard/RestaurantLists";

const OwnerDashboard = () => {
  // State for managing active tab
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="xl">
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons={false}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                py: 2,
                px: 3,
                fontSize: "1rem",
              },
            }}
          >
            <Tab
              icon={<DashboardIcon />}
              iconPosition="start"
              label="Dashboard"
            />
            <Tab
              icon={<StoreIcon />}
              iconPosition="start"
              label="Add Restaurant"
            />
            <Tab icon={<Fastfood />} iconPosition="start" label="Add Food" />
            <Tab
              icon={<ListAlt />}
              iconPosition="start"
              label="Restaurant List"
            />
          </Tabs>

          {activeTab === 0 && <OrderListTab />}
          {activeTab === 1 && <AddRestaurant />}
          {activeTab === 2 && <AddFoodTab />}
          {activeTab === 3 && <RestaurantLists />}
        </Box>
      </Container>
    </Box>
  );
};

export default OwnerDashboard;
