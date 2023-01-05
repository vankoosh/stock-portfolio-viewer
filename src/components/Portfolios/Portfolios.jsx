import Portfolio from "../Portfolio/Portfolio";
import { useState } from "react";

export default function Portfolios({ selectedUser, setSelectedPortfolio }) {
  const [activePortfolio, setActivePortfolio] = useState();

  

  if (selectedUser) {
    return selectedUser.portfolios.map((portfolio) => {
      return (
        <Portfolio
          portfolio={portfolio}
          key={portfolio.portfolioId}
          setSelectedPortfolio={setSelectedPortfolio}
          setActivePortfolio={setActivePortfolio}
          activePortfolio={activePortfolio}
        />
      );
    });
  } else {
    return (
      <h1 className="w-full text-center h-auto mt-[40vh]">
        Please select a user first...
      </h1>
    );
  }
}
