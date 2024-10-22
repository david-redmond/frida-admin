export interface INewProduct {
  title: string;
  description: string;
  price: number;
  duration: string | null;
  available: boolean;
}
export interface IProduct extends INewProduct {
  clientId: string;
  duration: string | null;
  image: string;
  productId: string;
  quantity?: number;
}
export interface UserState {
  isLoggedIn: boolean;
  activeCompanyId: string;
  user: IUser | null;
}

export interface IUser {
  id: string;
  firstname: string;
  surname: string;
  email: string;
  image?: string;
  attributes: {
    associatedClients?: string[];
  };
}

export type AssociatedCompanies = Array<ICompany>;

export interface INewCompany {
  name: string;
  published: boolean;
  promoted: boolean;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
  };
  contact: {
    person: string;
    position: IUserPositionType;
    email: string;
    phone: string;
    website: string;
  };
}

export type IUserPositionType = "owner" | "admin" | "standard";

export interface ICompany extends INewCompany {
  id: string;
  clientPublicId: string;
  published: boolean;
}

export interface CompanyState {
  // Define the type for company state
}

export type ILandingStepsTypes = "PRODUCTS_STEP" | "TIMESLOTS_STEP";

export type ICheckoutStepsTypes = "Contact_Details" | "Shipping_address" | "Review_your_order"; // | "Payment_details";

export interface IThemeColors {
  primaryLight: string;
  primary: string;
  primaryDark: string;
  secondaryLight: string;
  secondary: string;
  secondaryDark: string;
  secondaryText: string;
  primaryText: string;
}

export interface IThemeLogo {
  alt: string;
  src: string;
}
export interface WebsiteSettingsState {
  landingContent: ILandingStepsTypes[];
  allowedLandingComponents: ILandingStepsTypes[];
  checkoutContent: ICheckoutStepsTypes[];
  allowedCheckoutComponents: ICheckoutStepsTypes[];
  theme: {
    colors: IThemeColors;
    logos: IThemeLogo;
  };
}

export interface IUIState {
  message: string;
  showToast: IShowToastStates;
  pageTitle: string;
}
export type IProductState = IProduct[];

export interface IBasket {
  total: number;
  items: IProduct[];
}
export interface ICustomer {
  firstname: string;
  surname: string;
  email: string;
  phone: string;
}

export interface IAddress {
  firstname: string;
  surname: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface IOrder {
  orderRef: number;
  timestamp: string;
  _id: string;
  clientId: string;
  customer: ICustomer;
  basket: IBasket;
  shippingAddress?: IAddress;
}
export type IOrdersState = IOrder[];

export interface RootState {
  associatedCompanies: AssociatedCompanies;
  company: CompanyState;
  products: IProductState;
  orders: IOrdersState;
  ui: IUIState;
  user: UserState;

  websiteSettings: WebsiteSettingsState;
}

export interface IToggleToastMessage {
  message: string;
  showToast: IShowToastStates;
}

export type IShowToastStates = "success" | "info" | "error" | null;
