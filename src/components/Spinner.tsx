import React from "react";
import { CircularProgress, Container } from "@mui/material";

function Spinner() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <div style={{ display: "flex", height: "60vh" }}>
        <CircularProgress sx={{ margin: "auto" }} />
      </div>
    </Container>
  );
}

export default Spinner;