
export default function Portfolios({ props }) {
  return (
    <div className="portfolio">
      <h1>Portfolio Name</h1>
      <h2>{props.portfolioName}</h2>
      <p>{props.restrictionStatus}</p>
    </div>
  );
}