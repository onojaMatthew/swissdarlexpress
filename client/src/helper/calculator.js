
export const shipmentTotal = (pieces, weight, unit) => {
  let charge;
  if (unit === "Kg") {
    charge = pieces * weight * 1500; // in kg
  } else {
    charge = pieces * weight * 22960; // in Tonne
  }
  
  return charge;
}