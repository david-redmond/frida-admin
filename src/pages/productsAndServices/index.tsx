import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  setPageTitle,
  setProducts,
  toggleToastMessage,
} from "../../store/actions";
import {INewProduct, IProduct, RootState} from "../../store/interfaces";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal"; // Adjust this import based on your project structure
import { Create } from "@mui/icons-material";
import Spinner from "../../components/Spinner";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import fetchProducts from "../../api/fetchProducts";
import createNewProduct from "../../api/createNewProduct";
import {Helmet} from "react-helmet";

interface ProductPageProps {
  products: IProduct[];
  activeCompanyId: string;
  toggleToastMessage: any;
}

const ProductPage: React.FC<ProductPageProps> = (props: ProductPageProps) => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newProductDetails, setNewProductDetails] = useState<INewProduct>({
    title: "",
    description: "",
    price: 0,
    duration: null,
    available: true,
  });

  const getProducts = async () => {
    await fetchProducts(props.activeCompanyId, dispatch);
    setIsLoading(false);
  };

  useEffect(() => {
    dispatch(setPageTitle("Product Settings"));
  }, [dispatch]);

  useEffect(() => {
    getProducts();
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

  const handleCreateProduct = async () => {
    await createNewProduct(
      newProductDetails,
      props.activeCompanyId,
      dispatch,
      handleClose,
    );
    await fetchProducts(props.activeCompanyId, dispatch);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{`Project Frida Admin | Products`}</title>
          </Helmet>
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
          {props.products.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <h3>No products or services have been created yet.</h3>
              </Paper>
            </Grid>
          ) : (
            props.products.map((product) => (
              <ProductCard
                key={product.title}
                onEditClick={() => handleCardClick(product)}
                onDeleteClick={() => null}
                product={product}
              />
            ))
          )}
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
  ProductPage,
);
