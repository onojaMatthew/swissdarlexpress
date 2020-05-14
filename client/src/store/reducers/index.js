import { combineReducers } from "redux";
import { shipment } from "./reducer_shipment";
import { users } from "./reducer_user";
import { units } from "./reducer_unit"

export const rootReducer = combineReducers({
  shipment,
  users,
  units
});