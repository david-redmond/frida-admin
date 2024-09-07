import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "../../components/Chart";
import Deposits from "../../components/Deposits";
import Orders from "../../components/Orders";
import { connect, useDispatch } from "react-redux";
import { setPageTitle } from "../../store/actions";
import { ICompany, RootState } from "../../store/interfaces";
import CreateCompany from "../CreateCompany";
import SignUpSteps from "./SignUpSteps";

interface IMapsState {
  hasAssociatedCompanies: boolean;
  isPublished: boolean;
  missingProducts: boolean;
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

  if (!props.isPublished) {
    return (
      <Grid container spacing={3}>
        <SignUpSteps />
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

const mapState = (state: RootState): IMapsState => {
  const company = state.associatedCompanies.filter(
    (company: ICompany) => company.id === state.user.activeCompanyId,
  )[0];
  return {
    hasAssociatedCompanies: state.associatedCompanies.length > 0,
    isPublished: !!company && !!company.published,
    missingProducts: state.products.length === 0,
  };
};

export default connect(mapState)(_HomePage);
