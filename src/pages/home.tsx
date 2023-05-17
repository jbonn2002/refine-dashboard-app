import { Box, Typography, Stack } from "@mui/material";
import { useList } from "@refinedev/core/dist/hooks/data/useList";

import {
  PieChart,
  PropertyCard,
  PropertyReferrals,
  TotalRevenue,
  TopAgent,
} from "components";

const home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Properties for Sale"
          value={684}
          series={[75, 25]}
          colors={["#1F7A8C", "#022B3A"]}
        />
        <PieChart
          title="Properties for Rent"
          value={550}
          series={[60, 40]}
          colors={["#1F7A8C", "#022B3A"]}
        />
        <PieChart
          title="Total Customers"
          value={5684}
          series={[75, 25]}
          colors={["#1F7A8C", "#022B3A"]}
        />
        <PieChart
          title="Properties for Cities"
          value={555}
          series={[75, 25]}
          colors={["#1F7A8C", "#022B3A"]}
        />
      </Box>
    </Box>
  );
};

export default home;
