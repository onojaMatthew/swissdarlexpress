import React, { Component } from 'react';
 
// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to 
// keep file size down
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
 
 

 
const StateInfo = ({
  stateName, setState
}) => {
  const country = "Nigeria";
  return (
    <div>
      {/* <CountryDropdown
        value={country}
        onChange={(val) => this.selectCountry(val)} /> */}
      <RegionDropdown
        style={{ background: "#fff", padding: "5px", width: "100%" }}
        country={country}
        value={stateName}
        onChange={(val) => setState(val)} />
    </div>
  );
}


export default StateInfo;
