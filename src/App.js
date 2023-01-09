import "./App.css";
import userListJson from "./data.json";
import { useState } from "react";
import User from "./components/User";
import Portfolio from "./components/Portfolio";
import UserFilter from "./components/UserFilter";
import AssetFilter from "./components/AssetFilter";
import Asset from "./components/Asset";

function App() {
  

  const [selectedRadioBtn_User, setSelectedRadioBtn_User] = useState("name");
  const [selectedRadioBtn_Portfolio, setSelectedRadioBtn_Portfolio] =
    useState("name");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedPortfolio, setSelectedPortfolio] = useState();
  const [activeUser, setActiveUser] = useState();
  const [activePortfolio, setActivePortfolio] = useState();

  const aggregatedArray = aggregatedArr(
    JSON.parse(JSON.stringify(userListJson))
  );

  function aggregatedArr(arr) {
    //STEP 1 - aggregate restriction statuses
    const arrWithRestriction = arr.map((user) => {
      if (
        user.portfolios.some(
          (status) => status.restrictionStatus === "breached"
        )
      ) {
        return {
          aggRestrictionStatus: "breached",
          ...user,
        };
      } else {
        return {
          aggRestrictionStatus: "clean",
          ...user,
        };
      }
    });

    //STEP 2 - aggregate net worth
    const arrWithRestrictionAndWorth = arrWithRestriction.map((user) => {
      let tempNetWorth = 0;

      user.portfolios.map((portfolio) => {
        return portfolio.assets.map((asset) => {
          return (tempNetWorth += asset.quantity * asset.valuePerAsset);
        });
      });
      return {
        aggNetWorth: tempNetWorth,
        ...user,
      };
    });

    //STEP 3 - aggregate net worth
    const arrWithRestrictionWorthAndGain = arrWithRestrictionAndWorth.map(
      (user) => {
        let tempCapGain = 0;
        user.portfolios.map((portfolio) => {
          return portfolio.assets.map((asset) => {
            return (tempCapGain +=
              asset.quantity * (asset.capitalGainPerAsset * 1));
          });
        });
        return {
          aggCapGain: tempCapGain,
          ...user,
        };
      }
    );
    return arrWithRestrictionWorthAndGain;
  }

  function compareUsers(p1, p2) {
    switch (selectedRadioBtn_User) {
      case "name":
        return p1.firstName > p2.firstName ? 1 : -1;
      case "risk":
        return p1.riskProfile > p2.riskProfile ? 1 : -1;
      case "worth":
        return p1.aggNetWorth > p2.aggNetWorth ? 1 : -1;
      case "restriction":
        return p1.aggRestrictionStatus > p2.aggRestrictionStatus ? 1 : -1;
      case "gain":
        return p1.aggNetGain > p2.aggNetGain ? 1 : -1;
      default:
        console.log("no comparison ran");
    }
    console.log("compare function ran");
  }

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
    console.log("compare portfolios ran");
  }

  return (
    <main className="flex justify-between font-oswald w-screen h-screen">
      <section className="h-screen w-[33vw]">
        <UserFilter
          selectedRadioBtn_User={selectedRadioBtn_User}
          setSelectedRadioBtn_User={setSelectedRadioBtn_User}
        />
        <h1 className="text-2xl text-center fixed top-10 bg-[#caced3] w-[33vw] text-black">
          CUSTOMERS:
        </h1>
        <div className="flex-col h-[90vh] mt-20 overflow-auto">
          {aggregatedArray.sort(compareUsers).map((user) => {
            return (
              <User
                user={user}
                key={user.clientId}
                setSelectedUser={setSelectedUser}
                setActiveUser={setActiveUser}
                activeUser={activeUser}
              />
            );
          })}
        </div>
      </section>

      <section className="relative h-screen pt-10 w-[33vw]">
        <h1 className="text-2xl text-center text-black">
          CUSTOMER PORTFOLIOS:
        </h1>
        {selectedUser ? (
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
        ) : (
          <h1 className="absolute w-full text-center h-auto top-[50vh] text-black">
            Please select a user first...
          </h1>
        )}
      </section>

      <section className="relative h-screen w-[33vw]">
        <AssetFilter
          selectedRadioBtn_Portfolio={selectedRadioBtn_Portfolio}
          setSelectedRadioBtn_Portfolio={setSelectedRadioBtn_Portfolio}
        />
        <h1 className="text-2xl text-center fixed top-10 bg-[#caced3] w-[30vw] text-black">
          CUSTOMER ASSETS:
        </h1>
        <div className="h-[90vh] mt-20 overflow-auto">
          {selectedPortfolio ? (
            selectedPortfolio.assets.sort(comparePortfolios).map((asset) => {
              return <Asset asset={asset} key={asset.isin} />;
            })
          ) : (
            <h1 className="absolute w-full text-center h-auto top-[50vh] text-black">
              ...then select a portfolio.
            </h1>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
