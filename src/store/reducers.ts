import {
  AssociatedCompanies,
  CompanyState,
  IOrdersState,
  IProductState,
  IUIState,
  UserState,
  WebsiteSettingsState,
} from "./interfaces";
import {
  SET_ASSOCIATED_COMPANIES,
  SET_COMPANY_DETAILS,
  SET_USER_DETAILS,
  SET_USER_LOGGED_IN,
  SET_USER_LOGGED_OUT,
  SET_ACTIVE_COMPANY_ID,
  INITIALIZE_ACTIVE_COMPANY_ID,
  SET_TOAST_MESSAGES,
  SET_PRODUCTS,
  SET_PAGE_TITLE,
  SET_ALL_ORDERS,
  SET_CMS_AND_THEME,
} from "./constants";

const InitialUserState: UserState = {
  activeCompanyId: "",
  isLoggedIn: false,
  user: null,
};
export const userReducer = (
  state: UserState = InitialUserState,
  action: any,
): UserState => {
  switch (action.type) {
    case INITIALIZE_ACTIVE_COMPANY_ID:
    case SET_ACTIVE_COMPANY_ID:
      return {
        ...state,
        activeCompanyId: action.payload,
      };
    case SET_USER_DETAILS:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case SET_USER_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case SET_USER_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const associatedCompanyReducer = (
  state: AssociatedCompanies = [],
  action: any,
): AssociatedCompanies => {
  switch (action.type) {
    case SET_ASSOCIATED_COMPANIES:
      return [...action.payload];
    default:
      return state;
  }
};

export const companyReducer = (
  state: CompanyState = {},
  action: any,
): CompanyState => {
  switch (action.type) {
    case SET_COMPANY_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const InitialWebsiteSettingsState: WebsiteSettingsState = {
  landingContent: [],
  checkoutContent: [],
  allowedLandingComponents: ["PRODUCTS_STEP", "TIMESLOTS_STEP"],
  allowedCheckoutComponents: ["Contact_Details", "Shipping_address", "Review_your_order"],
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
    },
    logos: {
      alt: "",
      src: "",
    },
  },
};
export const websiteSettingsReducer = (
  state: WebsiteSettingsState = InitialWebsiteSettingsState,
  action: any,
): WebsiteSettingsState => {
  switch (action.type) {
    case SET_CMS_AND_THEME: {
      return {
        ...state,
        landingContent: [...action.landingContent],
        checkoutContent: [...action.checkoutContent],
        theme: { ...action.theme },
      };
    }
    case SET_ACTIVE_COMPANY_ID: {
      return {
        ...state,
        checkoutContent: [],
        landingContent: [],
      };
    }
    default:
      return state;
  }
};

const UIState: IUIState = {
  message: "",
  showToast: null,
  pageTitle: "",
};
export const uiReducer = (state: IUIState = UIState, action: any): IUIState => {
  switch (action.type) {
    case SET_TOAST_MESSAGES: {
      return {
        ...state,
        message: action.payload.message,
        showToast: action.payload.showToast,
      };
    }
    case SET_PAGE_TITLE: {
      return {
        ...state,
        pageTitle: action.payload,
      };
    }
    default:
      return state;
  }
};

const ProductState: IProductState = [];
export const productReducer = (
  state: IProductState = ProductState,
  action: any,
): IProductState => {
  switch (action.type) {
    case SET_PRODUCTS: {
      return [...action.payload];
    }
    default:
      return state;
  }
};

const OrdersState: IOrdersState = {
  new: [],
  complete: []
};
export const ordersReducer = (
  state: IOrdersState = OrdersState,
  action: any,
): IOrdersState => {
  switch (action.type) {
    case SET_ALL_ORDERS: {
      return action.payload;
    }
    default:
      return state;
  }
};
