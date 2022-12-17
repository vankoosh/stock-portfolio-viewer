import Portfolio from "../Portfolio/Portfolio";
import Assets from "../Asset/Asset";
import { useState, useEffect } from "react";
import "./Portfolios.css";

export default function Portfolios({ props }) {
  const [selectedPortfolio, setSelectedPortfolio] = useState();

  const handlePortfolioClick = (selectedPortfolio) => {
    setSelectedPortfolio(selectedPortfolio);
  };

  if (props) {
    return props.portfolios.map((portfolio) => {
      return (
        <Portfolio
          props={portfolio}
          key={portfolio.portfolioId}
          handlePortfolioClick={handlePortfolioClick}
        />
      );
    });
  } else {
    return <h1>Please select a user...</h1>;
  }

  
}
