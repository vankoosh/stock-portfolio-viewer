import "./Portfolio.css";

export default function Portfolio({ props, handlePortfolioClick }) {
  return (
    <div
      className="portfolio"
      onClick={() => {
        handlePortfolioClick(props.portfolioId);
      }}
    >
      <h2>Portfolio Name: {props.portfolioName}</h2>
      <p>Restriction Status: {props.restrictionStatus}</p>
    </div>
  );
}
