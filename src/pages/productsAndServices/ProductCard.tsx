import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import { IProduct } from "../../../../src/modules/products/interface";
import { Delete, Edit } from "@mui/icons-material";

interface ProductCardProps {
  product: IProduct;
  onEditClick: (product: any) => void;
  onDeleteClick: (product: any) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onEditClick, onDeleteClick }) => {
  const [isEnabled, setEnabled] = useState(product.available);

  const handleToggle = () => {
    setEnabled(!isEnabled);
    // Add logic to update the availability status in the state or dispatch an action.
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", borderRadius: 8 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={2}>
              <Typography variant="h5" component="div" gutterBottom>
                {product.title}
              </Typography>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Price: {product.price} | Duration: {product.duration} | Product
                ID: {product.productId}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {product.available
                  ? "Available to purchase"
                  : "Unavailable for purchase"}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{justifyContent: "right"}}>
        <Button size="small" onClick={() => onEditClick(product)}>
          <Edit />
        </Button>
        <Button size="small" onClick={() => onDeleteClick(product)}>
          <Delete />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
