import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { IOrder } from "../store/interfaces";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import OrderModal from "./OrderModal";
import http from "../http";
import { setOrders } from "../store/actions";
import { useDispatch } from "react-redux"; // Import the new modal component

interface IProps {
  rows: IOrder[];
  title: string;
  activeCompanyId: string;
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders({ rows, title, activeCompanyId }: IProps) {
  const options: any = { day: "numeric", month: "short", year: "numeric" };

  const [selectedOrder, setSelectedOrder] = React.useState<IOrder | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);
  const dispatch = useDispatch();
  const handleOrderClick = (order: IOrder) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCompleteOrder = () => {
    setOpenConfirmation(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenConfirmation(false);
  };

  const fetchOrders = async () => {
    const response = await http.get(`/api/orders/${activeCompanyId}`);

    if (!!response && !!response.data) {
      dispatch(setOrders(response.data));
    }
  };
  const handleCloseConfirmation = async () => {
    if (!selectedOrder) {
      return;
    }
    // complete order.
    setOpenConfirmation(false);
    setOpenModal(false);
    // send API req
    await http.post(
      `/api/orders/${activeCompanyId}/complete/${selectedOrder._id}`,
    );
    // get new Orders
    await fetchOrders();
  };

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 700 }}>Date</TableCell>
            <TableCell style={{ fontWeight: 700 }}>Status</TableCell>
            <TableCell style={{ fontWeight: 700 }}>Order Ref.</TableCell>
            <TableCell style={{ fontWeight: 700 }}>Customer Name</TableCell>
            <TableCell style={{ fontWeight: 700 }}>Order Type</TableCell>
            <TableCell align="right" style={{ fontWeight: 700 }}>
              Order Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: IOrder) => {
            const { customer, orderType, status, timestamp, basket, orderRef } =
              row;
            const dateObject = new Date(timestamp);
            const name = `${customer.firstname} ${customer.surname}`;

            return (
              <TableRow key={orderRef} onClick={() => handleOrderClick(row)}>
                <TableCell>
                  {dateObject.toLocaleDateString("en-US", options)}
                </TableCell>
                <TableCell style={{ textTransform: "capitalize" }}>
                  {status}
                </TableCell>
                <TableCell>{orderRef}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell style={{ textTransform: "capitalize" }}>
                  {orderType}
                </TableCell>
                <TableCell align="right">{`$${Number(basket.total).toFixed(2)}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Use the new OrderModal component */}
      <OrderModal
        open={openModal}
        selectedOrder={selectedOrder}
        handleClose={handleCloseModal}
        handleCompleteOrder={handleCompleteOrder}
      />

      {/* Order Completion Confirmation Dialog */}
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Complete Order</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to complete this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            No
          </Button>
          <Button onClick={handleCloseConfirmation} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Link
        color="primary"
        href="src/components#"
        onClick={preventDefault}
        sx={{ mt: 3, display: "block", textAlign: "right" }}
      >
        {/*See more orders*/}
      </Link>
    </React.Fragment>
  );
}
