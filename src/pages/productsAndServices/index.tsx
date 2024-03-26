import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import http from "../../http";
import {
  setPageTitle,
  setProducts,
  toggleToastMessage,
} from "../../store/actions";
import { RootState } from "../../store/interfaces";
import { IProduct } from "../../../../src/modules/products/interface";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal"; // Adjust this import based on your project structure
import { Create } from "@mui/icons-material";

interface ProductPageProps {
  products: IProduct[];
  setProducts: any;
  activeCompanyId: string;
  toggleToastMessage: any;
}

const ProductPage: React.FC<ProductPageProps> = (props: ProductPageProps) => {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newProductDetails, setNewProductDetails] = useState({
    title: "",
    description: "",
    price: 0,
    duration: "",
    available: true,
  });

  const fetchProducts = async () => {
    const response = await http.get(`/api/products/${props.activeCompanyId}`);

    if (!!response && !!response.data) {
      props.setProducts(response.data);
    }
    setIsLoading(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle("Product Settings"));
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [props.activeCompanyId]);

  const handleCardClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleClose = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsCreating(false);
    setNewProductDetails({
      title: "",
      description: "",
      price: 0,
      duration: "",
      available: true,
    });
  };

  const handleCreateProduct = () => {
    // Add logic to handle the creation of a new product
    // You may dispatch an action, update state, or make an API call
    // After creating, close the modal
    // Ensure you validate the input details before proceeding
    handleClose();
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <div
            style={{
              marginBottom: "26px",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateClick}
            >
              <Create />
            </Button>
          </div>
          {props.products.map((product) => (
            <ProductCard
              key={product.title}
              onEditClick={() => handleCardClick(product)}
              onDeleteClick={() => null}
              product={product}
            />
          ))}
        </>
      )}

      {selectedProduct && (
        <ProductModal
          isOpen={isEditing}
          onClose={handleClose}
          selectedProduct={selectedProduct}
          activeCompanyId={props.activeCompanyId}
          toggleToastMessage={props.toggleToastMessage}
        />
      )}

      {isCreating && (
        <Dialog open={isCreating} onClose={handleClose}>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              value={newProductDetails.title}
              onChange={(e) =>
                setNewProductDetails({
                  ...newProductDetails,
                  title: e.target.value,
                })
              }
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={newProductDetails.description}
              onChange={(e) =>
                setNewProductDetails({
                  ...newProductDetails,
                  description: e.target.value,
                })
              }
            />
            <TextField
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              value={newProductDetails.price}
              onChange={(e) =>
                setNewProductDetails({
                  ...newProductDetails,
                  price: +e.target.value,
                })
              }
            />
            <TextField
              label="Duration"
              fullWidth
              margin="normal"
              value={newProductDetails.duration}
              onChange={(e) =>
                setNewProductDetails({
                  ...newProductDetails,
                  duration: e.target.value,
                })
              }
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Availability</InputLabel>
              <Select
                value={newProductDetails.available}
                onChange={(e) =>
                  setNewProductDetails({
                    ...newProductDetails,
                    available: e.target.value as boolean,
                  })
                }
              >
                <MenuItem value={"true"}>Available</MenuItem>
                <MenuItem value={"false"}>Unavailable</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleCreateProduct} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  activeCompanyId: state.user.activeCompanyId,
});

export default connect(mapStateToProps, { setProducts, toggleToastMessage })(
  ProductPage
);
