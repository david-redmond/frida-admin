import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../../components/Chart";
import Deposits from "../../components/Deposits";
import Orders from "../../components/Orders";
import { connect, useDispatch } from "react-redux";
import { setPageTitle } from "../../store/actions";
import { RootState } from "../../store/interfaces";
import CreateCompany from "../CreateCompany";

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

  if (!props.hasAssociatedCompanies) {
    return <CreateCompany />;
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
