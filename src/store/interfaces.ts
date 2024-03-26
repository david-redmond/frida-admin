// reducers
import { IStepsTypes } from "../../../src/modules/cms/interface";
import { IThemeColors, IThemeLogo } from "../../../src/modules/theme/interface";
import { IProduct } from "../../../src/modules/products/interface";
import { IOrder } from '../../../src/modules/orders/interface';

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

export type AssociatedCompanies = Array<IAssociatedCompany>;

export interface IAssociatedCompany {
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    zipcode: string;
  };
  clientPublicId: string;
  email: string;
  id: string;
  name: string;
  person: string;
  phone: string;
  website: string;
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
