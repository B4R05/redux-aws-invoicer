import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import invoicesReducer from "./invoicesReducer";
import authReducer from "./authReducer";

export default combineReducers({
  form: formReducer,
  authToken: authReducer,
  invoices: invoicesReducer
});
