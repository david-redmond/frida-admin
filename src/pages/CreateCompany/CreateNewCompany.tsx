import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import {INewCompany, IUser, IUserPositionType} from "../../store/interfaces";
import createNewCompanyAPI from "../../api/createNewCompanyAPI";

interface ICreateNewCompanyProps {
  user: IUser | null;
}
function CreateNewCompany(props: ICreateNewCompanyProps) {
  const [company, setCompany] = useState<INewCompany>({
    name: "",
    contact: {
      position: "standard",
      person: `${props.user?.firstname} ${props.user?.surname}`,
      email: props.user?.email || "",
      phone: "",
      website: "",
    },
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "Ireland",
    },
  });
  return (
    <Grid container>
      <Paper style={{ margin: "auto", padding: "16px" }}>
        <Typography variant="h6" gutterBottom>
          Create a new company
        </Typography>
        <Typography variant="body2" gutterBottom>
          We will use this data to create the company profile and set-up your
          new store in a few minutes.
        </Typography>
        <Grid container spacing={2} marginTop={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Name"
              variant="outlined"
              fullWidth
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company Website"
              variant="outlined"
              fullWidth
              value={company.contact.website}
              onChange={(e) =>
                setCompany({
                  ...company,
                  contact: { ...company.contact, website: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contact Person"
              variant="outlined"
              value={company.contact.person}
              onChange={(e) =>
                setCompany({
                  ...company,
                  contact: { ...company.contact, person: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              fullWidth
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={company.contact.position}
              label="Contact Position"
              onChange={(e) =>
                setCompany({
                  ...company,
                  contact: {
                    ...company.contact,
                    position: e.target.value as IUserPositionType,
                  },
                })
              }
            >
              <MenuItem value={"owner"}>Owner</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"standard"}>Standard</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Email"
              variant="outlined"
              fullWidth
              value={company.contact.email}
              onChange={(e) =>
                setCompany({
                  ...company,
                  contact: { ...company.contact, email: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Phone"
              variant="outlined"
              fullWidth
              value={company.contact.phone}
              onChange={(e) =>
                setCompany({
                  ...company,
                  contact: { ...company.contact, phone: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Address House No."
              variant="outlined"
              fullWidth
              value={company.address.addressLine1}
              onChange={(e) =>
                setCompany({
                  ...company,
                  address: { ...company.address, addressLine1: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Street"
              variant="outlined"
              fullWidth
              value={company.address.addressLine2}
              onChange={(e) =>
                setCompany({
                  ...company,
                  address: { ...company.address, addressLine2: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={company.address.city}
              onChange={(e) =>
                setCompany({
                  ...company,
                  address: { ...company.address, city: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="County"
              variant="outlined"
              fullWidth
              value={company.address.state}
              onChange={(e) =>
                setCompany({
                  ...company,
                  address: { ...company.address, state: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Eircode"
              variant="outlined"
              fullWidth
              value={company.address.zipcode}
              onChange={(e) =>
                setCompany({
                  ...company,
                  address: { ...company.address, zipcode: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              value={company.address.country}
              onChange={(e) =>
                setCompany({
                  ...company,
                  address: { ...company.address, country: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={() => createNewCompanyAPI(company)}
          sx={{ marginBottom: 2 }}
        >
          Create
        </Button>
      </Paper>
    </Grid>
  );
}

export default CreateNewCompany;
