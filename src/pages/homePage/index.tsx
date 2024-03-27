import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../../components/Chart";
import Deposits from "../../components/Deposits";
import Orders from "../../components/Orders";
import { connect, useDispatch } from "react-redux";
import { setPageTitle } from "../../store/actions";
import { RootState } from "../../store/interfaces";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import connectCompanyToUser from "../../api/connectCompanyToUser";

interface IMapsState {
  hasAssociatedCompanies: boolean;
}

interface IProps extends IMapsState {}
function _HomePage(props: IProps) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      setPageTitle(
        props.hasAssociatedCompanies ? "Dashboard" : "Create a company",
      ),
    );
  });

  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyId, setNewCompanyId] = useState("");

  if (!props.hasAssociatedCompanies) {
    return (
      <Grid container>
        <Paper style={{ margin: "auto", padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Connect to a company
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

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Chart />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Orders rows={[]} title={"Recent orders"} />
        </Paper>
      </Grid>
    </Grid>
  );
}

const mapState = (state: RootState): IMapsState => ({
  hasAssociatedCompanies: state.associatedCompanies.length > 0,
});

export default connect(mapState)(_HomePage);
