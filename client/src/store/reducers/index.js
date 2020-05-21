import { combineReducers } from "redux";
import { shipment } from "./reducer_shipment";
import { users } from "./reducer_user";
import { units } from "./reducer_unit";
import { auth } from "./reducer_auth";
import { customer } from "./reducer_customer";
import { report } from "./reducer_report";
 
export const rootReducer = combineReducers({
  shipment,
  users,
  units,
  auth,
  customer,
  report
});