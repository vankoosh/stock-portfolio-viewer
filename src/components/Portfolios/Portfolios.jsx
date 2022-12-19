import Portfolio from "../Portfolio/Portfolio";
import "./Portfolios.css";

export default function Portfolios({ props, setSelectedPortfolio }) {
  

  if (props) {
    return props.portfolios.map((portfolio) => {
      return (
        <Portfolio
          props={portfolio}
          key={portfolio.portfolioId}
          setSelectedPortfolio={setSelectedPortfolio}
        />
      );
    });
  } else {
    return <h1>Please select a user...</h1>;
  }
}
