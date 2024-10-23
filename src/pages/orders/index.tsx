import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { setOrders, setPageTitle } from "../../store/actions";
import http from "../../http";
import { useState } from "react";
import { IOrder, RootState } from "../../store/interfaces";
import Orders from "../../components/Orders";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet";

interface IProps extends IMapState {}

interface IMapState {
  activeCompanyId: string;
  new: IOrder[];
  complete: IOrder[];
}
const OrdersPage = (props: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setPageTitle("Orders"));
  });

  const fetchOrders = async () => {
    const response = await http.get(`/api/orders/${props.activeCompanyId}`);

    if (!!response && !!response.data) {
      dispatch(setOrders(response.data));
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchOrders();
  }, [props.activeCompanyId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (props.new.length === 0 && props.complete.length === 0) {
    return (
      <Grid item xs={12}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Project Frida Admin | No Orders`}</title>
        </Helmet>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <h3>No orders yet.</h3>
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`Project Frida Admin | Orders`}</title>
      </Helmet>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Orders rows={props.new} title={"New Orders"} />
        <Orders rows={props.complete} title={"Completed Orders"} />
      </Paper>
    </Grid>
  );
};

const mapState = (state: RootState): IMapState => ({
  activeCompanyId: state.user.activeCompanyId,
  new: state.orders.new,
  complete: state.orders.complete,
});
export default connect(mapState)(OrdersPage);
