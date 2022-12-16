import User from "../User/User";
import "./Users.css";
import { useState } from "react";
import userListJson from "../../data.json";

export default function Users() {

  const res = JSON.stringify(userListJson);
  const arr = JSON.parse(res);

  const [selectedRadioBtn, setSelectedRadioBtn] = useState("name");

  const handleRadioClick = (e) => {
    setSelectedRadioBtn(e.currentTarget.value);
  };

  return (
    <main>
      <form action="/" className="users-sort">
        <input
          type="radio"
          name="sort"
          value="name"
          checked={selectedRadioBtn === "name" ? true : false}
          onChange={handleRadioClick}
        />
        Name
        <input
          type="radio"
          name="sort"
          value="risk"
          checked={selectedRadioBtn === "risk" ? true : false}
          onChange={handleRadioClick}
        />
        Risk Profile
        <input
          type="radio"
          name="sort"
          value="worth"
          checked={selectedRadioBtn === "worth" ? true : false}
          onChange={handleRadioClick}
        />
        Net Worth
        <input
          type="radio"
          name="sort"
          value="restriction"
          checked={selectedRadioBtn === "restriction" ? true : false}
          onChange={handleRadioClick}
        />
        Restriction Status
        <input
          type="radio"
          name="sort"
          value="gain"
          checked={selectedRadioBtn === "gain" ? true : false}
          onChange={handleRadioClick}
        />
        Capital Gain
      </form>

      {arr.map((user) => {
        // console.log(user.clientId)
        return (
          <User props={user} key={user.clientId} />
        );
      })}

    </main>
  );
}

