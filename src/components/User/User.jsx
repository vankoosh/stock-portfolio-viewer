import { useEffect, useState } from "react";
import "./User.css";

export default function User({ props }) {
  
  // let netWorth = 0;
  const [netWorth, setNetWorth] = useState(0)
  // console.log(netWorth)
  

  useEffect(() => {
    let tempNetWorth = 0;
    props.portfolios.forEach((portfolio) => {
      portfolio.assets.forEach((asset) => {
        tempNetWorth += asset.quantity * asset.valuePerAsset
      });
    });
    setNetWorth(tempNetWorth)
  },[])

  

  return (
    <div className="user">
      <h1>
        {props.firstName} {props.lastName}
      </h1>
      <p>Risk Profile: {props.riskProfile}</p>
      <p>Net Worth: {netWorth}</p>

      {props.portfolios.map((portfolio) => {
        return (
          <p key={portfolio.portfolioId + " portNames"}>
            {portfolio.portfolioName}
          </p>
        );
      })}

      <p>
        Restriction Statuses:<br></br>
      </p>

      {props.portfolios.map((portfolio) => {
        return (
          <p key={portfolio.portfolioId + " portStatus"}>
            {portfolio.portfolioId} ":" {portfolio.restrictionStatus}
          </p>
        );
      })}
      {/* <p>Aggregated Cap. Gain:{aggCapGain}</p>       */}
    </div>
  );
}
