import React, { useState } from "react";
import {
  Avatar,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { connect, useDispatch } from "react-redux";
import { ICompany, IUser, RootState } from "../../store/interfaces";
import { Delete, Edit } from "@mui/icons-material";
import connectCompanyToUser from "../../api/connectCompanyToUser";
import {Helmet} from "react-helmet";

// Dummy functions for addCompany and removeCompany
const addCompany = (company: any) => null;
const removeCompany = (companyId: string) => null;

interface IProps extends IMapState {}

interface IMapState {
  associatedCompanies: ICompany[];
  hasAssociatedCompanies: boolean;
  user: IUser | null;
}

const ResponsiveContainer = styled(Container)({
  flexDirection: "column",
  "@media (min-width: 600px)": {
    flexDirection: "row",
  },
});

const ProfilePage: React.FC<any> = ({
  associatedCompanies,
  user,
  hasAssociatedCompanies,
}: IProps) => {
  const [companyRequest, setCompanyRequest] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyId, setNewCompanyId] = useState("");
  const dispatch = useDispatch();

  const handleRequestSubmit = () => {
    // Replace 'your-api-endpoint' with the actual endpoint to submit the request
    fetch("your-api-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData: {},
        companyId: companyRequest,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response if needed
        console.log(data);
      })
      .catch((error) => {
        console.error("Error submitting request:", error);
      });
  };

  return (
    <ResponsiveContainer>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Project Frida Admin | Profile`}</title>
      </Helmet>
      <Grid container spacing={3} justifyContent="center">
        <Grid item>
          <Paper
            style={{ padding: "16px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
          >
            <Typography variant="h6" gutterBottom>
              Profile
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper style={{ padding: "16px", textAlign: "center" }}>
                  <Avatar
                    alt="User Avatar"
                    src={
                      !!user?.image
                        ? user.image
                        : "https://via.placeholder.com/150"
                    }
                    sx={{ width: 150, height: 150, margin: "auto" }}
                  />
                  <Typography variant="h5" mt={2}>
                    {!!user ? `${user.firstname} ${user.surname}` : "Guest"}
                  </Typography>
                  {/*<Typography variant="subtitle1" color="textSecondary">*/}
                  {/*  {!!user ? user.position : " "}*/}
                  {/*</Typography>*/}
                  <Button variant="outlined" sx={{ mt: 2 }}>
                    Edit Profile
                  </Button>
                </Paper>
              </Grid>
              <Grid item>
                <Paper style={{ padding: "16px" }}>
                  <Typography variant="h6" gutterBottom>
                    Associated Companies
                  </Typography>
                  <TextField
                    label="Company Name"
                    variant="outlined"
                    fullWidth
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Company ID"
                    variant="outlined"
                    fullWidth
                    value={newCompanyId}
                    onChange={(e) => setNewCompanyId(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                  <Typography
                    variant="body2"
                    gutterBottom
                    sx={{ marginBottom: 2 }}
                  >
                    *Ask the admin for these details.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      connectCompanyToUser({
                        companyName: newCompanyName,
                        companyId: newCompanyId,
                        dispatch,
                      })
                    }
                    sx={{ marginBottom: 2 }}
                  >
                    Add Company
                  </Button>
                  <List>
                    {associatedCompanies.map((company: ICompany) => (
                      <ListItem key={company.id} >
                        <ListItemText primary={company.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => removeCompany(company.id)}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        {hasAssociatedCompanies && (
          <Grid item>
            <Paper
              style={{
                padding: "16px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Associated Companies
              </Typography>
              {/* Company Cards */}
              {associatedCompanies.map((company: ICompany) => (
                <Card key={company.id} sx={{ marginBottom: 2, px: 4, py: 2 }} style={{backgroundColor: company.published ? "inherit" : "red"}}>
                  <CardContent>
                    <Typography variant="h4">{company.name}</Typography>
                    <div style={{ display: "flex" }}>
                      <CardContent
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="caption">
                          Admin: {company.contact.person}
                        </Typography>
                        <Typography variant="caption">
                          Email: {company.contact.email}
                        </Typography>
                        <Typography variant="caption">
                          Phone: {company.contact.phone}
                        </Typography>
                        <Typography variant="caption">
                          Website: {company.contact.website}
                        </Typography>
                      </CardContent>
                      <CardContent
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="caption">Address</Typography>
                        <Typography variant="caption">
                          {company.address.addressLine1}
                        </Typography>
                        <Typography variant="caption">
                          {company.address.addressLine2}
                        </Typography>
                        <Typography variant="caption">
                          {company.address.city}
                        </Typography>
                        <Typography variant="caption">
                          {company.address.state}
                        </Typography>
                        <Typography variant="caption">
                          {company.address.zipcode}
                        </Typography>
                        <Typography variant="caption">
                          {company.address.country}
                        </Typography>
                      </CardContent>
                    </div>
                    <Typography variant="body2">
                      Website subdomain:{" "}
                      <a
                        href={`http://${company.clientPublicId}.project-frida.online`}
                        target="_blank"
                      >
                        {company.clientPublicId}{" "}
                      </a>
                    </Typography>
                    <Typography variant="h5">{company.published ? "Published" : "Not Published"}</Typography>
                  </CardContent>
                  <CardActions
                    sx={{ justifyContent: "right", marginTop: "-50px" }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => null}
                    >
                      <Edit />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Paper>
          </Grid>
        )}
      </Grid>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state: RootState): IMapState => ({
  associatedCompanies: state.associatedCompanies,
  hasAssociatedCompanies: state.associatedCompanies.length > 0,
  user: state.user.user,
});

export default connect(mapStateToProps, { addCompany, removeCompany })(
  ProfilePage,
);
