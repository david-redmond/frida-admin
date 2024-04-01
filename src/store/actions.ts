import {
  INITIALIZE_ACTIVE_COMPANY_ID,
  SET_ACTIVE_COMPANY_ID,
  SET_ALL_ORDERS,
  SET_ASSOCIATED_COMPANIES,
  SET_CMS_AND_THEME,
  SET_COMPANY_DETAILS,
  SET_PAGE_TITLE,
  SET_PRODUCTS,
  SET_TOAST_MESSAGES,
  SET_USER_DETAILS,
  SET_USER_LOGGED_IN,
  SET_USER_LOGGED_OUT
} from "./constants";
import {IProduct, IToggleToastMessage} from "./interfaces";
import { IOrder } from "../../../src/modules/orders/interface";

export const setUserDetails = (user: any) => {
  return {
    type: SET_USER_DETAILS,
    payload: user,
  };
};
export const setUserLoggedIn = () => {
  return {
    type: SET_USER_LOGGED_IN,
  };
};
export const setUserLoggedOut = () => {
  return {
    type: SET_USER_LOGGED_OUT,
  };
};

export const setAssociatedCompanies = (companies: any[]) => {
  return {
    type: SET_ASSOCIATED_COMPANIES,
    payload: companies,
  };
};

export const initializeActiveCompanyId = (companyId: string) => {
  return {
    type: INITIALIZE_ACTIVE_COMPANY_ID,
    payload: companyId,
  };
};
export const setActiveCompanyId = (companyId: string) => {
  return {
    type: SET_ACTIVE_COMPANY_ID,
    payload: companyId,
  };
};
export const setCompanyDetails = (company: any) => {
  return {
    type: SET_COMPANY_DETAILS,
    payload: company,
  };
};

export const setCMS = (responseData: any) => {
  return {
    type: SET_CMS_AND_THEME,
    landingContent: [],
    checkoutContent: [],
    theme: {
      colors: {
        primaryLight: "",
        primary: "",
        primaryDark: "",
        secondaryLight: "",
        secondary: "",
        secondaryDark: "",
        secondaryText: "",
        primaryText: "",
        ...responseData,
      },
      logos: {
        alt: "",
        src: "",
        ...responseData,
      },
    },
  };
};

export const setPageTitle = (payload: string) => {
  return {
    type: SET_PAGE_TITLE,
    payload,
  };
};

export const setProducts = (payload: IProduct[]) => {
  return {
    type: SET_PRODUCTS,
    payload,
  };
};
export const setOrders = (payload: IOrder[]) => {
  return {
    type: SET_ALL_ORDERS,
    payload,
  };
};

export const toggleToastMessage = (payload: IToggleToastMessage) => {
  return {
    type: SET_TOAST_MESSAGES,
    payload,
  };
};
