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

  function handleUserClick(selectedUser) {
    setSelectedUser(selectedUser);
  }

  return (
    <div className="flex justify-between font-oswald container mx-auto h-screen">
      <main className="h-screen">
        <form action="/">
          <input
            type="radio"
            name="sort"
            value="name"
            checked={selectedRadioBtn_User === "name" ? true : false}
            onChange={handleRadioClick_User}
          />
          Name
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="risk"
            checked={selectedRadioBtn_User === "risk" ? true : false}
            onChange={handleRadioClick_User}
          />
          Risk Profile
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="worth"
            checked={selectedRadioBtn_User === "worth" ? true : false}
            onChange={handleRadioClick_User}
          />
          Net Worth
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="restriction"
            checked={selectedRadioBtn_User === "restriction" ? true : false}
            onChange={handleRadioClick_User}
          />
          Restriction Status
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="gain"
            checked={selectedRadioBtn_User === "gain" ? true : false}
            onChange={handleRadioClick_User}
          />
          Capital Gain
        </form>
        <div className="flex-col">
          {aggregatedArray.sort(compareUsers).map((user) => {
            return (
              <User
                props={user}
                key={user.clientId}
                handleUserClick={handleUserClick}
              />
            );
          })}
        </div>
      </main>

      <aside className="my-auto">
        <h1 className="text-2xl text-center">CUSTOMER PORTFOLIOS:</h1>
        <Portfolios
          props={selectedUser}
          setSelectedPortfolio={setSelectedPortfolio}
        />
      </aside>
      <aside className="pt-4 outline-0 overflow-auto h-vh w-[30vw]">
        <form action="/" className="fixed top-0 bg-[#f8f9fa] w-auto h-8">
          <input
            type="radio"
            name="sort"
            value="name"
            checked={selectedRadioBtn_Portfolio === "name" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Name
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="type"
            checked={selectedRadioBtn_Portfolio === "type" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Portfolio Type
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="location"
            checked={selectedRadioBtn_Portfolio === "location" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Location
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="quantity"
            checked={selectedRadioBtn_Portfolio === "quantity" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Quantity
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
          Total Value
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
          Capital Gain
          <input
            className="ml-2"
            type="radio"
            name="sort"
            value="risk"
            checked={selectedRadioBtn_Portfolio === "risk" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Associated Risk
        </form>
        <h1 className="text-2xl text-center fixed mt-4 bg-[#f8f9fa] w-[30vw] ">
          CUSTOMER ASSETS:
        </h1>
        <Assets
          className="mt-16"
          props={selectedPortfolio}
          selectedRadioBtn_Portfolio={selectedRadioBtn_Portfolio}
        />
      </aside>
    </div>
  );
}
