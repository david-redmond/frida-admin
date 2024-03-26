import { combineReducers, Reducer, createStore } from "redux";
import { RootState } from "./interfaces";
import {
  userReducer,
  companyReducer,
  associatedCompanyReducer,
  websiteSettingsReducer,
  uiReducer,
  productReducer,
  ordersReducer,
} from "./reducers";

const rootReducer: Reducer<RootState> | any = combineReducers({
  associatedCompanies: associatedCompanyReducer,
  company: companyReducer,
  orders: ordersReducer,
  products: productReducer,
  ui: uiReducer,
  user: userReducer,
  websiteSettings: websiteSettingsReducer,
});

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
