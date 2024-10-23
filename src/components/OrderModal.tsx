import React from "react";
import { Modal, Typography, Button } from "@mui/material";
import { IBasketItem, IOrder } from "../store/interfaces";

interface OrderModalProps {
  open: boolean;
  selectedOrder: IOrder | null;
  handleClose: () => void;
  handleCompleteOrder: () => void;
}

const CleanerItem = (item: any) => {
  console.log(item);
  return (
    <div
      style={{
        borderTop: "1px solid grey",
        borderBottom: "1px solid grey",
        padding: 6,
      }}
    >
      <div>Cleaning: {item.attributes.propertyType}</div>
      <sub>
        {item.attributes.bed} Bedrooms, {item.attributes.bath} Bathrooms
      </sub>
      <div>Eircode: {item.zipCode}</div>
      {item.additionalOptions.length > 0 && (
        <div>
          <p>Additions</p>
          {item.additionalOptions.map((opt) => {
            return (
              <div>
                {opt.name} - {Number(opt.price).toFixed(2)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const OrderModal: React.FC<OrderModalProps> = ({
  open,
  selectedOrder,
  handleClose,
  handleCompleteOrder,
}) => {
  let basketItems: IBasketItem[] = [];
  if (!!selectedOrder) {
    basketItems =
      selectedOrder.orderType === "products"
        ? selectedOrder.basket.items
        : selectedOrder.basket.services;
  }
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          borderRadius: 8,
          padding: "20px",
        }}
      >
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          {!!selectedOrder && selectedOrder.orderType === "services"
            ? "Service Order Details"
            : "Product Order Details"}
        </Typography>
        {!selectedOrder ? (
          <>No order found</>
        ) : (
          <>
            <Typography>{`Order Ref: ${selectedOrder.orderRef}`}</Typography>
            <Typography>{`Order Status: ${selectedOrder.status}`}</Typography>
            <Typography>{`Order Type: ${selectedOrder.orderType}`}</Typography>
            <hr />
            <Typography>{`Customer: ${selectedOrder.customer.firstname} ${selectedOrder.customer.surname}`}</Typography>
            <Typography>{`Email: ${selectedOrder.customer.email}`}</Typography>
            <Typography>{`Phone: ${selectedOrder.customer.phone}`}</Typography>
            <hr />
            <br />
            <Typography>Order Items</Typography>
            {basketItems.map((item: IBasketItem, index: number) => {
              if (item.serviceId === "cleaner") {
                return <CleanerItem {...item} />;
              } else {
                return (
                  <Typography key={index}>
                    <div>{item.quantity}x</div>
                    <div>{item.title}</div>
                  </Typography>
                );
              }
            })}
            <br />
            <Typography>{`Payment Method: ${selectedOrder.paymentMethod}`}</Typography>
            <Typography>{`Basket Total: $${Number(selectedOrder.basket.total).toFixed(2)}`}</Typography>

            {!!selectedOrder.status && selectedOrder.status !== "complete" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleCompleteOrder}
                sx={{ mt: 2, width: "100%" }}
              >
                Complete Order
              </Button>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

export default OrderModal;
