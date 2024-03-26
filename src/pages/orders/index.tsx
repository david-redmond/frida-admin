import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { setOrders, setPageTitle } from "../../store/actions";
import http from "../../http";
import { useState } from "react";
import { IOrdersState, RootState } from "../../store/interfaces";
import Orders from "../../components/Orders";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

interface IProps extends IMapState {}

interface IMapState {
  activeCompanyId: string;
  orders: IOrdersState;
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

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Orders rows={props.orders} title={"New Orders"}/>
      </Paper>
    </Grid>
  );
};

const mapState = (state: RootState): IMapState => ({
  activeCompanyId: state.user.activeCompanyId,
  orders: state.orders,
});
export default connect(mapState)(OrdersPage);
