export const SET_USER_DETAILS: string = "SET_USER_DETAILS";
export const SET_USER_LOGGED_IN: string = "SET_USER_LOGGED_IN";
export const SET_COMPANY_DETAILS: string = "SET_COMPANY_DETAILS";
export const SET_USER_LOGGED_OUT: string = "SET_USER_LOGGED_OUT";
export const SET_ASSOCIATED_COMPANIES: string = "SET_ASSOCIATED_COMPANIES";
export const SET_ACTIVE_COMPANY_ID: string = "SET_ACTIVE_COMPANY_ID";
export const INITIALIZE_ACTIVE_COMPANY_ID: string =
  "INITIALIZE_ACTIVE_COMPANY_ID";
export const SET_CMS_AND_THEME: string = "SET_CMS_AND_THEME";
export const SET_PRODUCTS: string = "SET_PRODUCTS";
export const SET_TOAST_MESSAGES: string = "SET_TOAST_MESSAGES";
export const SET_PAGE_TITLE: string = "SET_PAGE_TITLE";
export const SET_ALL_ORDERS: string = "SET_ALL_ORDERS";

export const CMS_SECTIONS: {
  [key: string]: { key: number; id: string; name: string; description: string };
} = {
  CUSTOMER_DETAILS: {
    key: 0,
    id: "CUSTOMER_DETAILS",
    name: "Customer Details Section",
    description:
      "This is a form where a user can add their personal details to the order. It is useful for appointment reservations",
  },
  PRODUCTS_STEP: {
    key: 1,
    id: "PRODUCT_STEP",
    name: "Product Details Section",
    description:
      "Use this to showcase your products on the website. Customers csn add to the basket from here.",
  },
  TIMESLOTS_STEP: {
    key: 2,
    id: "TIMESLOT_STEP",
    name: "Reservation Section",
    description:
      "Here a customer can book an appointment to visit your service. Perfect for service based businesses.",
  },
};
