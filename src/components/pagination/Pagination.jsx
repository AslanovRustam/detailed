import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    ochre: {
      main: "#ffd75c",
      light: "#fdb03e",
      dark: "#fdb03e",
      contrastText: "#242105",
    },
  },
});

function PaginationComponent({ setPage, paginationCount }) {
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination
          count={paginationCount}
          color="ochre"
          sx={{ color: "ochre.main" }}
          onChange={handleChange}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default PaginationComponent;
