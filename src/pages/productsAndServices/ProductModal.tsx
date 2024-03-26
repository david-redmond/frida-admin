import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { IProduct } from "../../../../src/modules/products/interface";
import http from "../../http";

interface ProductEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activeCompanyId: string;
  selectedProduct: IProduct | null;
  toggleToastMessage: any;
}

const ProductEditDialog: React.FC<ProductEditDialogProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  activeCompanyId,
  toggleToastMessage,
}) => {
  const [editedProduct, setEditedProduct] = useState<IProduct | null>(
    selectedProduct
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleChange = (field: string, value: string | boolean) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct!,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (isSaving) {
      return;
    }
    try {
      setIsSaving(true);
      if (!!editedProduct) {
        const response = await http.put(
          `/api/products/${activeCompanyId}/${editedProduct.productId}`,
          editedProduct
        );

        if (response.status >= 200 && response.status <= 299) {
          toggleToastMessage({
            message: `Changes to ${editedProduct.title} saved.`,
            showToast: "success",
          });
        }
      }
    } catch (e) {
      console.error("Error saving product", e);
      toggleToastMessage({
        message: `Error saving changes to the product, please try again....`,
        showToast: "error",
      });
    }
    setIsSaving(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={editedProduct?.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={editedProduct?.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          fullWidth
          multiline
          margin="normal"
        />
        <TextField
          label="Price"
          value={editedProduct?.price || ""}
          onChange={(e) => handleChange("price", e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration"
          value={editedProduct?.duration || ""}
          onChange={(e) => handleChange("duration", e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={editedProduct?.available || false}
              onChange={() =>
                handleChange("available", !editedProduct?.available)
              }
            />
          }
          label="Available"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditDialog;
