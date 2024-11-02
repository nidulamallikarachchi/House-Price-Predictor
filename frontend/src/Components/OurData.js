import React from 'react';
import Visualization1 from "./Visualizations/Visualization1";
import Visualization2 from "./Visualizations/Visualization2";
import Visualization3 from "./Visualizations/Visualization3";
import Visualization4 from "./Visualizations/Visualization4";
import CrimeChoroplethMap from "./Visualizations/CrimeChoroplethMap";

const OurData = () => {
  return(
      <ul>
        <li><Visualization1/></li>
        <li><Visualization2/></li>
        <li><Visualization3/></li>
          <li><Visualization4/></li>
          <li><CrimeChoroplethMap/></li>
      </ul>

  );
};

export default OurData;
