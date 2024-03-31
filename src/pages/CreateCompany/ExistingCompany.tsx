import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, TextField, Typography } from "@mui/material";
import connectCompanyToUser from "../../api/connectCompanyToUser";
import Grid from "@mui/material/Grid";

function ExistingCompany() {
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyId, setNewCompanyId] = useState("");
  return (
    <Grid container>
      <Paper style={{ margin: "auto", padding: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Connect to an existing company
        </Typography>
        <TextField
          label="Company Name*"
          variant="outlined"
          fullWidth
          value={newCompanyName}
          onChange={(e) => setNewCompanyName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Company ID*"
          variant="outlined"
          fullWidth
          value={newCompanyId}
          onChange={(e) => setNewCompanyId(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Typography variant="body2" gutterBottom sx={{ marginBottom: 2 }}>
          *Ask the admin for these details.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            connectCompanyToUser({
              companyName: newCompanyName,
              companyId: newCompanyId,
            })
          }
          sx={{ marginBottom: 2 }}
        >
          Connect Company
        </Button>
      </Paper>
    </Grid>
  );
}

export default ExistingCompany;
