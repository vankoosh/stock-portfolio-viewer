import React, { useState } from "react";
import User from "../User/User";
import Portfolios from "../Portfolios/Portfolios";
import Assets from "../Assets/Assets";
import userListJson from "../../data.json";
import "./Viewer.css";

export default function Viewer() {
  const res = JSON.stringify(userListJson);
  const arr = JSON.parse(res);
  const aggregatedArray = aggregatedArr(arr);

  const [selectedRadioBtn_User, setSelectedRadioBtn_User] = useState("name");
  const [selectedRadioBtn_Portfolio, setSelectedRadioBtn_Portfolio] =
    useState("name");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedPortfolio, setSelectedPortfolio] = useState();
  const [activeUser, setActiveUser] = useState();

  function aggregatedArr(arr) {
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

    //end of aggregated restriction status logic
    const arrWithRestrictionAndWorth = arrWithRestriction.map((user) => {
      let tempNetWorth = 0;

      user.portfolios.forEach((portfolio) => {
        portfolio.assets.forEach((asset) => {
          tempNetWorth += asset.quantity * asset.valuePerAsset;
        });
      });
      return {
        aggNetWorth: tempNetWorth,
        ...user,
      };
    });
    //end of net worth logic
    const arrWithRestrictionWorthAndGain = arrWithRestrictionAndWorth.map(
      (user) => {
        let tempCapGain = 0;
        user.portfolios.forEach((portfolio) => {
          portfolio.assets.forEach((asset) => {
            tempCapGain += asset.quantity * (asset.capitalGainPerAsset * 1);
          });
        });
        return {
          aggCapGain: tempCapGain,
          ...user,
        };
      }
    );
    //end of cap gain logic
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

  function handleRadioClick_User(e) {
    setSelectedRadioBtn_User(e.currentTarget.value);
  }

  function handleRadioClick_Portfolio(e) {
    setSelectedRadioBtn_Portfolio(e.currentTarget.value);
  }

  return (
    <div className="flex justify-between font-oswald w-screen h-screen">
      <main className="h-screen w-[33vw]">
        <form
          action="/"
          className="fixed top-0 bg-[#caced3] w-auto left-[5vw] mx-auto h-8"
        >
          <input
            type="radio"
            name="sort"
            value="name"
            checked={selectedRadioBtn_User === "name" ? true : false}
            onChange={handleRadioClick_User}
          />
          &nbsp;Name
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="risk"
            checked={selectedRadioBtn_User === "risk" ? true : false}
            onChange={handleRadioClick_User}
          />
          &nbsp;Risk Profile
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="worth"
            checked={selectedRadioBtn_User === "worth" ? true : false}
            onChange={handleRadioClick_User}
          />
          &nbsp;Net Worth
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="restriction"
            checked={selectedRadioBtn_User === "restriction" ? true : false}
            onChange={handleRadioClick_User}
          />
          &nbsp;Restriction Status
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="gain"
            checked={selectedRadioBtn_User === "gain" ? true : false}
            onChange={handleRadioClick_User}
          />
          &nbsp;Capital Gain
        </form>
        <h1 className="text-2xl text-center fixed top-10 bg-[#caced3] w-[33vw] ">
          CUSTOMERS:
        </h1>
        <div className="flex-col h-[90vh] mt-20 overflow-auto">
          {aggregatedArray.sort(compareUsers).map((user) => {
            return (
              <User
                props={user}
                key={user.clientId}
                setSelectedUser={setSelectedUser}
                setActiveUser={setActiveUser}
                activeUser={activeUser}
              />
            );
          })}
        </div>
      </main>

      <aside className="h-screen pt-10 w-[33vw]">
        <h1 className="text-2xl text-center">CUSTOMER PORTFOLIOS:</h1>
        <div className="h-[50vh] mt-20">
          <Portfolios
            props={selectedUser}
            setSelectedPortfolio={setSelectedPortfolio}
          />
        </div>
      </aside>
      <aside className="h-screen w-[33vw]">
        <form action="/" className="fixed top-0 bg-[#caced3] w-auto h-12">
          <input
            type="radio"
            name="sort"
            value="name"
            checked={selectedRadioBtn_Portfolio === "name" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          &nbsp;Name
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="type"
            checked={selectedRadioBtn_Portfolio === "type" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          &nbsp;Portfolio Type
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="location"
            checked={selectedRadioBtn_Portfolio === "location" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          &nbsp;Location
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="quantity"
            checked={selectedRadioBtn_Portfolio === "quantity" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          &nbsp;Quantity
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="total value"
            checked={
              selectedRadioBtn_Portfolio === "total value" ? true : false
            }
            onChange={handleRadioClick_Portfolio}
          />
          &nbsp;Total Value
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="capital gain"
            checked={
              selectedRadioBtn_Portfolio === "capital gain" ? true : false
            }
            onChange={handleRadioClick_Portfolio}
          />
          &nbsp;Capital Gain
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="risk"
            checked={selectedRadioBtn_Portfolio === "risk" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          &nbsp;Ass. Risk
        </form>
        <h1 className="text-2xl text-center fixed top-10 bg-[#caced3] w-[30vw] ">
          CUSTOMER ASSETS:
        </h1>
        <div className="h-[90vh] mt-20 overflow-auto">
          <Assets
            props={selectedPortfolio}
            selectedRadioBtn_Portfolio={selectedRadioBtn_Portfolio}
          />
        </div>
      </aside>
    </div>
  );
}
