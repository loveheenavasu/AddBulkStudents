import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export default function Header() {
  return (
    <Grid2
      xs={12}
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "rgb(245 254 250)" , padding: "10px 0px" }}
    >
      <Typography variant="h4">ADD BULK STUDENTS</Typography>
    </Grid2>
  );
}
