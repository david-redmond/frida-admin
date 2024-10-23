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
import {IOrder, IOrdersState, IProduct, IToggleToastMessage} from "./interfaces";

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

export const setWebsiteSettings = (responseData: any) => {
    const finalData = {
      type: SET_CMS_AND_THEME,
      landingContent: [...responseData.landingContent],
      checkoutContent: [...responseData.checkoutContent],
      theme:  {
        colors: responseData.colors,
        logos: responseData.logo,
      },
    };
    return finalData;
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
export const setOrders = (data: IOrder[]) => {
  const payload: IOrdersState  = { new: [], complete: [] };
  data.map(order => {
    if (order.status === 'placed') {
      payload.new.push(order);
    } else {
      payload.complete.push(order);
    }
  })
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
