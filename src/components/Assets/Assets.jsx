import Asset from "../Asset/Asset";

export default function Assets({ selectedPortfolio, selectedRadioBtn_Portfolio }) {
  
  function comparePortfolios(p1, p2) {
    switch (selectedRadioBtn_Portfolio) {
      case "name":
        return p1.assetName > p2.assetName ? 1 : -1;
      case "type":
        return p1.assetType > p2.assetType ? 1 : -1;
      case "location":
        return p1.location > p2.location ? 1 : -1;
      case "quantity":
        return p1.quantity > p2.quantity ? 1 : -1;
      case "total value":
        return p1.quantity * p1.valuePerAsset > p2.quantity * p2.valuePerAsset
          ? 1
          : -1;
      case "capital gain":
        return p1.quantity * p1.capitalGainPerAsset >
          p2.quantity * p2.capitalGainPerAsset
          ? 1
          : -1;
      case "risk":
        return p1.quantity * p1.associatedRiskPerAsset >
          p2.quantity * p2.associatedRiskPerAsset
          ? 1
          : -1;
      default:
        console.log("no comparison ran");
    }
  }

  if (selectedPortfolio) {
    return (selectedPortfolio.assets.sort(comparePortfolios).map((asset) => {
      return <Asset asset={asset} key={asset.isin} />;
    }))
  } else {
    return <p className="w-fit mx-auto mt-[40vh]">...then select a portfolio.</p>;
  }
}

