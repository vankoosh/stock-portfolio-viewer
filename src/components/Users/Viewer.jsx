import User from "../User/User";
import Portfolios from "../Portfolios/Portfolios";
import "./Viewer.css";
import { useState } from "react";
import userListJson from "../../data.json";
import Assets from "../Assets/Assets";

export default function Viewer() {
  const res = JSON.stringify(userListJson);
  const arr = JSON.parse(res);
  const aggRestrStatusArray = arrRestrictionAggregator(arr);
  console.log(aggRestrStatusArray);

  function arrRestrictionAggregator(arr) {
    const newArr = arr.map((user) => {
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
    const anotherNewArr = newArr.map((user) => {
      let tempNetWorth = 0;
      user.portfolios.forEach((portfolio) => {
        portfolio.assets.forEach((asset) => {
          console.log(tempNetWorth)
          tempNetWorth += asset.quantity * asset.valuePerAsset;
        });
        return {
          netWorth: tempNetWorth,
          ...user
        }
      });
    })
    

    return anotherNewArr;
  }


  const compareUsers = (p1, p2) => {
    switch (selectedRadioBtn_User) {
      case "name":
        p1.firstName > p2.firstName ? 1 : -1;
        break;
      case "risk":
        p1.riskProfile > p2.riskProfile ? 1 : -1;
        break;
      case "worth":
        p1.riskProfile > p2.riskProfile ? 1 : -1;
        break;
      case "restriction":
        p1.riskProfile > p2.riskProfile ? 1 : -1;
        break;
      case "gain":
        p1.riskProfile > p2.riskProfile ? 1 : -1;
        break;
      default:
      // code block
    }
  };

  const [selectedRadioBtn_User, setSelectedRadioBtn_User] = useState("name");
  const [selectedRadioBtn_Portfolio, setSelectedRadioBtn_Portfolio] =
    useState("name");
  const [selectedUser, setSelectedUser] = useState();
  const [selectedPortfolio, setSelectedPortfolio] = useState();

  const handleRadioClick_User = (e) => {
    setSelectedRadioBtn_User(e.currentTarget.value);
  };
  const handleRadioClick_Portfolio = (e) => {
    setSelectedRadioBtn_Portfolio(e.currentTarget.value);
  };

  const handleUserClick = (selectedUser) => {
    setSelectedUser(selectedUser);
  };

  return (
    <div className="users-container">
      <main className="users-sort">
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
            type="radio"
            name="sort"
            value="risk"
            checked={selectedRadioBtn_User === "risk" ? true : false}
            onChange={handleRadioClick_User}
          />
          Risk Profile
          <input
            type="radio"
            name="sort"
            value="worth"
            checked={selectedRadioBtn_User === "worth" ? true : false}
            onChange={handleRadioClick_User}
          />
          Net Worth
          <input
            type="radio"
            name="sort"
            value="restriction"
            checked={selectedRadioBtn_User === "restriction" ? true : false}
            onChange={handleRadioClick_User}
          />
          Restriction Status
          <input
            type="radio"
            name="sort"
            value="gain"
            checked={selectedRadioBtn_User === "gain" ? true : false}
            onChange={handleRadioClick_User}
          />
          Capital Gain
        </form>

        {arr.sort(compareUsers).map((user) => {
          return (
            <User
              props={user}
              key={user.clientId}
              handleUserClick={handleUserClick}
            />
          );
        })}
      </main>

      <aside className="portfolios-container">
        <h1>CUSTOMER PORTFOLIOS:</h1>
        <Portfolios
          props={selectedUser}
          setSelectedPortfolio={setSelectedPortfolio}
        />
      </aside>
      <aside>
        <form action="/">
          <input
            type="radio"
            name="sort"
            value="name"
            checked={selectedRadioBtn_Portfolio === "name" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Name
          <input
            type="radio"
            name="sort"
            value="type"
            checked={selectedRadioBtn_Portfolio === "type" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Portfolio Type
          <input
            type="radio"
            name="sort"
            value="location"
            checked={selectedRadioBtn_Portfolio === "location" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Location
          <input
            type="radio"
            name="sort"
            value="quantity"
            checked={selectedRadioBtn_Portfolio === "quantity" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Quantity
          <input
            type="radio"
            name="sort"
            value="total value"
            checked={
              selectedRadioBtn_Portfolio === "total value" ? true : false
            }
            onChange={handleRadioClick_Portfolio}
          />
          Capital Gain
          <input
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
            type="radio"
            name="sort"
            value="risk"
            checked={selectedRadioBtn_Portfolio === "risk" ? true : false}
            onChange={handleRadioClick_Portfolio}
          />
          Associated Risk
        </form>
        <h1>CUSTOMER ASSETS:</h1>
        <Assets props={selectedPortfolio} />
      </aside>
    </div>
  );
}
