export default function Portfolio({ portfolio, setSelectedPortfolio, activePortfolio, setActivePortfolio }) {

  const portfolioStyle =
    "p-2 py-4 rounded-lg text-white hover:cursor-pointer w-[20vw] mx-auto px-8 my-4 hover:bg-green-800";

  return (
    <div
      id={portfolio.portfolioId}
      className={
        activePortfolio === portfolio.portfolioId
          ? `${portfolioStyle} bg-green-800 `
          : `${portfolioStyle} bg-[#014885] `
      }
      onClick={(e) => {
        setSelectedPortfolio(portfolio);
        setActivePortfolio(e.currentTarget.id);
      }}
    >
      <h2>
        Portfolio Name: <span className="ml-4">{portfolio.portfolioName}</span>
      </h2>
      <p>
        Restriction Status:{" "}
        <span
          className={
            portfolio.restrictionStatus === "breached"
              ? "ml-4 text-red-900"
              : "ml-4 text-white"
          }
        >
          {portfolio.restrictionStatus}
        </span>
      </p>
    </div>
  );
}
