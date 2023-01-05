import Portfolio from "./Portfolio";
import { useState } from "react";

export default function Portfolios({ selectedUser, setSelectedPortfolio }) {
  const [activePortfolio, setActivePortfolio] = useState();

  if (selectedUser) {
    return (
      <div className="h-[50vh] mt-20">
        {selectedUser.portfolios.map((portfolio) => {
          return (
            <Portfolio
              portfolio={portfolio}
              key={portfolio.portfolioId}
              setSelectedPortfolio={setSelectedPortfolio}
              setActivePortfolio={setActivePortfolio}
              activePortfolio={activePortfolio}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <h1 className="w-full text-center h-auto mt-[40vh] text-black">
        Please select a user first...
      </h1>
    );
  }
}
