import "./App.css";
import userListJson from "./data.json";
import { useState } from "react";
import User from "./components/User";
import Portfolios from "./components/Portfolios";
import Assets from "./components/Assets";
import UserFilter from "./components/UserFilter";
import AssetFilter from "./components/AssetFilter";

function App() {
  const aggregatedArray = aggregatedArr(
    JSON.parse(JSON.stringify(userListJson))
  );

  const [selectedRadioBtn_User, setSelectedRadioBtn_User] = useState("name");
  const [selectedRadioBtn_Portfolio, setSelectedRadioBtn_Portfolio] =
    useState("name");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedPortfolio, setSelectedPortfolio] = useState();
  const [activeUser, setActiveUser] = useState();

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
      console.log("aggregation ran")
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
  }

  return (
    <div className="flex justify-between font-oswald w-screen h-screen">
      <main className="h-screen w-[33vw]">
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
      </main>

      <aside className="relative h-screen pt-10 w-[33vw]">
        <h1 className="text-2xl text-center text-black">
          CUSTOMER PORTFOLIOS:
        </h1>
        <Portfolios
          selectedUser={selectedUser}
          setSelectedPortfolio={setSelectedPortfolio}
        />
      </aside>

      <aside className="relative h-screen w-[33vw]">
        <AssetFilter
          selectedRadioBtn_Portfolio={selectedRadioBtn_Portfolio}
          setSelectedRadioBtn_Portfolio={setSelectedRadioBtn_Portfolio}
        />
        <h1 className="text-2xl text-center fixed top-10 bg-[#caced3] w-[30vw] text-black">
          CUSTOMER ASSETS:
        </h1>
        <Assets
          selectedPortfolio={selectedPortfolio}
          selectedRadioBtn_Portfolio={selectedRadioBtn_Portfolio}
        />
      </aside>
    </div>
  );
}

export default App;
