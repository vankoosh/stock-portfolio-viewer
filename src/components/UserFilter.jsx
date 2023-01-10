import {memo} from "react"


const UserFilter = memo(({
  selectedRadioBtn_User,
  setSelectedRadioBtn_User,
}) =>{
  console.log("user filter rendered");
  return (
    <form
      action="/"
      className="fixed top-0 bg-[#caced3] w-auto left-[5vw] mx-auto h-8 text-black"
    >
      <input
        type="radio"
        name="sort"
        value="name"
        checked={selectedRadioBtn_User === "name" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_User(e.currentTarget.value);
        }}
      />
      &nbsp;Name
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="risk"
        checked={selectedRadioBtn_User === "risk" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_User(e.currentTarget.value);
        }}
      />
      &nbsp;Risk Profile
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="worth"
        checked={selectedRadioBtn_User === "worth" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_User(e.currentTarget.value);
        }}
      />
      &nbsp;Net Worth
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="restriction"
        checked={selectedRadioBtn_User === "restriction" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_User(e.currentTarget.value);
        }}
      />
      &nbsp;Restriction Status
      <input
        className="ml-2"
        type="radio"
        name="sort"
        value="gain"
        checked={selectedRadioBtn_User === "gain" ? true : false}
        onChange={(e) => {
          setSelectedRadioBtn_User(e.currentTarget.value);
        }}
      />
      &nbsp;Capital Gain
    </form>
  );
})

export default UserFilter