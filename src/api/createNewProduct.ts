import http from "../http";
import { toggleToastMessage } from "../store/actions";
import {INewProduct} from "../store/interfaces";

export default async (
  newProduct: INewProduct,
  activeCompanyId: string,
  dispatch: any,
  cleanUpAction: any,
) => {
  try {
    const data = {
      ...newProduct,
    };

    const response = await http.post(`/api/products/${activeCompanyId}`, data);

    if (response.status >= 200 && response.status <= 299) {
      dispatch(
        toggleToastMessage({
          message: `New product, ${newProduct.title}, was successfully created.`,
          showToast: "success",
        }),
      );
      cleanUpAction();
    }
  } catch (e: any) {
    console.error("Error: createNewProduct", e);
    dispatch(
      toggleToastMessage({
        message: "Error creating a new product.",
        showToast: "error",
      }),
    );
  }
};
