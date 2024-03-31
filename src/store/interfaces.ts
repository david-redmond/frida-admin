// reducers
import { IStepsTypes } from "../../../src/modules/cms/interface";
import { IThemeColors, IThemeLogo } from "../../../src/modules/theme/interface";

export interface IProduct {
  available: boolean;
  clientId: string;
  description: string;
  duration: string | null;
  image: string;
  price: number;
  productId: string;
  quantity?: number;
  title: string;
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
  position: string;
  image: string;
  associatedClients: string[];
}

export type AssociatedCompanies = Array<ICompany>;

export interface INewCompany {
  name: string;
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
}

export interface CompanyState {
  // Define the type for company state
}
export interface WebsiteSettingsState {
  cms: IStepsTypes[];
  possibleCmsComponents: IStepsTypes[];
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
