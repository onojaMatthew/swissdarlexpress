import { combineReducers } from "redux";
import { shipment } from "./reducer_shipment";
import { users } from "./reducer_user";

export const rootReducer = combineReducers({
  shipment,
  users
});