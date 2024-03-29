import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import {IOrder, IOrdersState, IProduct} from "../store/interfaces";
import {
  Button,
  Modal,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface IProps {
  rows: IOrdersState;
  title: string;
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Orders({ rows, title }: IProps) {
  const options: any = { day: "numeric", month: "short", year: "numeric" };

  const [selectedOrder, setSelectedOrder] = React.useState<
    IOrdersState[0] | null
  >(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const handleOrderClick = (order: IOrdersState[0]) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  const handleCompleteOrder = () => {
    // You can send an API request to complete the order here
    setOpenConfirmation(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Order Ref.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell align="right">Order Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: IOrder) => {
            const { customer, shippingAddress, timestamp, basket, orderRef } = row;
            const dateObject = new Date(timestamp);
            const name = `${customer.firstname} ${customer.surname}`;
            const address = shippingAddress
              ? `${shippingAddress.address1}, ${shippingAddress.address2}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zipCode}`
              : " - ";
            return (
              <TableRow key={orderRef} onClick={() => handleOrderClick(row)}>
                <TableCell>
                  {dateObject.toLocaleDateString("en-US", options)}
                </TableCell>
                <TableCell>{orderRef}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{address}</TableCell>
                <TableCell align="right">{`$${basket.total}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Order Details Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white", // Using backgroundColor instead of bgcolor
            borderRadius: 8,
            padding: "20px", // Using padding instead of p
          }}
        >
          <Typography variant="h6" align="center" sx={{mb: 2}}>
            Order Details
          </Typography>
          {selectedOrder && (
            <>
              <Typography>{`Order Ref: ${selectedOrder.orderRef}`}</Typography>
              <Typography>{`Basket Total: ${selectedOrder.basket.total}`}</Typography>
              {selectedOrder.basket.items.map((item: IProduct) => {
                return (
                  <Typography>
                    <div>{item.quantity}x</div>
                    <div>{item.title}</div>
                  </Typography>
                );
              })}
              <Typography>{`Basket Total: ${selectedOrder.basket.total}`}</Typography>
              {/* Display more order details as needed */}
              <Button
                variant="contained"
                color="primary"
                onClick={handleCompleteOrder}
                sx={{ mt: 2, width: "100%" }}
              >
                Complete Order
              </Button>
            </>
          )}
        </div>
      </Modal>

      {/* Order Completion Confirmation Dialog */}
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        <DialogTitle>Complete Order</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to complete this order?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
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
        See more orders
      </Link>
    </React.Fragment>
  );
}