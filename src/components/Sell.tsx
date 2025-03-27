import React, { useEffect, useState } from "react";
import "../../css/Sell.css";

export default function Sell() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`Sell ${loaded ? "loaded" : ""}`}>
      <h1>Sell Your Property</h1>
      <p>List your property and connect with potential buyers.</p>
      <button className="list-property-btn">List Your Property</button>
    </div>
  );
}
