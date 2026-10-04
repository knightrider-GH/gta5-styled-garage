import React from "react";

function FuelMarquee() {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        <span className="marquee-item">Petrol: ₹104.21/L</span>
        <span className="marquee-item">Diesel: ₹92.15/L</span>
        <span className="marquee-item">EV Charging: ₹15/kWh</span>
        <span className="marquee-item">CNG: ₹75.50/kg</span>
      </div>
    </div>
  );
}

export default FuelMarquee;